class AchievementSystem {
    constructor() {
        this.achievements = this.loadAchievements();
        this.achievementDefinitions = [
            { id: 'first_project', name: '初学者', desc: '完成第一个项目', icon: '🌱' },
            { id: 'five_projects', name: '进阶者', desc: '完成5个项目', icon: '🚀' },
            { id: 'all_projects', name: '数据分析大师', desc: '完成全部10个项目', icon: '🏆' },
            { id: 'code_runner', name: '代码跑者', desc: '运行代码10次', icon: '⚡' },
            { id: 'quiz_master', name: '答题达人', desc: '完成所有测评', icon: '📚' },
            { id: 'beginner_complete', name: '入门精通', desc: '完成所有入门项目', icon: '✅' },
            { id: 'intermediate_complete', name: '进阶精通', desc: '完成所有进阶项目', icon: '⭐' },
            { id: 'advanced_complete', name: '高级精通', desc: '完成所有高级项目', icon: '💎' }
        ];
        this.stats = this.loadStats();
    }

    loadAchievements() {
        const saved = localStorage.getItem('data_analysis_achievements');
        return saved ? JSON.parse(saved) : {};
    }

    saveAchievements() {
        localStorage.setItem('data_analysis_achievements', JSON.stringify(this.achievements));
    }

    loadStats() {
        const saved = localStorage.getItem('data_analysis_stats');
        return saved ? JSON.parse(saved) : {
            projectsCompleted: [],
            codeRuns: 0,
            quizzesCompleted: []
        };
    }

    saveStats() {
        localStorage.setItem('data_analysis_stats', JSON.stringify(this.stats));
    }

    unlockAchievement(id) {
        if (!this.achievements[id]) {
            this.achievements[id] = {
                unlocked: true,
                unlockedAt: new Date().toISOString()
            };
            this.saveAchievements();
            this.showNotification(id);
            return true;
        }
        return false;
    }

    showNotification(id) {
        const achievement = this.achievementDefinitions.find(a => a.id === id);
        if (achievement) {
            const notification = document.createElement('div');
            notification.className = 'achievement-notification';
            notification.innerHTML = `
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">${achievement.icon}</div>
                <div style="font-weight: bold;">成就解锁！</div>
                <div>${achievement.name}</div>
                <div style="font-size: 0.8rem; opacity: 0.8;">${achievement.desc}</div>
            `;
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
        }
    }

    recordCodeRun() {
        this.stats.codeRuns++;
        this.saveStats();
        this.checkAchievements();
    }

    completeProject(projectId) {
        if (!this.stats.projectsCompleted.includes(projectId)) {
            this.stats.projectsCompleted.push(projectId);
            this.saveStats();
            this.checkAchievements();
        }
    }

    completeQuiz(projectId) {
        if (!this.stats.quizzesCompleted.includes(projectId)) {
            this.stats.quizzesCompleted.push(projectId);
            this.saveStats();
            this.checkAchievements();
        }
    }

    checkAchievements() {
        // 第一个项目
        if (this.stats.projectsCompleted.length >= 1) {
            this.unlockAchievement('first_project');
        }
        // 5个项目
        if (this.stats.projectsCompleted.length >= 5) {
            this.unlockAchievement('five_projects');
        }
        // 全部10个项目
        if (this.stats.projectsCompleted.length >= 10) {
            this.unlockAchievement('all_projects');
        }
        // 运行10次代码
        if (this.stats.codeRuns >= 10) {
            this.unlockAchievement('code_runner');
        }
        // 所有测评
        if (this.stats.quizzesCompleted.length >= 10) {
            this.unlockAchievement('quiz_master');
        }

        // 检查各类别完成情况
        const beginnerIds = [1, 2, 3, 4, 5];
        const intermediateIds = [6, 7, 8];
        const advancedIds = [9, 10];

        if (beginnerIds.every(id => this.stats.projectsCompleted.includes(id))) {
            this.unlockAchievement('beginner_complete');
        }
        if (intermediateIds.every(id => this.stats.projectsCompleted.includes(id))) {
            this.unlockAchievement('intermediate_complete');
        }
        if (advancedIds.every(id => this.stats.projectsCompleted.includes(id))) {
            this.unlockAchievement('advanced_complete');
        }
    }

    getUnlockedCount() {
        return Object.values(this.achievements).filter(a => a.unlocked).length;
    }

    renderAchievements() {
        const container = document.getElementById('achievementsContent');
        container.innerHTML = '';

        const grid = document.createElement('div');
        grid.className = 'achievement-grid';

        this.achievementDefinitions.forEach(achievement => {
            const isUnlocked = this.achievements[achievement.id]?.unlocked;
            const card = document.createElement('div');
            card.className = `achievement-card ${isUnlocked ? 'unlocked' : ''}`;
            card.innerHTML = `
                <div class="achievement-icon">${isUnlocked ? achievement.icon : '🔒'}</div>
                <div style="font-weight: ${isUnlocked ? 'bold' : 'normal'};">${achievement.name}</div>
                <div style="font-size: 0.8rem; opacity: 0.7;">${achievement.desc}</div>
            `;
            grid.appendChild(card);
        });

        container.appendChild(grid);

        const statsDiv = document.createElement('div');
        statsDiv.style.marginTop = '2rem';
        statsDiv.style.padding = '1rem';
        statsDiv.style.background = 'var(--card-color)';
        statsDiv.style.borderRadius = '10px';
        statsDiv.innerHTML = `
            <h4 style="margin-bottom: 1rem;">📊 学习统计</h4>
            <p>已完成项目: ${this.stats.projectsCompleted.length} / 10</p>
            <p>代码运行次数: ${this.stats.codeRuns}</p>
            <p>已完成测评: ${this.stats.quizzesCompleted.length} / 10</p>
            <p>已获成就: ${this.getUnlockedCount()} / ${this.achievementDefinitions.length}</p>
        `;
        container.appendChild(statsDiv);
    }
}

const achievementSystem = new AchievementSystem();
