class DataAnalysisApp {
    constructor() {
        this.currentProject = null;
        this.solutionVisible = false;
        this.quizAnswers = {};
        this.examStarted = false;
        this.examAnswers = {};
        this.examCodeAnswer = '';
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
        this.examStarted = false;
        this.examAnswers = {};

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
        this.renderExamPlaceholder(project);
        document.getElementById('startExamBtn').textContent = '开始考试';

        achievementSystem.completeProject(projectId);
        this.updateBadgeCount();
    }

    renderExamPlaceholder(project) {
        const examContent = document.getElementById('examContent');
        examContent.innerHTML = '<div class="placeholder">点击"开始考试"进入考试模式</div>';
    }

    renderExam(project) {
        if (!project.exam) return;
        
        const examContent = document.getElementById('examContent');
        examContent.innerHTML = '';
        this.examStarted = true;
        this.examAnswers = {};
        document.getElementById('startExamBtn').textContent = '退出考试';

        // 单选题部分
        if (project.exam.singleChoice && project.exam.singleChoice.length > 0) {
            const singleSection = document.createElement('div');
            singleSection.className = 'exam-section';
            singleSection.innerHTML = `
                <h4 style="color: #ffd700; margin-bottom: 1rem;">一、单项选择题（共${project.exam.singleChoice.length}题）</h4>
            `;
            
            project.exam.singleChoice.forEach((q, idx) => {
                const qDiv = document.createElement('div');
                qDiv.className = 'exam-question';
                qDiv.innerHTML = `
                    <p style="margin-bottom: 0.5rem;"><b>${idx + 1}.</b> ${q.question}</p>
                    <div style="display: flex; flex-direction: column; gap: 0.3rem; margin-left: 1rem;">
                        ${q.options.map((opt, optIdx) => `
                            <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                                <input type="radio" name="single_${idx}" value="${optIdx}">
                                <span>${opt}</span>
                            </label>
                        `).join('')}
                    </div>
                    <div class="exam-result" style="margin-top: 0.5rem; padding: 0.5rem; border-radius: 4px; display: none;"></div>
                `;
                
                qDiv.querySelectorAll('input[type="radio"]').forEach(input => {
                    input.addEventListener('change', (e) => {
                        this.examAnswers[`single_${idx}`] = parseInt(e.target.value);
                    });
                });
                
                singleSection.appendChild(qDiv);
            });
            
            examContent.appendChild(singleSection);
        }

        // 多选题部分
        if (project.exam.multipleChoice && project.exam.multipleChoice.length > 0) {
            const multiSection = document.createElement('div');
            multiSection.className = 'exam-section';
            multiSection.innerHTML = `
                <h4 style="color: #ffd700; margin-bottom: 1rem; margin-top: 1.5rem;">二、多项选择题（共${project.exam.multipleChoice.length}题）</h4>
            `;
            
            project.exam.multipleChoice.forEach((q, idx) => {
                const qDiv = document.createElement('div');
                qDiv.className = 'exam-question';
                qDiv.innerHTML = `
                    <p style="margin-bottom: 0.5rem;"><b>${idx + 1}.</b> ${q.question} <span style="color: #888; font-size: 0.8rem;">（多选）</span></p>
                    <div style="display: flex; flex-direction: column; gap: 0.3rem; margin-left: 1rem;">
                        ${q.options.map((opt, optIdx) => `
                            <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                                <input type="checkbox" name="multi_${idx}" value="${optIdx}">
                                <span>${opt}</span>
                            </label>
                        `).join('')}
                    </div>
                    <div class="exam-result" style="margin-top: 0.5rem; padding: 0.5rem; border-radius: 4px; display: none;"></div>
                `;
                
                qDiv.querySelectorAll('input[type="checkbox"]').forEach(input => {
                    input.addEventListener('change', () => {
                        const checked = Array.from(qDiv.querySelectorAll('input[type="checkbox"]:checked'))
                            .map(cb => parseInt(cb.value));
                        this.examAnswers[`multi_${idx}`] = checked;
                    });
                });
                
                multiSection.appendChild(qDiv);
            });
            
            examContent.appendChild(multiSection);
        }

        // 判断题部分
        if (project.exam.trueFalse && project.exam.trueFalse.length > 0) {
            const tfSection = document.createElement('div');
            tfSection.className = 'exam-section';
            tfSection.innerHTML = `
                <h4 style="color: #ffd700; margin-bottom: 1rem; margin-top: 1.5rem;">三、判断题（共${project.exam.trueFalse.length}题）</h4>
            `;
            
            project.exam.trueFalse.forEach((q, idx) => {
                const qDiv = document.createElement('div');
                qDiv.className = 'exam-question';
                qDiv.innerHTML = `
                    <p style="margin-bottom: 0.5rem;"><b>${idx + 1}.</b> ${q.question}</p>
                    <div style="display: flex; gap: 1rem; margin-left: 1rem;">
                        <label style="display: flex; align-items: center; gap: 0.3rem; cursor: pointer;">
                            <input type="radio" name="tf_${idx}" value="true">
                            <span>正确</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 0.3rem; cursor: pointer;">
                            <input type="radio" name="tf_${idx}" value="false">
                            <span>错误</span>
                        </label>
                    </div>
                    <div class="exam-result" style="margin-top: 0.5rem; padding: 0.5rem; border-radius: 4px; display: none;"></div>
                `;
                
                qDiv.querySelectorAll('input[type="radio"]').forEach(input => {
                    input.addEventListener('change', (e) => {
                        this.examAnswers[`tf_${idx}`] = e.target.value === 'true';
                    });
                });
                
                tfSection.appendChild(qDiv);
            });
            
            examContent.appendChild(tfSection);
        }

        // 代码题部分
        if (project.exam.codeQuestion) {
            const codeSection = document.createElement('div');
            codeSection.className = 'exam-section';
            codeSection.innerHTML = `
                <h4 style="color: #ffd700; margin-bottom: 1rem; margin-top: 1.5rem;">四、编程题（共1题）</h4>
                <div class="exam-question">
                    <p style="margin-bottom: 1rem;"><b>${project.exam.singleChoice.length + project.exam.multipleChoice.length + project.exam.trueFalse.length + 1}.</b> ${project.exam.codeQuestion.question}</p>
                    <textarea id="examCodeEditor" style="width: 100%; min-height: 150px; background: #1e1e1e; color: #d4d4d4; border: 1px solid #444; border-radius: 6px; padding: 0.5rem; font-family: monospace;" placeholder="在此输入代码...">${project.exam.codeQuestion.initialCode}</textarea>
                    <button class="btn btn-primary" style="margin-top: 0.5rem;" id="runExamCodeBtn">▶️ 运行代码</button>
                    <div id="examCodeOutput" style="margin-top: 0.5rem; padding: 0.5rem; background: #1e1e1e; border-radius: 6px; min-height: 50px; font-family: monospace; white-space: pre-wrap;"></div>
                </div>
            `;
            
            examContent.appendChild(codeSection);
            
            // 绑定代码运行按钮
            setTimeout(() => {
                const runBtn = document.getElementById('runExamCodeBtn');
                if (runBtn) {
                    runBtn.addEventListener('click', async () => {
                        const code = document.getElementById('examCodeEditor').value;
                        const outputDiv = document.getElementById('examCodeOutput');
                        outputDiv.textContent = '正在运行...';
                        try {
                            await pythonRunner.run(code);
                            outputDiv.innerHTML = pythonRunner.lastOutput || '代码执行完成';
                        } catch (err) {
                            outputDiv.textContent = '错误: ' + err.message;
                        }
                    });
                }
            }, 100);
        }

        // 提交按钮
        const submitBtn = document.createElement('button');
        submitBtn.className = 'btn btn-primary';
        submitBtn.style.marginTop = '1.5rem';
        submitBtn.style.width = '100%';
        submitBtn.textContent = '提交试卷';
        submitBtn.addEventListener('click', () => this.submitExam(project));
        examContent.appendChild(submitBtn);
    }

