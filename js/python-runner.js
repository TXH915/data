class PythonRunner {
    constructor() {
        this.pyodide = null;
        this.initialized = false;
        this.packagesLoaded = false;
        this.initPromise = this.init();
    }

    async init() {
        try {
            document.getElementById('loadingOverlay').classList.add('active');
            this.updateLoadingMessage('正在加载Python核心...');

            // 配置Pyodide，使用合适的CDN
            this.pyodide = await loadPyodide({
                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
                stdout: (text) => this.appendOutput(text, 'stdout'),
                stderr: (text) => this.appendOutput(text, 'stderr')
            });

            this.initialized = true;
            this.updateLoadingMessage('正在加载数据科学库...');

            // 预装所有常用的数据科学库
            await this.loadPackages();

            this.packagesLoaded = true;
            console.log('Pyodide & Data Science packages initialized successfully');
            this.updateLoadingMessage('初始化完成！');
        } catch (error) {
            console.error('Failed to initialize Pyodide:', error);
            this.showOutput('⚠️ Python环境初始化失败。请刷新页面重试。\n\n错误信息: ' + error.message, 'error');
        } finally {
            setTimeout(() => {
                document.getElementById('loadingOverlay').classList.remove('active');
            }, 500);
        }
    }

    updateLoadingMessage(msg) {
        const overlay = document.getElementById('loadingOverlay');
        const p = overlay.querySelector('p');
        if (p) p.textContent = msg;
    }

    async loadPackages() {
        const packages = [
            'numpy',
            'pandas',
            'matplotlib',
            'scipy',
            'scikit-learn',
            'seaborn',
            'statsmodels',
            'networkx',
            'beautifulsoup4',
            'lxml',
            'html5lib',
            'pytz',
            'python-dateutil',
            'six',
            'pyparsing',
            'cycler',
            'kiwisolver',
            'joblib',
            'threadpoolctl'
        ];

        try {
            await this.pyodide.loadPackage(packages);
            console.log('All packages loaded successfully');
        } catch (err) {
            console.warn('Some packages failed to load, falling back to essentials:', err);
            await this.pyodide.loadPackage(['numpy', 'pandas', 'matplotlib']);
        }

        // 设置matplotlib后端
        await this.pyodide.runPythonAsync(`
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import sys
from io import StringIO
`);
    }

    async run(code) {
        if (!this.initialized) {
            await this.initPromise;
        }

        if (!this.pyodide) {
            this.showOutput('❌ Python环境未就绪', 'error');
            return;
        }

        try {
            // 清空输出区域
            this.clearOutput();

            // 设置输出捕获
            await this.pyodide.runPythonAsync(`
import sys
from io import StringIO
import base64
import matplotlib.pyplot as plt

# 重置stdout/stderr
sys.stdout = StringIO()
sys.stderr = StringIO()

# 清理之前的图形
plt.close('all')
`);

            // 运行用户代码
            await this.pyodide.runPythonAsync(code);

            // 获取标准输出和错误
            const stdout = this.pyodide.runPython('sys.stdout.getvalue()');
            const stderr = this.pyodide.runPython('sys.stderr.getvalue()');

            let output = '';
            if (stderr && stderr.trim()) {
                output += 'stderr:\n' + stderr + '\n';
            }
            if (stdout && stdout.trim()) {
                output += stdout;
            }

            // 检查是否有matplotlib图形需要显示
            const hasFigures = this.pyodide.runPython(`
import matplotlib.pyplot as plt
figs = plt.get_fignums()
len(figs) > 0
`);

            if (hasFigures) {
                const figureCount = this.pyodide.runPython('len(plt.get_fignums())');
                output += `\n📊 生成了 ${figureCount} 个图形\n`;

                for (let i = 0; i < figureCount; i++) {
                    const imgData = this.pyodide.runPython(`
import io
import base64
fig = plt.figure(${i + 1})
buf = io.BytesIO()
fig.savefig(buf, format='png', dpi=100, bbox_inches='tight')
buf.seek(0)
img_base64 = base64.b64encode(buf.read()).decode('utf-8')
buf.close()
img_base64
`);
                    this.appendImage(imgData);
                }
                plt.close('all');
            }

            if (!output.trim()) {
                output = '✅ 代码运行成功（无输出）';
            }

            this.showOutput(output, 'success');
            achievementSystem.recordCodeRun();

        } catch (error) {
            console.error('Python execution error:', error);
            let errorMsg = '❌ 运行错误:\n\n';
            if (error.message) {
                errorMsg += error.message;
            } else if (typeof error === 'string') {
                errorMsg += error;
            } else {
                errorMsg += '未知错误';
            }
            this.showOutput(errorMsg, 'error');
        }
    }

    appendOutput(text, type) {
        const outputDiv = document.getElementById('outputContent');
        const placeholder = outputDiv.querySelector('.placeholder');
        if (placeholder) {
            outputDiv.innerHTML = '';
        }

        const span = document.createElement('span');
        span.style.color = type === 'stderr' ? '#ff6b6b' : '#e2e8f0';
        span.style.whiteSpace = 'pre-wrap';
        span.textContent = text;
        outputDiv.appendChild(span);
    }

    appendImage(base64Data) {
        const outputDiv = document.getElementById('outputContent');
        const placeholder = outputDiv.querySelector('.placeholder');
        if (placeholder) {
            outputDiv.innerHTML = '';
        }

        const img = document.createElement('img');
        img.src = `data:image/png;base64,${base64Data}`;
        img.style.maxWidth = '100%';
        img.style.marginTop = '1rem';
        img.style.marginBottom = '1rem';
        img.style.borderRadius = '8px';
        img.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
        outputDiv.appendChild(img);
    }

    clearOutput() {
        document.getElementById('outputContent').innerHTML =
            '<div class="placeholder" style="opacity: 0.5;">正在执行代码...</div>';
    }

    showOutput(text, type = 'normal') {
        const outputDiv = document.getElementById('outputContent');
        const placeholder = outputDiv.querySelector('.placeholder');
        if (placeholder) {
            outputDiv.innerHTML = '';
        }

        const pre = document.createElement('pre');
        pre.style.margin = '0';
        pre.style.padding = '1rem';
        pre.style.borderRadius = '8px';
        pre.style.whiteSpace = 'pre-wrap';
        pre.style.wordBreak = 'break-word';
        pre.style.fontFamily = "'Fira Code', 'Consolas', monospace";
        pre.style.fontSize = '0.9rem';
        pre.style.lineHeight = '1.5';

        if (type === 'error') {
            pre.style.background = '#3d2020';
            pre.style.color = '#ff6b6b';
            pre.style.borderLeft = '4px solid #ff6b6b';
        } else if (type === 'success') {
            pre.style.background = '#1a3322';
            pre.style.color = '#69db7c';
        } else {
            pre.style.background = '#1e293b';
            pre.style.color = '#e2e8f0';
        }

        pre.textContent = text;
        outputDiv.insertBefore(pre, outputDiv.firstChild);
    }
}

const pythonRunner = new PythonRunner();
