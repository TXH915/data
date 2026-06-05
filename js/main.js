class DataAnalysisApp {
    constructor() {
        this.currentProject = null;
        this.solutionVisible = false;
        this.quizAnswers = {};
        this.init();
    }

    init() {
        this.renderProjectNav();
        this.bindEvents();
        this.updateBadgeCount();
        console.log('数据分析学习平台已启动！');
    }

    renderProjectNav() {
        const nav = document.getElementById('projectNav');
        nav.innerHTML = '';

        const levels = {
            '入门': [],
            '进阶': [],
            '高级': []
        };

        projects.forEach(p => {
            if (levels[p.level] !== undefined) {
                levels[p.level].push(p);
            }
        });

        Object.entries(levels).forEach(([level, levelProjects]) => {
            const header = document.createElement('div');
            header.style.padding = '0.5rem 1rem';
            header.style.color = 'var(--text-secondary)';
            header.style.fontWeight = 'bold';
            header.style.fontSize = '0.85rem';
            header.style.textTransform = 'uppercase';
            header.textContent = level;
            nav.appendChild(header);

            levelProjects.forEach(project => {
                const isCompleted = achievementSystem.stats.projectsCompleted.includes(project.id);
                const item = document.createElement('div');
                item.className = 'project-item';
                item.dataset.projectId = project.id;
                item.innerHTML = `
                    <span class="level-tag ${level === '入门' ? 'beginner' : level === '进阶' ? 'intermediate' : 'advanced'}"
                          style="display: inline-block; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.7rem; margin-bottom: 0.3rem;">
                        ${level}
                    </span>
                    <h4 style="margin: 0.3rem 0;">${isCompleted ? '✅ ' : ''}${project.title}</h4>
                    <p style="margin: 0; font-size: 0.8rem; color: var(--text-secondary);">${project.description}</p>
                `;
                item.addEventListener('click', () => this.loadProject(project.id));
                nav.appendChild(item);
            });
        });
    }

    loadProject(projectId) {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;

        this.currentProject = project;
        this.solutionVisible = false;
        this.quizAnswers = {};

        document.querySelectorAll('.project-item').forEach(item => {
            item.classList.remove('active');
            if (parseInt(item.dataset.projectId) === projectId) {
                item.classList.add('active');
            }
        });

        document.getElementById('levelBadge').textContent = project.level;
        document.getElementById('levelBadge').className = 'level-badge ' + project.level;
        document.getElementById('projectTitle').textContent = project.title;

        document.getElementById('theoryContent').innerHTML = '<div class="theory-content">' + project.theory + '</div>';

        codeEditor.setValue(project.initialCode);

        document.getElementById('outputContent').innerHTML = '<div class="placeholder">运行代码后结果将显示在这里</div>';

        document.getElementById('solutionContent').innerHTML = '<div class="placeholder">点击显示参考答案</div>';
        document.getElementById('toggleSolutionBtn').textContent = '👁️ 显示';

        this.renderQuiz(project);

        achievementSystem.completeProject(projectId);
        this.updateBadgeCount();
    }

    renderQuiz(project) {
        const quizDiv = document.getElementById('quizContent');
        quizDiv.innerHTML = '';

        if (!project.quiz || project.quiz.length === 0) {
            quizDiv.innerHTML = '<div class="placeholder">暂无测评题目</div>';
            return;
        }

        project.quiz.forEach((q, idx) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'quiz-question';
            questionDiv.dataset.qIndex = idx;

            questionDiv.innerHTML = `
                <h5 style="margin-bottom: 1rem;">${idx + 1}. ${q.question}</h5>
                <div class="quiz-options" style="display: flex; flex-direction: column; gap: 0.5rem;">
                    ${q.options.map((opt, optIdx) => `
                        <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; border-radius: 6px; cursor: pointer; transition: background 0.2s;">
                            <input type="radio" name="quiz_${project.id}_${idx}" value="${optIdx}">
                            ${opt}
                        </label>
                    `).join('')}
                </div>
                <div class="quiz-result" style="margin-top: 0.75rem; padding: 0.5rem; border-radius: 6px; display: none;"></div>
            `;

            questionDiv.querySelectorAll('input[type="radio"]').forEach(input => {
                input.addEventListener('change', () => this.checkAnswer(project, idx, parseInt(input.value)));
            });

            quizDiv.appendChild(questionDiv);
        });

        const submitBtn = document.createElement('button');
        submitBtn.className = 'btn btn-primary';
        submitBtn.style.marginTop = '1rem';
        submitBtn.style.width = '100%';
        submitBtn.textContent = '提交答案';
        submitBtn.addEventListener('click', () => this.submitQuiz(project));
        quizDiv.appendChild(submitBtn);
    }

    checkAnswer(project, qIndex, selected) {
        this.quizAnswers[qIndex] = selected;
    }

    submitQuiz(project) {
        let correct = 0;
        let total = project.quiz.length;

        project.quiz.forEach((q, idx) => {
            const questionDiv = document.querySelector(`[data-q-index="${idx}"]`);
            const resultDiv = questionDiv.querySelector('.quiz-result');
            const selected = this.quizAnswers[idx];
            const isCorrect = selected === q.answer;

            if (selected !== undefined) {
                resultDiv.style.display = 'block';
                if (isCorrect) {
                    correct++;
                    resultDiv.style.background = '#1a3322';
                    resultDiv.style.color = '#69db7c';
                    resultDiv.textContent = '✅ 回答正确！';
                } else {
                    resultDiv.style.background = '#3d2020';
                    resultDiv.style.color = '#ff6b6b';
                    resultDiv.textContent = `❌ 回答错误。正确答案是：${q.options[q.answer]}`;
                }
            }
        });

        if (correct === total && total > 0) {
            achievementSystem.completeQuiz(project.id);
            this.updateBadgeCount();
            this.renderProjectNav();
        }
    }

    toggleSolution() {
        if (!this.currentProject) return;

        this.solutionVisible = !this.solutionVisible;
        const contentDiv = document.getElementById('solutionContent');
        const btn = document.getElementById('toggleSolutionBtn');

        if (this.solutionVisible) {
            contentDiv.innerHTML = `<pre class="solution-code">${this.escapeHtml(this.currentProject.solutionCode)}</pre>`;
            btn.textContent = '🙈 隐藏';
        } else {
            contentDiv.innerHTML = '<div class="placeholder">点击显示参考答案</div>';
            btn.textContent = '👁️ 显示';
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    resetCode() {
        if (this.currentProject && codeEditor) {
            codeEditor.setValue(this.currentProject.initialCode);
        }
    }

    async runCode() {
        if (!codeEditor) return;
        const code = codeEditor.getValue();
        if (!code.trim()) {
            pythonRunner.showOutput('请先输入Python代码', 'error');
            return;
        }
        await pythonRunner.run(code);
    }

    clearOutput() {
        document.getElementById('outputContent').innerHTML = '<div class="placeholder">运行代码后结果将显示在这里</div>';
    }

    updateBadgeCount() {
        document.getElementById('badgeCount').textContent = achievementSystem.getUnlockedCount();
    }

    bindEvents() {
        document.getElementById('runBtn').addEventListener('click', () => this.runCode());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetCode());
        document.getElementById('clearOutputBtn').addEventListener('click', () => this.clearOutput());
        document.getElementById('toggleSolutionBtn').addEventListener('click', () => this.toggleSolution());

        document.getElementById('achievementsBadge').addEventListener('click', () => {
            document.getElementById('achievementsModal').classList.add('active');
            achievementSystem.renderAchievements();
        });

        document.getElementById('closeModalBtn').addEventListener('click', () => {
            document.getElementById('achievementsModal').classList.remove('active');
        });

        document.getElementById('achievementsModal').addEventListener('click', (e) => {
            if (e.target.id === 'achievementsModal') {
                document.getElementById('achievementsModal').classList.remove('active');
            }
        });
    }
}

const achievementNotificationStyle = document.createElement('style');
achievementNotificationStyle.textContent = `
    .achievement-notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #ffd700, #ffb347);
        color: #333;
        padding: 1.5rem 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideIn 0.5s ease-out;
        text-align: center;
        font-weight: 500;
    }
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(achievementNotificationStyle);

let app;
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        app = new DataAnalysisApp();
    }, 100);
});
