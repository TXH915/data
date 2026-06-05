
# 数据分析在线教育平台 - 技术架构文档

## 1. 技术选型

### 1.1 前端框架
- **HTML5** - 页面结构
- **CSS3** - 样式设计，采用现代美学设计
- **Vanilla JavaScript** - 交互逻辑，无需复杂框架

### 1.2 代码编辑器
- **CodeMirror 6** - 轻量级代码编辑器，支持Python语法高亮

### 1.3 Python运行环境
- **Pyodide** - WebAssembly版Python，可在浏览器中直接运行Python代码

### 1.4 布局系统
- **CSS Grid + Flexbox** - 响应式布局
- **Split.js** - 可拖拽调整的面板分隔

### 1.5 部署平台
- **Cloudflare Pages** - 静态网站托管

## 2. 文件结构

```
/workspace/
├── index.html                 # 主页面
├── css/
│   └── style.css             # 样式文件
├── js/
│   ├── main.js               # 主逻辑
│   ├── projects.js           # 10个项目的数据和内容
│   ├── editor.js             # 代码编辑器封装
│   ├── python-runner.js      # Python运行环境
│   └── achievements.js       # 成就系统
└── assets/                   # 静态资源
```

## 3. 核心模块设计

### 3.1 项目数据结构
```javascript
const projects = [
  {
    id: 1,
    title: "数据清洗实践",
    level: "入门",
    theory: "...", // 理论内容
    exercises: [...], // 练习题
    quiz: [...], // 测评题
    initialCode: "", // 空的初始代码
    solutionCode: "..." // 参考答案
  },
  // ... 更多项目
];
```

### 3.2 可拖拽面板系统
使用 Split.js 实现多面板拖拽调整布局

### 3.3 成就系统
- localStorage 存储成就状态
- 项目完成进度追踪
- 成就徽章展示

### 3.4 Python运行环境
- 加载 Pyodide
- 导入常用库（numpy, pandas, matplotlib）
- 安全的代码执行

## 4. 技术要点

### 4.1 Cloudflare Pages 部署
- 纯静态网站，无需后端
- CDN 加速
- 自动 HTTPS

### 4.2 响应式设计
- 桌面端优先
- 适配各种屏幕尺寸

### 4.3 性能优化
- 按需加载 Pyodide
- 代码分割
- 缓存策略
