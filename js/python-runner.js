class PythonRunner {
    constructor() {
        this.pyodide = null;
        this.initialized = false;
        this.initPromise = this.init();
    }

    async init() {
        try {
            document.getElementById('loadingOverlay').classList.add('active');
            this.pyodide = await loadPyodide();
            this.initialized = true;
            console.log('Pyodide initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Pyodide:', error);
            this.showOutput('⚠️ Python环境初始化失败。请刷新页面重试。\n\n错误信息: ' + error.message, 'error');
        } finally {
            document.getElementById('loadingOverlay').classList.remove('active');
        }
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
            // 捕获print输出
            let output = '';
            this.pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
`);

            // 运行用户代码
            await this.pyodide.runPythonAsync(code);

            // 获取输出
            const result = this.pyodide.runPython('sys.stdout.getvalue()');
            if (result) {
                output += result;
            }

            if (!output) {
                output = '✅ 代码运行成功（无输出）';
            }

            this.showOutput(output, 'success');

            // 记录代码运行
            achievementSystem.recordCodeRun();

        } catch (error) {
            console.error('Python execution error:', error);
            this.showOutput('❌ 运行错误:\n\n' + error.message, 'error');
        }
    }

    showOutput(text, type = 'normal') {
        const outputDiv = document.getElementById('outputContent');
        outputDiv.innerHTML = '';

        const pre = document.createElement('pre');
        pre.style.margin = '0';
        pre.style.padding = '1rem';
        pre.style.borderRadius = '8px';
        pre.style.whiteSpace = 'pre-wrap';
        pre.style.wordBreak = 'break-all';
        pre.style.fontFamily = "'Fira Code', 'Consolas', monospace";
        pre.style.fontSize = '0.9rem';

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
        outputDiv.appendChild(pre);
    }
}

const pythonRunner = new PythonRunner();