    submitExam(project) {
        if (!project.exam) return;
        
        let score = 0;
        let total = 0;
        const results = [];

        // 批改单选题
        if (project.exam.singleChoice) {
            project.exam.singleChoice.forEach((q, idx) => {
                const userAnswer = this.examAnswers[`single_${idx}`];
                const isCorrect = userAnswer === q.answer;
                if (isCorrect) score += 10;
                total += 10;
                results.push({ type: '单选', index: idx + 1, correct: isCorrect, correctAnswer: q.options[q.answer] });
            });
        }

        // 批改多选题
        if (project.exam.multipleChoice) {
            project.exam.multipleChoice.forEach((q, idx) => {
                const userAnswer = this.examAnswers[`multi_${idx}`] || [];
                const isCorrect = JSON.stringify(userAnswer.sort()) === JSON.stringify(q.answer.sort());
                if (isCorrect) score += 15;
                total += 15;
                results.push({ type: '多选', index: idx + 1, correct: isCorrect, correctAnswer: q.options.filter((_, i) => q.answer.includes(i)) });
            });
        }

        // 批改判断题
        if (project.exam.trueFalse) {
            project.exam.trueFalse.forEach((q, idx) => {
                const userAnswer = this.examAnswers[`tf_${idx}`];
                const isCorrect = userAnswer === q.answer;
                if (isCorrect) score += 10;
                total += 10;
                results.push({ type: '判断', index: idx + 1, correct: isCorrect, correctAnswer: q.answer ? '正确' : '错误' });
            });
        }

        // 编程题默认给20分（老师手动批改）
        const codeAnswer = document.getElementById('examCodeEditor')?.value || '';
        const hasCode = codeAnswer.trim().length > 50;
        total += 20;
        if (hasCode) score += 20;

        const percentage = Math.round((score / total) * 100);
        let grade = '';
        if (percentage >= 90) grade = '优秀';
        else if (percentage >= 75) grade = '良好';
        else if (percentage >= 60) grade = '及格';
        else grade = '不及格';

        const resultHTML = `
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem; border-radius: 12px; color: white; text-align: center; margin-bottom: 1rem;">
                <h3 style="margin: 0 0 0.5rem 0;">考试完成！</h3>
                <p style="font-size: 2rem; margin: 0.5rem 0;">${percentage}分</p>
                <p style="margin: 0; opacity: 0.9;">${grade} · ${score}/${total}分</p>
            </div>
            <div style="margin-bottom: 1rem;">
                <h4 style="color: #ffd700;">答题情况：</h4>
                ${results.map(r => `
                    <div style="padding: 0.5rem; margin: 0.3rem 0; border-radius: 4px; background: ${r.correct ? '#1a3322' : '#3d2020'}; color: ${r.correct ? '#69db7c' : '#ff6b6b'};">
                        ${r.type}第${r.index}题: ${r.correct ? '✅ 正确' : '❌ 错误 (答案: ' + (Array.isArray(r.correctAnswer) ? r.correctAnswer.join(', ') : r.correctAnswer) + ')'}
                    </div>
                `).join('')}
                <div style="padding: 0.5rem; margin: 0.3rem 0; border-radius: 4px; background: ${hasCode ? '#1a3322' : '#3d2020'}; color: ${hasCode ? '#69db7c' : '#ff6b6b'};">
                    编程题: ${hasCode ? '✅ 已作答 (老师手动批改)' : '❌ 未作答'}
                </div>
            </div>
            <button class="btn btn-secondary" onclick="app.loadProject(${project.id})">重新开始</button>
        `;

        document.getElementById('examContent').innerHTML = resultHTML;
        this.examStarted = false;
    }

    toggleExam() {
        if (!this.currentProject) return;
        
        if (this.examStarted) {
            this.examStarted = false;
            this.renderExamPlaceholder(this.currentProject);
            document.getElementById('startExamBtn').textContent = '开始考试';
        } else {
            this.renderExam(this.currentProject);
        }
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
        document.getElementById('startExamBtn').addEventListener('click', () => this.toggleExam());

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
    // 页面立即显示，不阻塞加载
    app = new DataAnalysisApp();
    console.log('页面已加载完成！');
});
