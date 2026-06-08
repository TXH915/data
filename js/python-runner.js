class PythonRunner {
    constructor() {
        this.pyodide = null;
        this.initialized = false;
        this.packagesLoaded = false;
        this.allPackagesLoaded = false;
        this.initPromise = null;
        this.currentProgress = 0;
        this.loadingMessages = [
            '正在初始化 Python 引擎...',
            '正在加载核心库...',
            '正在配置环境...',
            '即将完成...'
        ];
        this.messageIndex = 0;
        
        this.corePackages = ['numpy', 'pandas', 'matplotlib'];
        this.optionalPackages = ['scipy', 'scikit-learn', 'seaborn', 'statsmodels', 'networkx', 'beautifulsoup4', 'lxml', 'pytz', 'python-dateutil', 'joblib', 'threadpoolctl'];
        this.loadedPackages = [];
    }

    async ensureInitialized() {
        if (this.initPromise) {
            return this.initPromise;
        }
        this.initPromise = this.init();
        return this.initPromise;
    }

    async init() {
        try {
            document.getElementById('loadingOverlay').classList.add('active');
            this.setProgress(0);
            this.updateLoadingMessage('正在加载 Python 核心...', '初始化 Pyodide 引擎');

            // 配置Pyodide，使用合适的CDN
            this.pyodide = await loadPyodide({
                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
                stdout: (text) => this.appendOutput(text, 'stdout'),
                stderr: (text) => this.appendOutput(text, 'stderr'),
                progress: (progress) => {
                    this.setProgress(Math.min(30, progress * 30));
                    this.updateLoadingDetail(`下载进度: ${Math.round(progress * 100)}%`);
                }
            });

            this.initialized = true;
            this.setProgress(35);
            this.updateLoadingMessage('正在加载数据科学库...', '安装 numpy, pandas, matplotlib...');

            // 预装核心数据科学库
            await this.loadPackages();

            this.packagesLoaded = true;
            this.setProgress(95);
            this.updateLoadingMessage('正在配置环境...', '设置 matplotlib 后端');
            console.log('Pyodide & Data Science packages initialized successfully');

            await new Promise(resolve => setTimeout(resolve, 300));
            this.setProgress(100);
            this.updateLoadingMessage('初始化完成！', '准备就绪');
            
        } catch (error) {
            console.error('Failed to initialize Pyodide:', error);
            this.showOutput('⚠️ Python环境初始化失败。请刷新页面重试。\n\n错误信息: ' + error.message, 'error');
        } finally {
            setTimeout(() => {
                document.getElementById('loadingOverlay').classList.remove('active');
            }, 800);
        }
    }

    setProgress(percent) {
        this.currentProgress = Math.min(100, Math.max(0, percent));
        const bar = document.getElementById('loadingBar');
        if (bar) {
            bar.style.width = `${this.currentProgress}%`;
        }
    }

    updateLoadingMessage(msg, detail = '') {
        const messageEl = document.getElementById('loadingMessage');
        const detailEl = document.getElementById('loadingDetail');
        if (messageEl) {
            messageEl.textContent = msg;
        }
        if (detailEl && detail) {
            detailEl.textContent = detail;
        }
    }

    updateLoadingDetail(detail) {
        const detailEl = document.getElementById('loadingDetail');
        if (detailEl) {
            detailEl.textContent = detail;
        }
    }

    async loadPackages() {
        let loadedCount = 0;
        const totalCore = this.corePackages.length;

        // 初始化时立即更新库状态显示
        this.updateLibraryStatus();

        try {
            // 首先只加载核心库，立即可用
            for (const pkg of this.corePackages) {
                loadedCount++;
                this.updateLoadingDetail(`正在安装: ${pkg}`);
                await this.pyodide.loadPackage(pkg);
                this.loadedPackages.push(pkg);
                this.setProgress(35 + (loadedCount / totalCore) * 55);
                this.updateLibraryStatus();
            }
            
            console.log('Core packages loaded successfully');
            
            // 标记核心库加载完成
            this.packagesLoaded = true;
            
            // 后台加载可选包（不阻塞）
            this.loadOptionalPackagesInBackground();
            
        } catch (err) {
            console.warn('Some packages failed to load:', err);
            await this.pyodide.loadPackage(this.corePackages);
            this.loadedPackages = [...this.corePackages];
        }

        // 设置matplotlib后端
        this.updateLoadingDetail('配置 matplotlib...');
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

    async loadOptionalPackagesInBackground() {
        for (const pkg of this.optionalPackages) {
            if (!this.loadedPackages.includes(pkg)) {
                try {
                    await this.pyodide.loadPackage(pkg);
                    this.loadedPackages.push(pkg);
                    console.log(`Loaded optional package: ${pkg}`);
                    this.updateLibraryStatus();
                } catch (err) {
                    console.warn(`Failed to load optional package ${pkg}:`, err);
                }
            }
        }
        this.allPackagesLoaded = true;
        this.updateLibraryStatus();
        console.log('All optional packages loaded');
    }

    updateLibraryStatus() {
        const libraryInfo = document.getElementById('libraryInfo');
        if (!libraryInfo) return;
        
        let statusHTML = `
            <div class="title">
                <span>📦</span>
                <span>预装数据科学库</span>
            </div>
            <div class="packages">
                ${[...this.corePackages, ...this.optionalPackages].map(pkg => {
                    const isLoaded = this.loadedPackages.includes(pkg);
                    return `<span class="pkg-tag ${isLoaded ? 'pkg-loaded' : 'pkg-loading'}">${pkg}${isLoaded ? ' ✓' : '...'}</span>`;
                }).join('')}
            </div>
            ${this.allPackagesLoaded ? '<div style="font-size:0.75rem; color:#22c55e; margin-top:0.5rem;">🎉 所有库已下载完成！</div>' : ''}
        `;
        libraryInfo.innerHTML = statusHTML;
    }

    async ensurePackageLoaded(packageName) {
        if (this.loadedPackages.includes(packageName)) {
            return true;
        }
        if (this.pyodide) {
            try {
                this.showOutput(`⏳ 正在加载 ${packageName} 库，请稍等...\n`, 'info');
                await this.pyodide.loadPackage(packageName);
                this.loadedPackages.push(packageName);
                this.updateLibraryStatus();
                return true;
            } catch (e) {
                return false;
            }
        }
        return false;
    }

    async run(code) {
        await this.ensureInitialized();

        if (!this.pyodide) {
            this.showOutput('❌ Python环境未就绪', 'error');
            return;
        }

        // 如果还有可选库未下载，开始后台下载
        if (!this.allPackagesLoaded && this.packagesLoaded) {
            this.loadOptionalPackagesInBackground();
        }

        try {
            // 清空输出区域
            this.clearOutput();
            
            // 初始化库状态显示
            this.updateLibraryStatus();

            // 设置输出捕获，确保中文支持
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
            console.error('Code execution error:', error);
            this.showOutput('❌ 代码执行错误:\n\n' + error.message, 'error');
        }
    }

    appendOutput(text, type = 'stdout') {
        const outputContent = document.getElementById('outputContent');
        if (!outputContent) return;
        
        const line = document.createElement('div');
        line.className = `output-line ${type}`;
        line.textContent = text;
        outputContent.appendChild(line);
        
        // 自动滚动到底部
        const outputArea = document.getElementById('outputArea');
        if (outputArea) {
            outputArea.scrollTop = outputArea.scrollHeight;
        }
    }

    appendImage(base64Data) {
        const outputContent = document.getElementById('outputContent');
        if (!outputContent) return;
        
        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-output';
        
        const img = document.createElement('img');
        img.src = `data:image/png;base64,${base64Data}`;
        img.alt = 'Matplotlib 输出';
        
        imgContainer.appendChild(img);
        outputContent.appendChild(imgContainer);
    }

    clearOutput() {
        const outputContent = document.getElementById('outputContent');
        if (outputContent) {
            outputContent.innerHTML = '';
        }
    }

    showOutput(text, type = 'success') {
        const outputContent = document.getElementById('outputContent');
        if (!outputContent) return;
        
        // 将文本按换行符分割，逐行显示
        const lines = text.split('\n');
        lines.forEach(lineText => {
            const line = document.createElement('div');
            line.className = `output-line ${type}`;
            line.textContent = lineText;
            outputContent.appendChild(line);
        });
        
        // 自动滚动到底部
        const outputArea = document.getElementById('outputArea');
        if (outputArea) {
            outputArea.scrollTop = outputArea.scrollHeight;
        }
    }
}

// 创建全局实例
let pythonRunner;

document.addEventListener('DOMContentLoaded', () => {
    pythonRunner = new PythonRunner();
});
