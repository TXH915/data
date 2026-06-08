const projects = [
    {
        id: 1,
        title: "Data清洗实践",
        level: "入门",
        description: "学习处理缺失值、异常值和Data转换",
        theory: `
<h3>一、Data清洗概述</h3>
<p>Data清洗是Data分析流程的第一步，也是最关键的一步。据统计，Data分析师约80%的时间都花在Data清洗上。</p>

<h4>1.1 Data质量的重要性</h4>
<ul>
    <li><b>"垃圾进，垃圾出"</b>：错误的Data会导致错误的分析结果</li>
    <li><b>决策影响</b>：错误的Data可能导致错误的商业决策</li>
    <li><b>模型训练</b>：脏Data会降低机器学习模型的准确性</li>
</ul>

<h3>二、常见Data问题</h3>

<h4>2.1 缺失值</h4>
<p>Data集中某些字段为空或不存在</p>
<ul>
    <li><b>原因</b>：Data采集遗漏、用户拒绝填写、系统错误</li>
    <li><b>影响</b>：导致统计偏差、模型无法训练</li>
</ul>

<h4>2.2 异常值</h4>
<p>与其他Data显著不同的数值</p>
<ul>
    <li><b>原因</b>：Data录入错误、测量误差、真实异常事件</li>
    <li><b>影响</b>：扭曲统计结果、影响模型性能</li>
</ul>

<h4>2.3 重复Data</h4>
<p>完全相同或高度相似的记录</p>
<ul>
    <li><b>原因</b>：Data重复录入、系统合并错误</li>
    <li><b>影响</b>：统计结果膨胀、分析结果失真</li>
</ul>

<h4>2.4 Data类型错误</h4>
<p>Data类型与预期不符</p>
<ul>
    <li><b>常见问题</b>：数值存储为字符串、日期格式不一致</li>
    <li><b>影响</b>：无法进行数学运算、比较操作出错</li>
</ul>

<h3>三、处理缺失值的方法</h3>

<h4>3.1 删除法</h4>
<ul>
    <li><code>df.dropna()</code> - 删除包含缺失值的行</li>
    <li><code>df.dropna(axis=1)</code> - 删除包含缺失值的列</li>
    <li><b>适用场景</b>：缺失值比例较低（<5%）时使用</li>
</ul>

<h4>3.2 填充法</h4>
<ul>
    <li><code>df.fillna(value)</code> - 用指定值填充</li>
    <li><code>df.fillna(df.mean())</code> - 用均值填充（适用于正态分布）</li>
    <li><code>df.fillna(df.median())</code> - 用中位数填充（适用于偏态分布）</li>
    <li><code>df.fillna(method='ffill')</code> - 前向填充（适用于时间序列）</li>
    <li><code>df.fillna(method='bfill')</code> - 后向填充</li>
    <li><code>df.interpolate()</code> - 插值填充（线性或多项式）</li>
</ul>

<h4>3.3 高级方法</h4>
<ul>
    <li><b>机器学习填充</b>：用KNN或回归模型预测缺失值</li>
    <li><b>多重插补</b>：生成多个完整Data集进行分析</li>
</ul>

<h3>四、识别和处理异常值</h3>

<h4>4.1 IQR（四分位距）方法</h4>
<ul>
    <li><b>步骤</b>：计算Q1、Q3、IQR = Q3 - Q1</li>
    <li><b>异常值定义</b>：小于 Q1 - 1.5×IQR 或大于 Q3 + 1.5×IQR</li>
    <li><b>优点</b>：不受极端值影响，稳健性好</li>
</ul>

<h4>4.2 Z-score方法</h4>
<ul>
    <li><b>步骤</b>：计算每个Data点的Z分数</li>
    <li><b>异常值定义</b>：|Z| > 3（通常阈值）</li>
    <li><b>优点</b>：适用于正态分布Data</li>
    <li><b>缺点</b>：受极端值影响较大</li>
</ul>

<h4>4.3 可视化方法</h4>
<ul>
    <li><b>箱线图</b>：直观展示Data分布和异常值</li>
    <li><b>散点图</b>：发现离群点</li>
    <li><b>直方图</b>：观察Data分布形态</li>
</ul>

<h4>4.4 异常值处理策略</h4>
<ul>
    <li><b>删除</b>：确认是错误Data时</li>
    <li><b>替换</b>：用均值、中位数或插值替换</li>
    <li><b>保留</b>：确认真实异常时，作为特殊情况分析</li>
    <li><b>转换</b>：对数转换等方法降低异常值影响</li>
</ul>

<h3>五、Data类型转换</h3>

<h4>5.1 基本转换</h4>
<ul>
    <li><code>df.astype('int')</code> - 转换为整数</li>
    <li><code>df.astype('float')</code> - 转换为浮点数</li>
    <li><code>pd.to_datetime(df['date'])</code> - 转换为日期</li>
</ul>

<h4>5.2 字符串处理</h4>
<ul>
    <li><code>df['col'].str.strip()</code> - 去除首尾空格</li>
    <li><code>df['col'].str.lower()</code> - 转换为小写</li>
    <li><code>df['col'].str.replace(old, new)</code> - 字符串替换</li>
</ul>

<h3>六、Data清洗工作流程</h3>
<ol>
    <li><b>检查Data</b>：查看Data结构、统计摘要</li>
    <li><b>识别问题</b>：找出缺失值、异常值、重复Data</li>
    <li><b>制定策略</b>：根据问题类型选择处理方法</li>
    <li><b>执行清洗</b>：应用清洗操作</li>
    <li><b>验证结果</b>：检查清洗后的Data质量</li>
    <li><b>记录日志</b>：保存清洗过程和决策</li>
</ol>
        `,
        exercises: [
            "创建一个包含缺失值的 DataFrame",
            "计算各列的缺失值数量",
            "用均值填充数值列的缺失值",
            "删除包含缺失值的行",
            "使用IQR方法检测异常值"
        ],
        quiz: [
            {
                question: "在 Pandas 中，用于删除缺失值的方法是？",
                options: ["drop()", "dropna()", "delete()", "remove()"],
                answer: 1
            },
            {
                question: "以下哪个不是缺失值的表示？",
                options: ["NaN", "None", "Null", "0"],
                answer: 3
            },
            {
                question: "IQR 方法中，异常值定义为？",
                options: ["超出 Q1-1.5IQR 或 Q3+1.5IQR", "超出均值±1标准差", "最大值和最小值", "中位数以外的值"],
                answer: 0
            }
        ],
        exam: {
            singleChoice: [
                {
                    question: "Data清洗通常占Data分析工作的比例约为？",
                    options: ["20%", "50%", "80%", "95%"],
                    answer: 2
                },
                {
                    question: "以下哪种方法最适合填充偏态分布Data的缺失值？",
                    options: ["均值", "中位数", "众数", "0"],
                    answer: 1
                },
                {
                    question: "Z-score方法适用于哪种Data分布？",
                    options: ["正态分布", "偏态分布", "均匀分布", "任何分布"],
                    answer: 0
                }
            ],
            multipleChoice: [
                {
                    question: "以下哪些是常见的Data质量问题？（多选）",
                    options: ["缺失值", "异常值", "重复Data", "Data类型错误"],
                    answer: [0, 1, 2, 3]
                },
                {
                    question: "处理缺失值的方法包括？（多选）",
                    options: ["删除法", "填充法", "插值法", "回归预测法"],
                    answer: [0, 1, 2, 3]
                }
            ],
            trueFalse: [
                {
                    question: "缺失值比例超过50%的列应该直接删除",
                    answer: true
                },
                {
                    question: "Z-score方法不受极端值影响",
                    answer: false
                },
                {
                    question: "箱线图可以用来识别异常值",
                    answer: true
                }
            ],
            codeQuestion: {
                question: "编写代码：创建一个包含缺失值的DataFrame，统计各列缺失值数量，并Fill missing values with median",
                initialCode: "# 请在此处编写代码\nimport pandas as pd\nimport numpy as np\n\n# 创建包含缺失值的DataFrame\n\n\n# 统计各列缺失值数量\n\n\n# Fill missing values with median",
                solutionCode: `import pandas as pd
import numpy as np

# 创建包含缺失值的DataFrame
data = {
    'A': [1, 2, np.nan, 4, 5],
    'B': [np.nan, 2, 3, np.nan, 5],
    'C': [1, 2, 3, 4, 5]
}
df = pd.DataFrame(data)

# 统计各列缺失值数量
print("Missing Values Statistics:")
print(df.isnull().sum())

# Fill missing values with median
df_filled = df.fillna(df.median())
print("\\nFilled Data:")
print(df_filled.to_string())`
            }
        },
        initialCode: "",
        solutionCode: `import pandas as pd
import numpy as np

# 创建示例数据
data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'David', None, 'Eve'],
    'Age': [25, np.nan, 30, 35, 28, 200],
    'Income': [5000, 6000, np.nan, 8000, 7000, 7500]
}
df = pd.DataFrame(data)
print("原始数据:")
print(df.to_string())
print()

# 查看缺失值
print("缺失值统计:")
print(df.isnull().sum())
print()

# 填充缺失值
df['Age'] = df['Age'].fillna(df['Age'].mean())
df['Income'] = df['Income'].fillna(df['Income'].median())
df = df.dropna(subset=['Name'])

# 处理异常值
Q1 = df['Age'].quantile(0.25)
Q3 = df['Age'].quantile(0.75)
IQR = Q3 - Q1
df = df[(df['Age'] >= Q1 - 1.5*IQR) & (df['Age'] <= Q3 + 1.5*IQR)]

print("清洗后的数据:")
print(df.to_string())
`
    },
    {
        id: 2,
        title: "Data可视化基础",
        level: "入门",
        description: "使用 Matplotlib 绘制基础图表",
        theory: `
<h3>一、Data可视化概述</h3>
<p>Data可视化是将Data转化为图形或图表的过程，帮助人们理解Data中的模式、趋势和关系。</p>

<h4>1.1 可视化的重要性</h4>
<ul>
    <li><b>发现模式</b>：可视化能帮助发现Data中的隐藏模式</li>
    <li><b>沟通交流</b>：图表比表格更易于理解和传播</li>
    <li><b>决策支持</b>：帮助决策者快速把握关键信息</li>
    <li><b>讲故事</b>：通过可视化讲述Data背后的故事</li>
</ul>

<h4>1.2 可视化设计原则</h4>
<ul>
    <li><b>清晰性</b>：避免不必要的装饰，保持简洁</li>
    <li><b>准确性</b>：Data展示必须准确无误</li>
    <li><b>一致性</b>：保持颜色、字体、风格的一致性</li>
    <li><b>可读性</b>：确保图表易于阅读和理解</li>
</ul>

<h3>二、常用图表类型</h3>

<h4>2.1 折线图 (Line Chart)</h4>
<ul>
    <li><b>用途</b>：展示趋势变化、时间序列Data</li>
    <li><b>特点</b>：适合展示连续Data的变化趋势</li>
    <li><b>示例场景</b>：股票价格走势、销售趋势、温度变化</li>
</ul>

<h4>2.2 柱状图 (Bar Chart)</h4>
<ul>
    <li><b>用途</b>：比较不同类别的Data</li>
    <li><b>特点</b>：适合离散Data的比较</li>
    <li><b>示例场景</b>：各部门Revenue对比、不同ProductSales比较</li>
    <li><b>变种</b>：水平柱状图、堆叠柱状图、分组柱状图</li>
</ul>

<h4>2.3 散点图 (Scatter Plot)</h4>
<ul>
    <li><b>用途</b>：展示两个变量之间的关系</li>
    <li><b>特点</b>：可以发现变量间的相关性</li>
    <li><b>示例场景</b>：身高与体重的关系、广告投入与Revenue</li>
    <li><b>颜色编码</b>：可使用颜色表示第三个变量</li>
</ul>

<h4>2.4 直方图 (Histogram)</h4>
<ul>
    <li><b>用途</b>：展示Data的分布情况</li>
    <li><b>特点</b>：将Data分组，显示每组的频数</li>
    <li><b>示例场景</b>：学生成绩分布、Income分布</li>
    <li><b>注意</b>：与柱状图的区别在于直方图展示连续Data</li>
</ul>

<h4>2.5 饼图 (Pie Chart)</h4>
<ul>
    <li><b>用途</b>：展示各部分占总体的比例</li>
    <li><b>特点</b>：适合展示百分比Data</li>
    <li><b>示例场景</b>：市场份额、人口构成、费用占比</li>
    <li><b>注意</b>：类别不宜过多（建议不超过7个）</li>
</ul>

<h4>2.6 箱线图 (Box Plot)</h4>
<ul>
    <li><b>用途</b>：展示Data的分布和异常值</li>
    <li><b>特点</b>：显示五数概括（最小值、Q1、中位数、Q3、最大值）</li>
    <li><b>示例场景</b>：比较不同组Data的分布、识别异常值</li>
</ul>

<h3>三、Matplotlib基础</h3>

<h4>3.1 基本绘图步骤</h4>
<ol>
    <li><code>import matplotlib.pyplot as plt</code> - 导入库</li>
    <li><code>plt.figure()</code> - 创建图形对象</li>
    <li><code>plt.plot() / plt.bar() / plt.scatter()</code> - 绘制图表</li>
    <li><code>plt.title()</code> - 添加标题</li>
    <li><code>plt.xlabel()</code> / <code>plt.ylabel()</code> - 添加轴标签</li>
    <li><code>plt.legend()</code> - 添加图例</li>
    <li><code>plt.grid()</code> - 添加网格</li>
    <li><code>plt.savefig()</code> - 保存图表</li>
</ol>

<h4>3.2 常用参数</h4>
<ul>
    <li><b>color</b>：线条/填充颜色</li>
    <li><b>linestyle</b>：线条样式（'-', '--', '-.', ':'）</li>
    <li><b>marker</b>：Data点标记（'o', 's', '^', '*'）</li>
    <li><b>alpha</b>：透明度（0-1）</li>
    <li><b>label</b>：图例标签</li>
</ul>

<h4>3.3 子图布局</h4>
<ul>
    <li><code>plt.subplot(rows, cols, index)</code> - 创建子图</li>
    <li><code>fig, axes = plt.subplots(rows, cols)</code> - 创建子图数组</li>
    <li><code>plt.tight_layout()</code> - 自动调整子图间距</li>
</ul>

<h3>四、图表美化技巧</h3>

<h4>4.1 颜色选择</h4>
<ul>
    <li><b>使用预定义配色方案</b>：plt.style.use('seaborn')</li>
    <li><b>使用颜色映射</b>：cmap参数</li>
    <li><b>保持颜色一致性</b>：同一类Data使用相同颜色</li>
</ul>

<h4>4.2 添加注释和标注</h4>
<ul>
    <li><code>plt.text()</code> - 添加文本注释</li>
    <li><code>plt.annotate()</code> - 添加带箭头的注释</li>
    <li><code>plt.axhline()</code> / <code>plt.axvline()</code> - 添加参考线</li>
</ul>

<h4>4.3 保存高质量图表</h4>
<ul>
    <li><code>plt.savefig('figure.png', dpi=300)</code> - 高分辨率保存</li>
    <li><code>plt.savefig('figure.pdf')</code> - 矢量图格式</li>
    <li><code>bbox_inches='tight'</code> - 裁剪多余空白</li>
</ul>

<h3>五、实战建议</h3>
<ul>
    <li><b>选择合适的图表类型</b>：根据Data类型和分析目的选择</li>
    <li><b>避免图表过载</b>：一个图表只展示一个核心信息</li>
    <li><b>添加必要的注释</b>：帮助读者理解图表内容</li>
    <li><b>测试不同的配色方案</b>：确保图表在不同场景下都可读</li>
</ul>
        `,
        exercises: [
            "绘制一条正弦曲线",
            "创建包含两个系列的折线图",
            "绘制柱状图比较不同类别",
            "制作散点图展示相关关系",
            "绘制直方图展示Data分布"
        ],
        quiz: [
            {
                question: "Matplotlib 中绘制折线图的函数是？",
                options: ["line()", "plot()", "draw()", "chart()"],
                answer: 1
            },
            {
                question: "比较不同类别最好使用？",
                options: ["折线图", "散点图", "柱状图", "饼图"],
                answer: 2
            }
        ],
        exam: {
            singleChoice: [
                {
                    question: "展示时间序列Data的趋势变化，最合适的图表类型是？",
                    options: ["柱状图", "折线图", "饼图", "直方图"],
                    answer: 1
                },
                {
                    question: "以下哪种图表适合展示Data的分布情况？",
                    options: ["折线图", "饼图", "直方图", "散点图"],
                    answer: 2
                },
                {
                    question: "Matplotlib中添加标题的函数是？",
                    options: ["title()", "label()", "caption()", "heading()"],
                    answer: 0
                }
            ],
            multipleChoice: [
                {
                    question: "以下哪些是Matplotlib的常用绘图函数？（多选）",
                    options: ["plt.plot()", "plt.bar()", "plt.scatter()", "plt.hist()"],
                    answer: [0, 1, 2, 3]
                },
                {
                    question: "适合展示比例关系的图表有？（多选）",
                    options: ["饼图", "柱状图", "堆叠柱状图", "折线图"],
                    answer: [0, 2]
                }
            ],
            trueFalse: [
                {
                    question: "直方图和柱状图是一样的",
                    answer: false
                },
                {
                    question: "散点图可以用来展示两个变量之间的关系",
                    answer: true
                },
                {
                    question: "饼图适合展示超过10个类别的Data",
                    answer: false
                }
            ],
            codeQuestion: {
                question: "编写代码：创建一个包含三条曲线的折线图，每条曲线使用不同颜色和标记，并添加标题、坐标轴标签和图例",
                initialCode: "# 请在此处编写代码\nimport matplotlib.pyplot as plt\nimport numpy as np\n\n# 创建Data\n\n\n# 绘制三条曲线\n\n\n# 添加标题和标签\n\n\n# 添加图例\n\n\n# 保存图表",
                solutionCode: "import matplotlib.pyplot as plt\nimport numpy as np\n\n# 创建Data\nx = np.linspace(0, 10, 100)\ny1 = np.sin(x)\ny2 = np.cos(x)\ny3 = np.tan(x) * 0.1\n\n# 绘制三条曲线\nplt.figure(figsize=(10, 6))\nplt.plot(x, y1, label='sin(x)', color='blue', marker='o', markersize=3)\nplt.plot(x, y2, label='cos(x)', color='red', marker='s', markersize=3)\nplt.plot(x, y3, label='tan(x)*0.1', color='green', marker='^', markersize=3)\n\n# 添加标题和标签\nplt.title('Trigonometric Function Curves', fontsize=14)\nplt.xlabel('X-axis', fontsize=12)\nplt.ylabel('Y-axis', fontsize=12)\n\n# 添加图例\nplt.legend(fontsize=12)\n\n# 添加网格\nplt.grid(True, alpha=0.3)\n\n# 保存图表\nplt.savefig('trig_plot.png', dpi=150, bbox_inches='tight')\nprint(\"Chart saved as trig_plot.png\")"
            }
        },
        initialCode: "",
        solutionCode: `import matplotlib.pyplot as plt
import numpy as np

# 创建Data
x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)

# 折线图
plt.figure(figsize=(12, 8))

plt.subplot(2, 2, 1)
plt.plot(x, y1, label='sin(x)', color='blue')
plt.plot(x, y2, label='cos(x)', color='red', linestyle='--')
plt.title('Trigonometric Function Curves')
plt.xlabel('x')
plt.ylabel('y')
plt.legend()
plt.grid(True, alpha=0.3)

# 柱状图
plt.subplot(2, 2, 2)
categories = ['A', 'B', 'C', 'D']
values = [30, 45, 25, 50]
plt.bar(categories, values, color=['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3'])
plt.title('类别比较')
plt.ylabel('数值')

# 散点图
plt.subplot(2, 2, 3)
x_scatter = np.random.rand(50)
y_scatter = x_scatter + np.random.randn(50) * 0.1
plt.scatter(x_scatter, y_scatter, alpha=0.6, color='purple')
plt.title('散点图')
plt.xlabel('X')
plt.ylabel('Y')

# 直方图
plt.subplot(2, 2, 4)
data = np.random.randn(1000)
plt.hist(data, bins=30, color='skyblue', edgecolor='black')
plt.title('正态分布直方图')

plt.tight_layout()
plt.savefig('visualization.png', dpi=150)
print("Chart saved as visualization.png")
`
    },
    {
        id: 3,
        title: "统计分析入门",
        level: "入门",
        description: "学习描述性统计和基础推断统计",
        theory: `
<h3>一、统计学概述</h3>
<p>统计学是研究Data收集、整理、分析和解释的科学，是Data分析的核心基础。</p>

<h4>1.1 统计学的重要性</h4>
<ul>
    <li><b>Data理解</b>：帮助理解Data的特征和规律</li>
    <li><b>决策支持</b>：为决策提供量化依据</li>
    <li><b>预测未来</b>：基于历史Data预测未来趋势</li>
    <li><b>假设检验</b>：验证假设是否成立</li>
</ul>

<h4>1.2 统计学分类</h4>
<ul>
    <li><b>描述性统计</b>：总结和描述Data的基本特征</li>
    <li><b>推断性统计</b>：从样本推断总体特征</li>
</ul>

<h3>二、描述性统计</h3>

<h4>2.1 集中趋势度量</h4>

<h5>均值 (Mean)</h5>
<ul>
    <li><b>定义</b>：所有Data值的总和除以Data个数</li>
    <li><b>公式</b>：μ = (x₁ + x₂ + ... + xₙ) / n</li>
    <li><b>优点</b>：利用所有Data信息</li>
    <li><b>缺点</b>：受极端值影响较大</li>
    <li><b>适用场景</b>：Data分布对称，无极端值</li>
</ul>

<h5>中位数 (Median)</h5>
<ul>
    <li><b>定义</b>：将Data排序后位于中间位置的值</li>
    <li><b>计算</b>：n为奇数时取中间值，n为偶数时取中间两个值的平均</li>
    <li><b>优点</b>：不受极端值影响</li>
    <li><b>适用场景</b>：Data存在极端值或偏态分布</li>
</ul>

<h5>众数 (Mode)</h5>
<ul>
    <li><b>定义</b>：出现次数最多的值</li>
    <li><b>特点</b>：可以有多个众数，也可能没有众数</li>
    <li><b>适用场景</b>：分类Data或离散Data</li>
</ul>

<h4>2.2 离散程度度量</h4>

<h5>极差 (Range)</h5>
<ul>
    <li><b>定义</b>：最大值与最小值之差</li>
    <li><b>公式</b>：Range = max(x) - min(x)</li>
    <li><b>缺点</b>：只考虑两个极端值，忽略中间Data</li>
</ul>

<h5>方差 (Variance)</h5>
<ul>
    <li><b>定义</b>：各Data与均值差的平方的平均值</li>
    <li><b>公式</b>：σ² = Σ(xᵢ - μ)² / n</li>
    <li><b>特点</b>：单位是Data单位的平方</li>
</ul>

<h5>标准差 (Standard Deviation)</h5>
<ul>
    <li><b>定义</b>：方差的平方根</li>
    <li><b>公式</b>：σ = √(σ²)</li>
    <li><b>特点</b>：单位与Data单位相同，更易理解</li>
    <li><b>解释</b>：约68%的Data在均值±1σ范围内</li>
</ul>

<h5>四分位距 (IQR)</h5>
<ul>
    <li><b>定义</b>：Q3 - Q1</li>
    <li><b>优点</b>：不受极端值影响</li>
    <li><b>应用</b>：识别异常值（IQR方法）</li>
</ul>

<h4>2.3 分布形态度量</h4>

<h5>偏度 (Skewness)</h5>
<ul>
    <li><b>定义</b>：衡量Data分布的不对称程度</li>
    <li><b>左偏 (负偏)</b>：均值 < 中位数，长尾在左侧</li>
    <li><b>右偏 (正偏)</b>：均值 > 中位数，长尾在右侧</li>
    <li><b>对称</b>：偏度接近0</li>
</ul>

<h5>峰度 (Kurtosis)</h5>
<ul>
    <li><b>定义</b>：衡量Data分布的峰态</li>
    <li><b>尖峰</b>：峰度 > 0，Data集中在均值附近</li>
    <li><b>平峰</b>：峰度 < 0，Data分布较为分散</li>
    <li><b>正态分布</b>：峰度 = 0</li>
</ul>

<h3>三、概率分布</h3>

<h4>3.1 正态分布 (Normal Distribution)</h4>
<ul>
    <li><b>特点</b>：对称、钟形曲线</li>
    <li><b>参数</b>：均值(μ)和标准差(σ)</li>
    <li><b>应用</b>：自然现象、测量误差等</li>
    <li><b>经验法则</b>：68-95-99.7规则</li>
</ul>

<h4>3.2 二项分布 (Binomial Distribution)</h4>
<ul>
    <li><b>特点</b>：独立重复试验，只有两种结果</li>
    <li><b>参数</b>：试验次数(n)，成功概率(p)</li>
    <li><b>应用</b>：抛硬币、Product检验等</li>
</ul>

<h4>3.3 泊松分布 (Poisson Distribution)</h4>
<ul>
    <li><b>特点</b>：单位时间内事件发生的次数</li>
    <li><b>参数</b>：平均发生率(λ)</li>
    <li><b>应用</b>：网站访问量、事故发生次数等</li>
</ul>

<h3>四、推断性统计基础</h3>

<h4>4.1 抽样与样本</h4>
<ul>
    <li><b>总体</b>：研究对象的全体</li>
    <li><b>样本</b>：从总体中抽取的一部分</li>
    <li><b>抽样方法</b>：简单随机抽样、分层抽样、整群抽样</li>
</ul>

<h4>4.2 中心极限定理</h4>
<ul>
    <li><b>内容</b>：大量独立随机变量的和近似服从正态分布</li>
    <li><b>意义</b>：为推断统计提供理论基础</li>
</ul>

<h4>4.3 置信区间</h4>
<ul>
    <li><b>定义</b>：包含总体参数的区间估计</li>
    <li><b>置信水平</b>：区间包含真实参数的概率（通常95%）</li>
    <li><b>计算公式</b>：样本均值 ± 临界值 × 标准误差</li>
</ul>

<h4>4.4 假设检验</h4>
<ul>
    <li><b>原假设 (H₀)</b>：待检验的假设</li>
    <li><b>备择假设 (H₁)</b>：与原假设对立的假设</li>
    <li><b>P值</b>：在原假设成立时，观察到当前Data或更极端Data的概率</li>
    <li><b>决策</b>：P值 < α（通常0.05）则拒绝原假设</li>
</ul>

<h3>五、相关分析</h3>

<h4>5.1 皮尔逊相关系数</h4>
<ul>
    <li><b>范围</b>：-1 到 1</li>
    <li><b>解释</b>：
        <ul>
            <li>0.8-1.0：强正相关</li>
            <li>0.4-0.8：中等正相关</li>
            <li>0.0-0.4：弱正相关</li>
            <li>-0.4-0：弱负相关</li>
            <li>-0.8--0.4：中等负相关</li>
            <li>-1.0--0.8：强负相关</li>
        </ul>
    </li>
    <li><b>注意</b>：相关不等于因果</li>
</ul>

<h3>六、Python统计分析实战</h3>

<h4>6.1 NumPy统计函数</h4>
<ul>
    <li><code>np.mean()</code> - 均值</li>
    <li><code>np.median()</code> - 中位数</li>
    <li><code>np.std()</code> - 标准差</li>
    <li><code>np.var()</code> - 方差</li>
    <li><code>np.percentile()</code> - 分位数</li>
    <li><code>np.corrcoef()</code> - 相关系数</li>
</ul>

<h4>6.2 Pandas统计函数</h4>
<ul>
    <li><code>df.describe()</code> - 生成统计摘要</li>
    <li><code>df.mean()</code> - 列均值</li>
    <li><code>df.corr()</code> - 相关矩阵</li>
</ul>
        `,
        exercises: [
            "生成一组随机Data",
            "计算各项描述性统计指标",
            "计算两组Data的相关系数",
            "绘制Data的直方图",
            "计算置信区间"
        ],
        quiz: [
            {
                question: "不受极端值影响的集中趋势指标是？",
                options: ["均值", "中位数", "众数", "都是"],
                answer: 1
            },
            {
                question: "标准差的平方是？",
                options: ["方差", "极差", "均值", "分位数"],
                answer: 0
            },
            {
                question: "相关系数的取值范围是？",
                options: ["0到1", "-1到1", "0到100", "-100到100"],
                answer: 1
            }
        ],
        exam: {
            singleChoice: [
                {
                    question: "描述Data集中趋势的指标不包括？",
                    options: ["均值", "中位数", "标准差", "众数"],
                    answer: 2
                },
                {
                    question: "当Data存在极端值时，最好使用哪个指标表示集中趋势？",
                    options: ["均值", "中位数", "众数", "标准差"],
                    answer: 1
                },
                {
                    question: "正态分布中，约多少Data在均值±1标准差范围内？",
                    options: ["50%", "68%", "95%", "99.7%"],
                    answer: 1
                }
            ],
            multipleChoice: [
                {
                    question: "描述性统计包括哪些内容？（多选）",
                    options: ["集中趋势", "离散程度", "分布形态", "假设检验"],
                    answer: [0, 1, 2]
                },
                {
                    question: "以下哪些是衡量离散程度的指标？（多选）",
                    options: ["方差", "标准差", "极差", "中位数"],
                    answer: [0, 1, 2]
                }
            ],
            trueFalse: [
                {
                    question: "均值受极端值影响较大",
                    answer: true
                },
                {
                    question: "相关系数为0说明两个变量没有任何关系",
                    answer: false
                },
                {
                    question: "中心极限定理只适用于正态分布Data",
                    answer: false
                }
            ],
            codeQuestion: {
                question: "编写代码：生成1000个服从正态分布的随机数，计算均值、中位数、标准差、方差，并输出统计摘要",
                initialCode: "# 请在此处编写代码\nimport numpy as np\nimport pandas as pd\n\n# 生成1000个服从正态分布的随机数\n\n\n# 计算统计指标\n\n\n# 输出统计摘要",
                solutionCode: `import numpy as np
import pandas as pd

# 生成1000个服从正态分布的随机数
np.random.seed(42)
data = np.random.normal(100, 15, 1000)

# 计算统计指标
mean_val = np.mean(data)
median_val = np.median(data)
std_val = np.std(data)
var_val = np.var(data)

# 输出统计摘要
print("统计摘要:")
print(f"均值: {mean_val:.2f}")
print(f"中位数: {median_val:.2f}")
print(f"标准差: {std_val:.2f}")
print(f"方差: {var_val:.2f}")

# 使用Pandas生成完整统计摘要
df = pd.DataFrame({'数据': data})
print("")
print("Pandas统计摘要:")
print(df.describe())`
            }
        },
        initialCode: "",
        solutionCode: `import numpy as np
import pandas as pd

# 生成示例数据
np.random.seed(42)
data1 = np.random.normal(100, 15, 1000)
data2 = np.random.normal(80, 10, 1000)

print("="*50)
print("描述性统计分析")
print("="*50)

# 集中趋势
print("")
print("【集中趋势】")
print(f"数据1 均值: {np.mean(data1):.2f}")
print(f"数据1 中位数: {np.median(data1):.2f}")

# 离散程度
print("")
print("【离散程度】")
print(f"数据1 标准差: {np.std(data1):.2f}")
print(f"数据1 方差: {np.var(data1):.2f}")
print(f"数据1 极差: {np.max(data1) - np.min(data1):.2f}")

# 分位数
print("")
print("【分位数】")
print(f"Q1 (25%): {np.percentile(data1, 25):.2f}")
print(f"Q2 (50%): {np.percentile(data1, 50):.2f}")
print(f"Q3 (75%): {np.percentile(data1, 75):.2f}")

# 相关分析
print("")
print("【相关分析】")
corr_matrix = np.corrcoef(data1, data2)
print(f"Pearson相关系数: {corr_matrix[0, 1]:.4f}")

# Pandas describe
print("")
print("【Pandas 完整统计】")
df = pd.DataFrame({'数据1': data1, '数据2': data2})
print(df.describe())`
    },
    {
        id: 4,
        title: "PandasData处理",
        level: "入门",
        description: "掌握 Pandas 的核心操作",
        theory: `
<h3>一、Pandas概述</h3>
<p>Pandas是PythonData分析的核心库，提供高性能、易用的Data结构和Data分析工具。</p>

<h4>1.1 Pandas的特点</h4>
<ul>
    <li><b>强大的Data结构</b>：DataFrame和Series</li>
    <li><b>Data处理能力</b>：清洗、转换、聚合</li>
    <li><b>Data读取</b>：支持多种格式（CSV、Excel、SQL等）</li>
    <li><b>高性能</b>：基于NumPy，处理效率高</li>
</ul>

<h3>二、核心Data结构</h3>

<h4>2.1 Series</h4>
<ul>
    <li><b>定义</b>：一维带标签的数组</li>
    <li><b>特点</b>：可以存储任意Data类型</li>
    <li><b>创建</b>：pd.Series(data, index=labels)</li>
    <li><b>索引</b>：可以通过标签或位置访问</li>
</ul>

<h4>2.2 DataFrame</h4>
<ul>
    <li><b>定义</b>：二维表格Data结构</li>
    <li><b>特点</b>：行和列都有标签</li>
    <li><b>创建</b>：pd.DataFrame(data, index, columns)</li>
    <li><b>组成</b>：多个Series组成</li>
</ul>

<h3>三、Data读取与写入</h3>

<h4>3.1 读取CSV文件</h4>
<ul>
    <li><code>pd.read_csv('file.csv')</code> - 读取CSV</li>
    <li><code>pd.read_csv('file.csv', header=0)</code> - 指定表头行</li>
    <li><code>pd.read_csv('file.csv', index_col=0)</code> - 指定索引列</li>
    <li><code>pd.read_csv('file.csv', sep=';')</code> - 指定分隔符</li>
</ul>

<h4>3.2 读取Excel文件</h4>
<ul>
    <li><code>pd.read_excel('file.xlsx')</code> - 读取Excel</li>
    <li><code>pd.read_excel('file.xlsx', sheet_name='Sheet1')</code> - 指定工作表</li>
</ul>

<h4>3.3 写入文件</h4>
<ul>
    <li><code>df.to_csv('output.csv')</code> - 写入CSV</li>
    <li><code>df.to_excel('output.xlsx')</code> - 写入Excel</li>
    <li><code>df.to_csv('output.csv', index=False)</code> - 不写入索引</li>
</ul>

<h3>四、Data查看与探索</h3>

<h4>4.1 基本信息</h4>
<ul>
    <li><code>df.head()</code> - 查看前几行（默认5行）</li>
    <li><code>df.tail()</code> - 查看后几行</li>
    <li><code>df.shape</code> - Data形状（行数,列数）</li>
    <li><code>df.info()</code> - Data类型和非空值信息</li>
    <li><code>df.dtypes</code> - 各列Data类型</li>
    <li><code>df.columns</code> - 列名</li>
    <li><code>df.index</code> - 索引</li>
</ul>

<h4>4.2 统计摘要</h4>
<ul>
    <li><code>df.describe()</code> - 数值列统计摘要</li>
    <li><code>df.describe(include='object')</code> - 类别列统计</li>
    <li><code>df.mean()</code> - 各列均值</li>
    <li><code>df.sum()</code> - 各列求和</li>
</ul>

<h3>五、Data选择与筛选</h3>

<h4>5.1 选择列</h4>
<ul>
    <li><code>df['列名']</code> - 选择单列</li>
    <li><code>df[['列1', '列2']]</code> - 选择多列</li>
</ul>

<h4>5.2 选择行</h4>
<ul>
    <li><code>df.loc['行标签']</code> - 通过标签选择</li>
    <li><code>df.iloc[行索引]</code> - 通过位置选择</li>
    <li><code>df.iloc[0:5]</code> - 选择前5行</li>
</ul>

<h4>5.3 条件筛选</h4>
<ul>
    <li><code>df[df['列'] > 10]</code> - 单条件筛选</li>
    <li><code>df[(df['列1'] > 10) & (df['列2'] < 5)]</code> - 多条件筛选（&表示且）</li>
    <li><code>df[(df['列'] == 'A') | (df['列'] == 'B')]</code> - 或条件（|表示或）</li>
    <li><code>df[df['列'].isin(['A', 'B', 'C'])]</code> - 包含在列表中</li>
</ul>

<h3>六、Data处理</h3>

<h4>6.1 缺失值处理</h4>
<ul>
    <li><code>df.isnull()</code> - 检测缺失值</li>
    <li><code>df.isnull().sum()</code> - 统计缺失值数量</li>
    <li><code>df.dropna()</code> - 删除缺失值</li>
    <li><code>df.fillna(value)</code> - 填充缺失值</li>
</ul>

<h4>6.2 Data类型转换</h4>
<ul>
    <li><code>df.astype('int')</code> - 转换为整数</li>
    <li><code>pd.to_datetime(df['date'])</code> - 转换为日期</li>
</ul>

<h4>6.3 添加新列</h4>
<ul>
    <li><code>df['新列'] = 值</code> - 添加新列</li>
    <li><code>df['新列'] = df['列1'] + df['列2']</code> - 计算列</li>
</ul>

<h4>6.4 删除列</h4>
<ul>
    <li><code>df.drop('列名', axis=1)</code> - 删除列</li>
    <li><code>df.drop(['列1', '列2'], axis=1)</code> - 删除多列</li>
</ul>

<h3>七、Data分组与聚合</h3>

<h4>7.1 分组操作</h4>
<ul>
    <li><code>df.groupby('列')</code> - 按列分组</li>
    <li><code>df.groupby(['列1', '列2'])</code> - 多列分组</li>
</ul>

<h4>7.2 聚合操作</h4>
<ul>
    <li><code>df.groupby('列').sum()</code> - 求和</li>
    <li><code>df.groupby('列').mean()</code> - 均值</li>
    <li><code>df.groupby('列').count()</code> - 计数</li>
    <li><code>df.groupby('列').agg({'列1': 'sum', '列2': 'mean'})</code> - 多函数聚合</li>
</ul>

<h3>八、Data合并</h3>

<h4>8.1 连接操作</h4>
<ul>
    <li><code>pd.merge(df1, df2, on='键')</code> - 内连接</li>
    <li><code>pd.merge(df1, df2, on='键', how='left')</code> - 左连接</li>
    <li><code>pd.merge(df1, df2, on='键', how='right')</code> - 右连接</li>
    <li><code>pd.merge(df1, df2, on='键', how='outer')</code> - 外连接</li>
</ul>

<h4>8.2 拼接操作</h4>
<ul>
    <li><code>pd.concat([df1, df2])</code> - 纵向拼接</li>
    <li><code>pd.concat([df1, df2], axis=1)</code> - 横向拼接</li>
</ul>

<h3>九、Data排序</h3>

<h4>9.1 按列排序</h4>
<ul>
    <li><code>df.sort_values('列')</code> - 升序排序</li>
    <li><code>df.sort_values('列', ascending=False)</code> - 降序排序</li>
    <li><code>df.sort_values(['列1', '列2'])</code> - 多列排序</li>
</ul>

<h3>十、实战技巧</h3>

<h4>10.1 处理大型Data集</h4>
<ul>
    <li><code>pd.read_csv('file.csv', chunksize=10000)</code> - 分块读取</li>
    <li><code>df.memory_usage()</code> - 检查内存使用</li>
</ul>

<h4>10.2 性能优化</h4>
<ul>
    <li>使用向量化操作代替循环</li>
    <li>选择合适的Data类型（如category类型）</li>
    <li>使用query()方法进行复杂筛选</li>
</ul>
        `,
        exercises: [
            "创建一个 DataFrame",
            "选择特定的行和列",
            "按条件筛选Data",
            "进行分组聚合操作",
            "对Data进行排序"
        ],
        quiz: [
            {
                question: "Pandas 中读取 CSV 文件的函数是？",
                options: ["read()", "read_csv()", "load_csv()", "open_csv()"],
                answer: 1
            },
            {
                question: "DataFrame 的行数和列数通过哪个属性查看？",
                options: ["size", "shape", "dim", "info"],
                answer: 1
            },
            {
                question: "用于分组操作的方法是？",
                options: ["group()", "groupby()", "aggregate()", "sort()"],
                answer: 1
            }
        ],
        exam: {
            singleChoice: [
                {
                    question: "Pandas中最常用的二维Data结构是？",
                    options: ["Series", "Array", "DataFrame", "Matrix"],
                    answer: 2
                },
                {
                    question: "查看DataFrame前5行的方法是？",
                    options: ["df.first()", "df.head()", "df.top()", "df.preview()"],
                    answer: 1
                },
                {
                    question: "以下哪个方法可以删除DataFrame中的列？",
                    options: ["df.remove()", "df.drop()", "df.delete()", "df.pop()"],
                    answer: 1
                }
            ],
            multipleChoice: [
                {
                    question: "Pandas支持读取哪些格式的文件？（多选）",
                    options: ["CSV", "Excel", "JSON", "SQL"],
                    answer: [0, 1, 2, 3]
                },
                {
                    question: "以下哪些是有效的Data筛选方法？（多选）",
                    options: ["df[df['col'] > 10]", "df.loc[0:5]", "df.iloc[0]", "df.query('col > 10')"],
                    answer: [0, 1, 2, 3]
                }
            ],
            trueFalse: [
                {
                    question: "Series是一维Data结构",
                    answer: true
                },
                {
                    question: "df.drop()默认删除行",
                    answer: true
                },
                {
                    question: "merge只能进行内连接",
                    answer: false
                }
            ],
            codeQuestion: {
                question: "编写代码：创建一个销售DataFrame，包含Product、Region、Sales、Price列，计算Revenue，按Product分组统计总Sales和总Revenue，并按Revenue降序排序",
                initialCode: "# 请在此处编写代码\nimport pandas as pd\nimport numpy as np\n\n# 创建销售DataFrame\n\n\n# 计算Revenue\n\n\n# 按Product分组统计\n\n\n# 按Revenue降序排序",
                solutionCode: `import pandas as pd
import numpy as np

# 创建销售DataFrame
np.random.seed(42)
data = {
    'Product': ['A', 'B', 'A', 'C', 'B', 'A', 'C', 'A', 'B', 'C'],
    'Region': ['East', 'West', 'East', 'South', 'West', 'North', 'South', 'East', 'West', 'North'],
    'Sales': np.random.randint(100, 500, 10),
    'Price': np.random.uniform(10, 100, 10).round(2)
}
df = pd.DataFrame(data)

# 计算Revenue
df['Revenue'] = df['Sales'] * df['Price']

# 按Product分组统计
result = df.groupby('Product').agg({
    'Sales': 'sum',
    'Revenue': 'sum'
}).round(2)

# 按Revenue降序排序
result = result.sort_values('Revenue', ascending=False)

print("Grouping Statistics:")
print(result.to_string())`
            }
        },
        initialCode: "",
        solutionCode: `import pandas as pd
import numpy as np

# 创建销售Data
np.random.seed(42)
data = {
    'Product': ['A', 'B', 'A', 'C', 'B', 'A', 'C', 'A', 'B', 'C'],
    'Region': ['East', 'West', 'East', 'South', 'West', 'North', 'South', 'East', 'West', 'North'],
    'Sales': np.random.randint(100, 500, 10),
    'Price': np.random.uniform(10, 100, 10).round(2)
}

df = pd.DataFrame(data)
print("原始数据:")
print(df.to_string())
print()

# 1. 基本信息
print("【基本信息】")
print(f"形状: {df.shape}")
print(f"列名: {df.columns.tolist()}")
print()

# 2. 数据选择
print("【选择产品和销量列】")
print(df[['Product', 'Sales']].head().to_string())
print()

# 3. 条件筛选
print("【筛选产品A且销量>200】")
filter_df = df[(df['Product'] == 'A') & (df['Sales'] > 200)]
print(filter_df.to_string())
print()

# 4. 计算销售额
df['Revenue'] = df['Sales'] * df['Price']
print("【添加销售额列】")
print(df[['Product', 'Sales', 'Price', 'Revenue']].to_string())
print()

# 5. 分组聚合
print("【按产品分组统计】")
product_stats = df.groupby('Product').agg({
    'Sales': ['sum', 'mean', 'count'],
    'Revenue': 'sum'
}).round(2)
print(product_stats.to_string())
print()

# 6. 排序
print("【按销售额降序排序】")
print(df.sort_values('Revenue', ascending=False).head().to_string())
`
    },
    {
        id: 5,
        title: "Matplotlib绘图进阶",
        level: "入门",
        description: "高级图表和美化技巧",
        theory: `
<h3>一、高级图表类型</h3>

<h4>1.1 热力图 (Heatmap)</h4>
<ul>
    <li><b>用途</b>：展示矩阵Data的颜色编码</li>
    <li><b>函数</b>：<code>plt.imshow()</code> 或 Seaborn 的 <code>sns.heatmap()</code></li>
    <li><b>应用场景</b>：相关矩阵、混淆矩阵、热力分布图</li>
    <li><b>关键参数</b>：cmap（颜色映射）、vmin/vmax（颜色范围）、annot（标注数值）</li>
</ul>

<h4>1.2 等高线图 (Contour Plot)</h4>
<ul>
    <li><b>用途</b>：展示三维Data的等高线</li>
    <li><b>函数</b>：<code>plt.contour()</code>（轮廓线）、<code>plt.contourf()</code>（填充）</li>
    <li><b>应用场景</b>：地形高度、温度分布、密度图</li>
</ul>

<h4>1.3 小提琴图 (Violin Plot)</h4>
<ul>
    <li><b>用途</b>：展示Data分布的形状</li>
    <li><b>函数</b>：<code>plt.violinplot()</code> 或 <code>sns.violinplot()</code></li>
    <li><b>特点</b>：结合箱线图和核密度估计</li>
    <li><b>应用场景</b>：比较多组Data的分布</li>
</ul>

<h4>1.4 误差棒图 (Error Bar)</h4>
<ul>
    <li><b>用途</b>：展示Data的不确定性</li>
    <li><b>函数</b>：<code>plt.errorbar()</code></li>
    <li><b>参数</b>：yerr（误差值）、capsize（误差帽大小）、fmt（线条格式）</li>
    <li><b>应用场景</b>：科学实验Data、统计置信区间</li>
</ul>

<h3>二、子图布局</h3>

<h4>2.1 基础子图</h4>
<ul>
    <li><code>plt.subplot(rows, cols, index)</code> - 创建单个子图（索引从1开始）</li>
    <li><code>fig, axes = plt.subplots(rows, cols)</code> - 创建子图数组</li>
</ul>

<h4>2.2 高级布局</h4>
<ul>
    <li><code>fig.add_subplot()</code> - 灵活添加子图</li>
    <li><code>plt.GridSpec()</code> - 复杂网格布局</li>
    <li><code>fig.subplots_adjust(left, right, bottom, top, wspace, hspace)</code> - 调整子图间距</li>
</ul>

<h4>2.3 子图共享轴</h4>
<ul>
    <li><code>plt.subplots(sharex=True)</code> - 共享X-axis</li>
    <li><code>plt.subplots(sharey=True)</code> - 共享Y-axis</li>
    <li><code>plt.subplots(sharex='col')</code> - 按列共享X-axis</li>
</ul>

<h3>三、颜色和样式</h3>

<h4>3.1 颜色映射 (Colormap)</h4>
<ul>
    <li><b>顺序色图</b>：viridis, plasma, inferno, magma（从低到高渐变）</li>
    <li><b>发散色图</b>：coolwarm, RdBu, seismic（中间向两端发散）</li>
    <li><b>定性色图</b>：Set1, Set2, tab10（用于区分不同类别）</li>
    <li><b>使用</b>：<code>plt.imshow(data, cmap='viridis')</code></li>
</ul>

<h4>3.2 预定义样式</h4>
<ul>
    <li><code>plt.style.use('seaborn')</code> - 使用seaborn样式</li>
    <li><code>plt.style.use('ggplot')</code> - 使用ggplot2风格</li>
    <li><code>plt.style.use('dark_background')</code> - 深色背景</li>
    <li><code>plt.style.use('fivethirtyeight')</code> - 538风格</li>
    <li><code>plt.style.available</code> - 查看所有可用样式</li>
</ul>

<h4>3.3 自定义样式</h4>
<ul>
    <li><code>plt.rcParams['figure.figsize'] = (10, 6)</code> - 设置默认图大小</li>
    <li><code>plt.rcParams['font.size'] = 12</code> - 设置字体大小</li>
    <li><code>plt.rcParams['font.family'] = 'SimHei'</code> - 设置中文字体</li>
    <li><code>plt.rcParams['axes.prop_cycle']</code> - 设置颜色循环</li>
</ul>

<h3>四、文本和注释</h3>

<h4>4.1 添加文本</h4>
<ul>
    <li><code>plt.text(x, y, 'text')</code> - 在指定位置添加文本</li>
    <li><code>plt.title()</code> - 添加图表标题</li>
    <li><code>plt.xlabel() / plt.ylabel()</code> - 添加坐标轴标签</li>
</ul>

<h4>4.2 添加注释</h4>
<ul>
    <li><code>plt.annotate()</code> - 添加带箭头的注释</li>
    <li><b>参数</b>：text（文本）、xy（目标位置）、xytext（文本位置）、arrowprops（箭头属性）</li>
</ul>

<h4>4.3 数学公式</h4>
<ul>
    <li><code>plt.text(x, y, r'$\alpha + \beta = \gamma$')</code> - LaTeX公式</li>
    <li><b>常用符号</b>：希腊字母（α, β, γ）、分数（\\frac{a}{b}）、下标（_{i}）、上标（^{2}）</li>
</ul>

<h3>五、图例和标注</h3>

<h4>5.1 图例</h4>
<ul>
    <li><code>plt.legend()</code> - 添加图例</li>
    <li><code>plt.legend(loc='upper right')</code> - 指定位置</li>
    <li><code>plt.legend(fontsize=12)</code> - 设置字体大小</li>
    <li><code>plt.legend(ncol=2)</code> - 多列显示</li>
</ul>

<h4>5.2 参考线和Region</h4>
<ul>
    <li><code>plt.axhline(y, color='r')</code> - 水平参考线</li>
    <li><code>plt.axvline(x, color='r')</code> - 垂直参考线</li>
    <li><code>plt.axhspan(ymin, ymax, alpha=0.2)</code> - 水平阴影Region</li>
    <li><code>plt.axvspan(xmin, xmax, alpha=0.2)</code> - 垂直阴影Region</li>
</ul>

<h3>六、坐标轴设置</h3>

<h4>6.1 设置范围</h4>
<ul>
    <li><code>plt.xlim(min, max)</code> - 设置X-axis范围</li>
    <li><code>plt.ylim(min, max)</code> - 设置Y-axis范围</li>
</ul>

<h4>6.2 设置刻度</h4>
<ul>
    <li><code>plt.xticks([0, 1, 2], ['a', 'b', 'c'])</code> - 设置刻度标签</li>
    <li><code>plt.xticks(rotation=45)</code> - 旋转刻度标签</li>
    <li><code>plt.tick_params(axis='both', labelsize=12)</code> - 设置刻度参数</li>
</ul>

<h4>6.3 双Y-axis</h4>
<ul>
    <li><code>ax2 = ax1.twinx()</code> - 创建双Y-axis</li>
    <li><b>应用场景</b>：同时展示两个不同尺度的Data</li>
</ul>

<h3>七、3D绘图</h3>

<h4>7.1 创建3D坐标轴</h4>
<ul>
    <li><code>fig = plt.figure()</code> - 创建图形</li>
    <li><code>ax = fig.add_subplot(111, projection='3d')</code> - 创建3D坐标轴</li>
</ul>

<h4>7.2 3D图表类型</h4>
<ul>
    <li><code>ax.plot3D(x, y, z)</code> - 3D折线图</li>
    <li><code>ax.scatter3D(x, y, z)</code> - 3D散点图</li>
    <li><code>ax.plot_surface(X, Y, Z)</code> - 3D曲面图</li>
    <li><code>ax.contour3D(X, Y, Z)</code> - 3D等高线图</li>
</ul>

<h3>八、保存图表</h3>

<h4>8.1 保存格式</h4>
<ul>
    <li><code>plt.savefig('figure.png', dpi=300)</code> - PNG格式，高分辨率</li>
    <li><code>plt.savefig('figure.pdf')</code> - PDF矢量格式</li>
    <li><code>plt.savefig('figure.svg')</code> - SVG矢量格式</li>
</ul>

<h4>8.2 保存参数</h4>
<ul>
    <li><code>bbox_inches='tight'</code> - 裁剪多余空白</li>
    <li><code>facecolor='white'</code> - 设置背景色</li>
    <li><code>transparent=True</code> - 透明背景</li>
</ul>
        `,
        exercises: [
            "创建一个包含子图的图表布局",
            "使用热力图展示相关矩阵",
            "绘制带有注释的散点图",
            "创建3D曲面图",
            "自定义图表样式和颜色"
        ],
        quiz: [
            {
                question: "创建子图数组的函数是？",
                options: ["plt.subplot()", "plt.subplots()", "plt.subplot2grid()", "plt.grid()"],
                answer: 1
            },
            {
                question: "绘制热力图的函数是？",
                options: ["plt.heatmap()", "sns.heatmap()", "plt.bar()", "sns.barplot()"],
                answer: 1
            },
            {
                question: "保存图表为矢量格式的文件扩展名是？",
                options: [".png", ".jpg", ".pdf", ".bmp"],
                answer: 2
            }
        ],
        exam: {
            singleChoice: [
                {
                    question: "以下哪个不是Matplotlib的颜色映射类型？",
                    options: ["顺序色图", "发散色图", "定性色图", "随机色图"],
                    answer: 3
                },
                {
                    question: "创建3D图表需要设置哪个参数？",
                    options: ["projection='3d'", "dimension=3", "type='3d'", "mode='3d'"],
                    answer: 0
                },
                {
                    question: "保存高分辨率PNG图片的dpi值通常设置为？",
                    options: ["72", "150", "300", "600"],
                    answer: 2
                }
            ],
            multipleChoice: [
                {
                    question: "以下哪些是子图布局的调整方法？（多选）",
                    options: ["plt.tight_layout()", "fig.subplots_adjust()", "plt.GridSpec()", "plt.legend()"],
                    answer: [0, 1, 2]
                },
                {
                    question: "可以保存为矢量图的文件格式有？（多选）",
                    options: ["PDF", "SVG", "EPS", "PNG"],
                    answer: [0, 1, 2]
                }
            ],
            trueFalse: [
                {
                    question: "plt.subplot()和plt.subplots()的作用完全相同",
                    answer: false
                },
                {
                    question: "热力图可以用来展示相关性矩阵",
                    answer: true
                },
                {
                    question: "bbox_inches='tight'会保留图表周围的所有空白",
                    answer: false
                }
            ],
            codeQuestion: {
                question: "编写代码：创建一个2x2的子图布局，包含折线图、柱状图、散点图和热力图，并保存为PNG文件",
                initialCode: "# 请在此处编写代码\nimport matplotlib.pyplot as plt\nimport numpy as np\n\n# 创建2x2子图\n\n\n# 子图1：折线图\n\n\n# 子图2：柱状图\n\n\n# 子图3：散点图\n\n\n# 子图4：热力图\n\n\n# 保存图表",
                solutionCode: "import matplotlib.pyplot as plt\nimport numpy as np\n\n# 创建2x2子图\nfig, axes = plt.subplots(2, 2, figsize=(12, 10))\n\n# 子图1：折线图\nx = np.linspace(0, 10, 50)\ny1 = np.sin(x)\naxes[0, 0].plot(x, y1, 'b-', linewidth=2)\naxes[0, 0].set_title('Line Chart', fontsize=12)\naxes[0, 0].grid(True, alpha=0.3)\n\n# 子图2：柱状图\ncategories = ['A', 'B', 'C', 'D', 'E']\nvalues = [23, 45, 12, 67, 34]\naxes[0, 1].bar(categories, values, color='coral')\naxes[0, 1].set_title('Bar Chart', fontsize=12)\n\n# 子图3：散点图\nx_scatter = np.random.randn(100)\ny_scatter = np.random.randn(100)\naxes[1, 0].scatter(x_scatter, y_scatter, alpha=0.6, c='purple')\naxes[1, 0].set_title('Scatter Plot', fontsize=12)\n\n# 子图4：热力图（使用matplotlib）\ndata = np.random.rand(10, 10)\nim = axes[1, 1].imshow(data, cmap='YlOrRd', aspect='auto')\naxes[1, 1].set_title('Heatmap', fontsize=12)\nplt.colorbar(im, ax=axes[1, 1])\n\nplt.tight_layout()\nplt.savefig('advanced_charts.png', dpi=150, bbox_inches='tight')\nprint(\"Chart saved as advanced_charts.png\")"
            }
        },
        initialCode: "",
        solutionCode: `import matplotlib.pyplot as plt
import numpy as np

# 创建Data
x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)

# 创建2x2子图
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 子图1：多条曲线
axes[0, 0].plot(x, y1, label='sin(x)', color='blue')
axes[0, 0].plot(x, y2, label='cos(x)', color='red')
axes[0, 0].set_title('Multiple Curves', fontsize=14)
axes[0, 0].legend()
axes[0, 0].grid(True, alpha=0.3)

# 子图2：柱状图
categories = ['A', 'B', 'C', 'D', 'E']
values = [23, 45, 12, 67, 34]
colors = plt.cm.Set3(np.linspace(0, 1, len(categories)))
axes[0, 1].bar(categories, values, color=colors, edgecolor='black')
axes[0, 1].set_title('Bar Chart', fontsize=14)
axes[0, 1].set_ylabel('Value')

# 子图3：饼图
sizes = [15, 30, 45, 10]
labels = ['Category A', 'Category B', 'Category C', 'Category D']
axes[1, 0].pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90)
axes[1, 0].set_title('Pie Chart', fontsize=14)

# 子图4：热力图（使用matplotlib代替seaborn）
data = np.random.rand(10, 10)
im = axes[1, 1].imshow(data, cmap='viridis', aspect='auto')
axes[1, 1].set_title('Heatmap', fontsize=14)
plt.colorbar(im, ax=axes[1, 1])

plt.tight_layout()
plt.savefig('advanced_visualization.png', dpi=150, bbox_inches='tight')
print("Chart saved as advanced_visualization.png")
`
    },
    {
        id: 6,
        title: "假设检验",
        level: "进阶",
        description: "学习统计假设检验方法",
        theory: `
<h3>一、假设检验概述</h3>
<p>假设检验是推断性统计的核心方法，用于判断样本Data是否支持对总体的某种假设。</p>

<h4>1.1 基本概念</h4>
<ul>
    <li><b>原假设 (H₀)</b>：我们想要检验的假设，通常表示无差异或无效果</li>
    <li><b>备择假设 (H₁)</b>：与原假设对立的假设，表示存在差异或效果</li>
    <li><b>检验统计量</b>：用于判断的样本函数</li>
    <li><b>拒绝域</b>：使得我们拒绝原假设的统计量取值范围</li>
</ul>

<h4>1.2 假设检验的两类错误</h4>
<ul>
    <li><b>第一类错误 (α)</b>：原假设为真，但我们错误地拒绝了它</li>
    <li><b>第二类错误 (β)</b>：原假设为假，但我们错误地接受了它</li>
    <li><b>检验功效</b>：1 - β，正确拒绝假原假设的概率</li>
</ul>

<h3>二、P值与显著性水平</h3>

<h4>2.1 P值</h4>
<ul>
    <li><b>定义</b>：在原假设成立的前提下，观察到当前结果或更极端结果的概率</li>
    <li><b>解释</b>：P值越小，证据越强，越有理由拒绝原假设</li>
    <li><b>常用阈值</b>：α = 0.05 或 α = 0.01</li>
</ul>

<h4>2.2 显著性水平</h4>
<ul>
    <li><b>定义</b>：犯第一类错误的最大允许概率</li>
    <li><b>常用值</b>：0.05（5%）、0.01（1%）、0.10（10%）</li>
    <li><b>选择依据</b>：根据实际问题的容忍度确定</li>
</ul>

<h3>三、常见假设检验</h3>

<h4>3.1 单样本t检验</h4>
<ul>
    <li><b>用途</b>：检验样本均值是否等于已知总体均值</li>
    <li><b>前提</b>：Data近似正态分布</li>
    <li><b>SciPy函数</b>：<code>scipy.stats.ttest_1samp(data, popmean)</code></li>
</ul>

<h4>3.2 两独立样本t检验</h4>
<ul>
    <li><b>用途</b>：比较两个独立组的均值是否有显著差异</li>
    <li><b>前提</b>：两组Data均近似正态分布，方差相等或不等</li>
    <li><b>SciPy函数</b>：<code>scipy.stats.ttest_ind(group1, group2)</code></li>
</ul>

<h4>3.3 配对样本t检验</h4>
<ul>
    <li><b>用途</b>：比较同一组样本在两个时间点或条件下的差异</li>
    <li><b>前提</b>：配对Data的差值近似正态分布</li>
    <li><b>SciPy函数</b>：<code>scipy.stats.ttest_rel(before, after)</code></li>
</ul>

<h4>3.4 卡方检验</h4>
<ul>
    <li><b>用途</b>：检验分类变量之间的独立性或拟合优度</li>
    <li><b>分类</b>：独立性检验、拟合优度检验</li>
    <li><b>SciPy函数</b>：<code>scipy.stats.chi2_contingency(observed)</code></li>
</ul>

<h4>3.5 ANOVA（方差分析）</h4>
<ul>
    <li><b>用途</b>：比较三个或更多组的均值差异</li>
    <li><b>前提</b>：各组近似正态分布，方差齐性</li>
    <li><b>SciPy函数</b>：<code>scipy.stats.f_oneway(*groups)</code></li>
</ul>

<h3>四、效应量</h3>

<h4>4.1 为什么要报告效应量</h4>
<ul>
    <li><b>统计显著性 ≠ 实际意义</b>：大样本时，即使微小差异也可能显著</li>
    <li><b>效应量</b>：量化实际效应的大小</li>
</ul>

<h4>4.2 常用效应量指标</h4>
<ul>
    <li><b>Cohen's d</b>：用于t检验，(均值差) / 合并标准差</li>
    <li><b>η² (eta-squared)</b>：用于ANOVA，解释的方差比例</li>
    <li><b>Cramer's V</b>：用于列联表，关联强度</li>
</ul>

<h3>五、非参数检验</h3>

<h4>5.1 适用场景</h4>
<ul>
    <li><b>Data不满足正态分布</b></li>
    <li><b>样本量较小</b></li>
    <li><b>有序分类Data</b></li>
</ul>

<h4>5.2 常用非参数检验</h4>
<ul>
    <li><b>Mann-Whitney U检验</b>：两独立样本，<code>scipy.stats.mannwhitneyu()</code></li>
    <li><b>Wilcoxon符号秩检验</b>：配对样本，<code>scipy.stats.wilcoxon()</code></li>
    <li><b>Kruskal-Wallis H检验</b>：多组比较，<code>scipy.stats.kruskal()</code></li>
</ul>
        `,
        exercises: [
            "进行单样本t检验",
            "比较两组Data的均值差异",
            "执行卡方独立性检验",
            "进行单因素方差分析",
            "选择合适的检验方法并解释结果"
        ],
        quiz: [
            {
                question: "原假设和备择假设的关系是？",
                options: ["互补", "对立", "等价", "独立"],
                answer: 1
            },
            {
                question: "P值表示什么？",
                options: ["犯第二类错误的概率", "在原假设成立时观察到当前结果的概率", "效应量的大小", "样本容量"],
                answer: 1
            },
            {
                question: "当P值小于显著性水平时，我们应该？",
                options: ["接受原假设", "拒绝原假设", "增加样本量", "改变检验方法"],
                answer: 1
            }
        ],
        exam: {
            singleChoice: [
                {
                    question: "第一类错误是指？",
                    options: ["拒绝了假的原假设", "接受了假的原假设", "拒绝了真的原假设", "接受了真的原假设"],
                    answer: 2
                },
                {
                    question: "常用的显著性水平α不包括？",
                    options: ["0.01", "0.05", "0.10", "0.25"],
                    answer: 3
                },
                {
                    question: "比较三组以上均值的检验方法是？",
                    options: ["t检验", "卡方检验", "ANOVA", "相关分析"],
                    answer: 2
                }
            ],
            multipleChoice: [
                {
                    question: "参数检验的前提条件包括？（多选）",
                    options: ["正态分布", "独立性", "方差齐性", "大样本"],
                    answer: [0, 1, 2]
                },
                {
                    question: "非参数检验适用于哪些情况？（多选）",
                    options: ["Data不满足正态分布", "样本量较小", "有序分类Data", "连续型Data"],
                    answer: [0, 1, 2]
                }
            ],
            trueFalse: [
                {
                    question: "P值越小，说明原假设越可能为真",
                    answer: false
                },
                {
                    question: "统计显著性不等于实际意义",
                    answer: true
                },
                {
                    question: "ANOVA可以用于比较两组Data的均值差异",
                    answer: false
                }
            ],
            codeQuestion: {
                question: "编写代码：生成两组正态分布Data，进行独立样本t检验，计算效应量Cohen's d，并输出检验结果",
                initialCode: "# 请在此处编写代码\nimport numpy as np\nfrom scipy import stats\n\n# 生成两组Data\nnp.random.seed(42)\ngroup1 = np.random.normal(100, 15, 50)  # 均值100，标准差15\ngroup2 = np.random.normal(105, 15, 50)  # 均值105，标准差15\n\n# 进行独立样本t检验\n\n\n# 计算Cohen's d效应量\n\n\n# 输出结果",
                solutionCode: `import numpy as np
from scipy import stats

# 生成两组Data
np.random.seed(42)
group1 = np.random.normal(100, 15, 50)
group2 = np.random.normal(105, 15, 50)

# 进行独立样本t检验
t_stat, p_value = stats.ttest_ind(group1, group2)

# 计算Cohen's d效应量
mean_diff = np.mean(group1) - np.mean(group2)
pooled_std = np.sqrt(((len(group1)-1)*np.std(group1, ddof=1)**2 + 
                       (len(group2)-1)*np.std(group2, ddof=1)**2) / 
                      (len(group1)+len(group2)-2))
cohens_d = mean_diff / pooled_std

# 输出结果
print("="*50)
print("Independent t-test Results")
print("="*50)
print(f"组1 Mean: {np.mean(group1):.2f}")
print(f"组2 Mean: {np.mean(group2):.2f}")
print(f"Mean Difference: {mean_diff:.2f}")
print(f"\\nt-statistic: {t_stat:.4f}")
print(f"P-value: {p_value:.4f}")
print(f"\\nCohen's d: {cohens_d:.4f}")

if p_value < 0.05:
    print("\\nConclusion: At alpha=0.05, the difference is significant")
else:
    print("\\nConclusion: At alpha=0.05, the difference is not significant")`
            }
        },
        initialCode: "",
        solutionCode: `import numpy as np
from scipy import stats

print("="*60)
print("假设检验实战")
print("="*60)

# 示例1：单样本t检验
np.random.seed(42)
sample_data = np.random.normal(100, 15, 100)
population_mean = 100

t_stat, p_value = stats.ttest_1samp(sample_data, population_mean)
print("\n【单样本t检验】")
print(f"样本均值: {np.mean(sample_data):.2f}")
print(f"总体均值: {population_mean}")
print(f"t统计量: {t_stat:.4f}")
print(f"P值: {p_value:.4f}")

# 示例2：两独立样本t检验
group1 = np.random.normal(170, 10, 50)
group2 = np.random.normal(175, 10, 50)

t_stat2, p_value2 = stats.ttest_ind(group1, group2)
print("\n【两独立样本t检验】")
print(f"组1均值: {np.mean(group1):.2f}")
print(f"组2均值: {np.mean(group2):.2f}")
print(f"t统计量: {t_stat2:.4f}")
print(f"P值: {p_value2:.4f}")

# 示例3：卡方检验
observed = np.array([[30, 10], [15, 45]])
chi2, p_chi, dof, expected = stats.chi2_contingency(observed)
print("\n【卡方检验】")
print(f"观察频数:\n{observed}")
print(f"卡方统计量: {chi2:.4f}")
print(f"P值: {p_chi:.4f}")
print(f"自由度: {dof}")
`
    },
    {
        id: 7,
        title: "回归分析",
        level: "进阶",
        description: "掌握线性回归和多元回归分析",
        theory: `
<h3>一、回归分析概述</h3>
<p>回归分析是研究变量之间依赖关系的统计方法，用于预测和解释。</p>

<h4>1.1 回归分析的类型</h4>
<ul>
    <li><b>简单线性回归</b>：一个自变量和一个因变量</li>
    <li><b>多元线性回归</b>：多个自变量和一个因变量</li>
    <li><b>多项式回归</b>：自变量的高次幂</li>
    <li><b>逻辑回归</b>：因变量是二分类</li>
</ul>

<h3>二、简单线性回归</h3>

<h4>2.1 回归方程</h4>
<ul>
    <li><b>公式</b>：y = β₀ + β₁x + ε</li>
    <li><b>β₀</b>：截距</li>
    <li><b>β₁</b>：斜率（回归系数）</li>
    <li><b>ε</b>：误差项</li>
</ul>

<h4>2.2 最小二乘法</h4>
<ul>
    <li><b>原理</b>：使残差平方和最小</li>
    <li><b>残差</b>：观测值与预测值的差</li>
</ul>

<h3>三、回归模型的评估</h3>

<h4>3.1 决定系数 R²</h4>
<ul>
    <li><b>定义</b>：模型解释的方差比例</li>
    <li><b>范围</b>：0到1，越接近1越好</li>
    <li><b>调整R²</b>：考虑自变量数量的影响</li>
</ul>

<h4>3.2 显著性检验</h4>
<ul>
    <li><b>F检验</b>：检验模型整体显著性</li>
    <li><b>t检验</b>：检验各系数显著性</li>
    <li><b>P值</b>：< 0.05 表示显著</li>
</ul>

<h3>四、多元线性回归</h3>

<h4>4.1 模型形式</h4>
<ul>
    <li><b>公式</b>：y = β₀ + β₁x₁ + β₂x₂ + ... + βₚxₚ + ε</li>
    <li><b>多个自变量</b>：同时考虑多个因素</li>
</ul>

<h4>4.2 多重共线性</h4>
<ul>
    <li><b>问题</b>：自变量之间高度相关</li>
    <li><b>诊断</b>：VIF（方差膨胀因子）</li>
    <li><b>解决</b>：剔除变量、主成分回归</li>
</ul>

<h3>五、回归诊断</h3>

<h4>5.1 残差分析</h4>
<ul>
    <li><b>残差图</b>：检查同方差性和线性假设</li>
    <li><b>正态性检验</b>：残差近似正态分布</li>
</ul>

<h4>5.2 异常值检测</h4>
<ul>
    <li><b>标准化残差</b>：> 3 为异常</li>
    <li><b>帽子矩阵对角元素</b>：识别高杠杆点</li>
</ul>
        `,
        exercises: [
            "拟合简单线性回归模型",
            "进行多元线性回归分析",
            "评估模型的R²和调整R²",
            "绘制回归诊断图",
            "解释回归系数"
        ],
        quiz: [
            {
                question: "R²值的范围是？",
                options: ["-1到1", "0到1", "-∞到∞", "0到100"],
                answer: 1
            },
            {
                question: "多元线性回归中，多重共线性会导致什么问题？",
                options: ["预测不准", "系数估计不稳定", "残差增大", "模型不收敛"],
                answer: 1
            },
            {
                question: "调整R²与R²的主要区别是？",
                options: ["考虑样本量", "考虑自变量数量", "考虑因变量数量", "考虑残差"],
                answer: 1
            }
        ],
        exam: {
            singleChoice: [
                {
                    question: "线性回归中最小化的目标函数是？",
                    options: ["残差绝对值之和", "残差平方和", "残差立方和", "相关系数"],
                    answer: 1
                },
                {
                    question: "F检验用于检验什么？",
                    options: ["单个系数的显著性", "模型整体显著性", "残差正态性", "异常值"],
                    answer: 1
                },
                {
                    question: "VIF值大于多少通常表示严重多重共线性？",
                    options: ["5", "10", "15", "20"],
                    answer: 1
                }
            ],
            multipleChoice: [
                {
                    question: "回归诊断包括哪些内容？（多选）",
                    options: ["残差分析", "共线性诊断", "异常值检测", "聚类分析"],
                    answer: [0, 1, 2]
                },
                {
                    question: "提高模型的方法有？（多选）",
                    options: ["添加相关变量", "去除不显著变量", "多项式项", "交互项"],
                    answer: [0, 1, 2, 3]
                }
            ],
            trueFalse: [
                {
                    question: "R²越高，模型一定越好",
                    answer: false
                },
                {
                    question: "残差应该近似正态分布",
                    answer: true
                },
                {
                    question: "调整R²总是大于R²",
                    answer: false
                }
            ],
            codeQuestion: {
                question: "编写代码：创建多元回归Data，使用sklearn进行回归建模，评估模型性能，并绘制预测值与真实值的对比图",
                initialCode: "# 请在此处编写代码\nimport numpy as np\nimport matplotlib.pyplot as plt\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import r2_score, mean_squared_error\n\n# 创建Data\nnp.random.seed(42)\nn = 100\nX = np.random.randn(n, 3)  # 3个特征\ny = 2 + 3*X[:, 0] + 1.5*X[:, 1] - 2*X[:, 2] + np.random.randn(n)*0.5\n\n# 划分训练集和测试集\n\n\n# 创建并训练模型\n\n\n# 预测和评估\n\n\n# 绘制对比图",
                solutionCode: "import numpy as np\nimport matplotlib.pyplot as plt\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import r2_score, mean_squared_error\n\nnp.random.seed(42)\nn = 100\nX = np.random.randn(n, 3)\ny = 2 + 3*X[:, 0] + 1.5*X[:, 1] - 2*X[:, 2] + np.random.randn(n)*0.5\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n\ny_pred = model.predict(X_test)\n\nprint(\"=\"*50)\nprint(\"Multiple Linear Regression Results\")\nprint(\"=\"*50)\nprint(f\"Intercept: {model.intercept_:.4f}\")\nprint(f\"Coefficients: {model.coef_}\")\nprint(f\"\\nR² (Train): {model.score(X_train, y_train):.4f}\")\nprint(f\"R² (Test): {r2_score(y_test, y_pred):.4f}\")\nprint(f\"RMSE: {np.sqrt(mean_squared_error(y_test, y_pred)):.4f}\")\n\nplt.figure(figsize=(10, 5))\nplt.scatter(y_test, y_pred, alpha=0.7)\nplt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--', lw=2)\nplt.xlabel('True Values')\nplt.ylabel('Predictions')\nplt.title('Predicted vs True')\nplt.savefig('regression_result.png', dpi=150, bbox_inches='tight')\nprint(\"\\nChart saved as regression_result.png\")"
            }
        },
        initialCode: "",
        solutionCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error

print("="*60)
print("回归分析实战")
print("="*60)

# 生成示例数据
np.random.seed(42)
n = 100
x = np.linspace(0, 10, n)
y = 2 + 3 * x + np.random.randn(n) * 2

# 添加一些异常值
y[95:] += 15

# 简单线性回归
X = x.reshape(-1, 1)
model = LinearRegression()
model.fit(X, y)

y_pred = model.predict(X)

# 评估指标
r2 = r2_score(y, y_pred)
rmse = np.sqrt(mean_squared_error(y, y_pred))

print("\n【简单线性回归】")
print(f"截距: {model.intercept_:.4f}")
print(f"斜率: {model.coef_[0]:.4f}")
print(f"R²: {r2:.4f}")
print(f"RMSE: {rmse:.4f}")

# 可视化
plt.figure(figsize=(12, 5))
plt.subplot(1, 2, 1)
plt.scatter(x, y, alpha=0.6, label='数据点')
plt.plot(x, y_pred, 'r-', linewidth=2, label='回归线')
plt.xlabel('X')
plt.ylabel('Y')
plt.title('简单线性回归')
plt.legend()

plt.subplot(1, 2, 2)
residuals = y - y_pred
plt.scatter(y_pred, residuals, alpha=0.6)
plt.axhline(y=0, color='r', linestyle='--')
plt.xlabel('预测值')
plt.ylabel('残差')
plt.title('残差图')

plt.tight_layout()
plt.savefig('regression_analysis.png', dpi=150)
print("\\nChart saved as regression_analysis.png")
`
    },
    {
        id: 8,
        title: "时间序列分析",
        level: "进阶",
        description: "学习时间序列Data处理和预测",
        theory: `
<h3>一、时间序列概述</h3>
<p>时间序列是按时间顺序排列的Data序列，广泛应用于金融、气象、销售等领域。</p>

<h4>1.1 时间序列的组成</h4>
<ul>
    <li><b>趋势 (Trend)</b>：长期上升或下降的趋势</li>
    <li><b>季节性 (Seasonality)</b>：固定周期的重复模式</li>
    <li><b>周期性 (Cyclical)</b>：不固定周期的波动</li>
    <li><b>随机性 (Irregular)</b>：不可预测的随机波动</li>
</ul>

<h4>1.2 时间序列的类型</h4>
<ul>
    <li><b>平稳序列</b>：均值和方差不随时间变化</li>
    <li><b>非平稳序列</b>：存在趋势或季节性</li>
</ul>

<h3>二、时间序列Data处理</h3>

<h4>2.1 Pandas时间类型</h4>
<ul>
    <li><code>pd.to_datetime()</code> - 转换为日期时间</li>
    <li><code>pd.date_range()</code> - 生成日期范围</li>
    <li><code>df.set_index('date')</code> - 设置日期为索引</li>
</ul>

<h4>2.2 重采样</h4>
<ul>
    <li><code>df.resample('M').sum()</code> - 月度汇总</li>
    <li><code>df.resample('Q').mean()</code> - 季度汇总</li>
    <li><code>df.asfreq('D')</code> - 转换为日频率</li>
</ul>

<h3>三、滑动窗口</h3>

<h4>3.1 滑动平均</h4>
<ul>
    <li><b>作用</b>：平滑Data，消除短期波动</li>
    <li><code>df.rolling(window=7).mean()</code> - 7期滑动平均</li>
</ul>

<h4>3.2 滑动统计量</h4>
<ul>
    <li><code>df.rolling(window=7).std()</code> - 滑动标准差</li>
    <li><code>df.rolling(window=7).min()</code> - 滑动最小值</li>
    <li><code>df.rolling(window=7).max()</code> - 滑动最大值</li>
</ul>

<h3>四、时间序列分解</h3>

<h4>4.1 STL分解</h4>
<ul>
    <li><b>方法</b>：Seasonal and Trend decomposition using Loess</li>
    <li><b>优点</b>：稳健性好，适用于非线性趋势</li>
</ul>

<h4>4.2 经典分解</h4>
<ul>
    <li><b>加法模型</b>：Y = T + S + R</li>
    <li><b>乘法模型</b>：Y = T × S × R</li>
</ul>

<h3>五、时间序列预测</h3>

<h4>5.1 简单预测方法</h4>
<ul>
    <li><b>朴素法</b>：使用最后一个值预测</li>
    <li><b>移动平均法</b>：使用最近k期的平均</li>
    <li><b>指数平滑法</b>：加权平均，近期权重更大</li>
</ul>

<h4>5.2 趋势外推</h4>
<ul>
    <li><b>线性趋势</b>：拟合线性方程</li>
    <li><b>多项式趋势</b>：拟合高次方程</li>
    <li><b>指数趋势</b>：拟合指数方程</li>
</ul>
        `,
        exercises: [
            "创建日期索引的DataFrame",
            "计算滑动平均",
            "进行时间序列分解",
            "实现指数平滑预测",
            "绘制时间序列图和分解图"
        ],
        quiz: [
            {
                question: "时间序列的四个组成部分不包括？",
                options: ["趋势", "季节性", "周期性", "随机性", "规则性"],
                answer: 4
            },
            {
                question: "滑动平均的作用是？",
                options: ["预测未来值", "平滑Data", "分解序列", "检验平稳性"],
                answer: 1
            },
            {
                question: "非平稳序列可以通过什么方法转为平稳序列？",
                options: ["平均", "差分", "求和", "乘积"],
                answer: 1
            }
        ],
        exam: {
            singleChoice: [
                {
                    question: "加法分解模型的形式是？",
                    options: ["Y = T × S × R", "Y = T + S + R", "Y = T / S / R", "Y = T - S - R"],
                    answer: 1
                },
                {
                    question: "哪个不是时间序列的组成成分？",
                    options: ["趋势", "季节性", "周期性", "空间性"],
                    answer: 3
                },
                {
                    question: "指数平滑法中，近期观测值的权重通常？",
                    options: ["较小", "相等", "较大", "为零"],
                    answer: 2
                }
            ],
            multipleChoice: [
                {
                    question: "时间序列分析中的预处理包括？（多选）",
                    options: ["缺失值处理", "异常值检测", "平稳性检验", "季节性调整"],
                    answer: [0, 1, 2, 3]
                },
                {
                    question: "以下哪些是平稳序列的特征？（多选）",
                    options: ["均值恒定", "方差恒定", "无明显趋势", "无季节性"],
                    answer: [0, 1, 2, 3]
                }
            ],
            trueFalse: [
                {
                    question: "趋势是时间序列中固定周期的波动",
                    answer: false
                },
                {
                    question: "差分可以用于将非平稳序列转为平稳序列",
                    answer: true
                },
                {
                    question: "滑动窗口越大，Data越平滑",
                    answer: true
                }
            ],
            codeQuestion: {
                question: "编写代码：生成一个包含趋势和季节性的时间序列，进行滑动平均平滑，绘制原始Data和平滑后的对比图",
                initialCode: "# 请在此处编写代码\nimport numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt\n\n# 生成时间序列Data\nnp.random.seed(42)\nn = 365\ndates = pd.date_range('2024-01-01', periods=n, freq='D')\ntrend = np.linspace(50, 100, n)\nseasonality = 10 * np.sin(np.linspace(0, 4*np.pi, n))\nnoise = np.random.randn(n) * 5\ndata = trend + seasonality + noise\n\ndf = pd.DataFrame({'date': dates, 'value': data})\ndf.set_index('date', inplace=True)\n\n# 计算滑动平均\n\n\n# 绘制对比图",
                solutionCode: "import numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt\n\nnp.random.seed(42)\nn = 365\ndates = pd.date_range('2024-01-01', periods=n, freq='D')\ntrend = np.linspace(50, 100, n)\nseasonality = 10 * np.sin(np.linspace(0, 4*np.pi, n))\nnoise = np.random.randn(n) * 5\ndata = trend + seasonality + noise\n\ndf = pd.DataFrame({'date': dates, 'value': data})\ndf.set_index('date', inplace=True)\n\n# 计算滑动平均\ndf['MA7'] = df['value'].rolling(window=7).mean()\ndf['MA30'] = df['value'].rolling(window=30).mean()\n\n# 绘制对比图\nplt.figure(figsize=(14, 6))\nplt.plot(df.index, df['value'], alpha=0.5, label='Raw Data')\nplt.plot(df.index, df['MA7'], label='7-day MA', linewidth=2)\nplt.plot(df.index, df['MA30'], label='30-day MA', linewidth=2)\nplt.xlabel('Date')\nplt.ylabel('Value')\nplt.title('Time Series & Moving Average')\nplt.legend()\nplt.grid(True, alpha=0.3)\nplt.tight_layout()\nplt.savefig('time_series_ma.png', dpi=150, bbox_inches='tight')\nprint(\"Chart saved as time_series_ma.png\")"
            }
        },
        initialCode: "",
        solutionCode: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

print("="*60)
print("Time Series Analysis Practice")
print("="*60)

# 生成示例Data
np.random.seed(42)
n = 365
dates = pd.date_range('2024-01-01', periods=n, freq='D')

# 趋势 + 季节性 + 噪声
trend = np.linspace(50, 100, n)  # 上升趋势
seasonality = 15 * np.sin(np.linspace(0, 4*np.pi, n))  # 年周期
noise = np.random.randn(n) * 5

data = trend + seasonality + noise

df = pd.DataFrame({'date': dates, 'value': data})
df.set_index('date', inplace=True)

print("\\n【Data概览】")
print(df.describe())

# 滑动统计量
df['MA7'] = df['value'].rolling(window=7).mean()
df['MA30'] = df['value'].rolling(window=30).mean()
df['rolling_std'] = df['value'].rolling(window=30).std()

# 按月汇总
monthly = df.resample('M').mean()
print("\\n
【Monthly Summary】")
print(monthly)

# 可视化
fig, axes = plt.subplots(3, 1, figsize=(14, 12))

# 原始Data和平滑
axes[0].plot(df.index, df['value'], alpha=0.5, label='原始Data')
axes[0].plot(df.index, df['MA7'], label='7日滑动平均', linewidth=2)
axes[0].plot(df.index, df['MA30'], label='30日滑动平均', linewidth=2)
axes[0].set_title('时间序列与滑动平均')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# 月度趋势
axes[1].bar(monthly.index, monthly['value'], width=20)
axes[1].set_title('月度平均值')
axes[1].set_ylabel('平均值')

# 波动性
axes[2].plot(df.index, df['rolling_std'])
axes[2].set_title('30日滚动标准差')
axes[2].set_ylabel('标准差')

plt.tight_layout()
plt.savefig('time_series_analysis.png', dpi=150)
print("\\nChart saved as time_series_analysis.png")
`
    },
    {
        id: 9,
        title: "购物篮分析",
        level: "进阶",
        description: "学习关联规则挖掘和市场篮子分析",
        theory: `
<h3>一、关联规则概述</h3>
<p>关联规则挖掘发现Data中项之间的有趣关联，广泛应用于零售分析、用户行为研究等领域。</p>

<h4>1.1 基本概念</h4>
<ul>
    <li><b>项 (Item)</b>：交易中的单个商品</li>
    <li><b>项集 (Itemset)</b>：一个或多个项的集合</li>
    <li><b>交易 (Transaction)</b>：一次购买行为</li>
    <li><b>规则 (Rule)</b>：形如 X → Y 的关联关系</li>
</ul>

<h3>二、支持度、置信度与提升度</h3>

<h4>2.1 支持度 (Support)</h4>
<ul>
    <li><b>定义</b>：项集在所有交易中出现的频率</li>
    <li><b>公式</b>：Support(X) = Count(X) / Total</li>
    <li><b>作用</b>：衡量项集的普遍性</li>
</ul>

<h4>2.2 置信度 (Confidence)</h4>
<ul>
    <li><b>定义</b>：包含X的交易中，同时包含Y的比例</li>
    <li><b>公式</b>：Confidence(X→Y) = Support(X,Y) / Support(X)</li>
    <li><b>作用</b>：衡量规则的可信度</li>
</ul>

<h4>2.3 提升度 (Lift)</h4>
<ul>
    <li><b>定义</b>：规则提升的程度</li>
    <li><b>公式</b>：Lift = Confidence(X→Y) / Support(Y)</li>
    <li><b>解释</b>：Lift > 1 表示正相关，Lift < 1 表示负相关</li>
</ul>

<h3>三、Apriori算法</h3>

<h4>3.1 算法思想</h4>
<ul>
    <li><b>先验性质</b>：如果项集是频繁的，则它的所有子集也是频繁的</li>
    <li><b>剪枝策略</b>：利用反单调性减少候选项集数量</li>
</ul>

<h4>3.2 算法步骤</h4>
<ol>
    <li>设定最小支持度阈值</li>
    <li>找出所有频繁项集</li>
    <li>从频繁项集中生成关联规则</li>
    <li>计算规则的置信度和提升度</li>
</ol>

<h3>四、实战应用</h3>

<h4>4.1 零售商品推荐</h4>
<ul>
    <li><b>应用场景</b>：商品摆放、交叉销售、个性化推荐</li>
    <li><b>经典案例</b>：啤酒与尿布</li>
</ul>

<h4>4.2 电商分析</h4>
<ul>
    <li><b>应用场景</b>：用户行为分析、页面优化、套餐设计</li>
    <li><b>分析维度</b>：浏览、收藏、加购、购买</li>
</ul>

<h3>五、mlxtend库的使用</h3>

<h4>5.1 Data预处理</h4>
<ul>
    <li><code>TransactionEncoder</code>：将列表转换为One-Hot编码</li>
    <li><code>apriori()</code>：挖掘频繁项集</li>
    <li><code>association_rules()</code>：生成关联规则</li>
</ul>

<h4>5.2 参数设置</h4>
<ul>
    <li><code>min_support</code>：最小支持度</li>
    <li><code>min_threshold</code>：最小置信度</li>
    <li><code>metric</code>：评估指标（confidence, lift, leverage）</li>
</ul>
        `,
        exercises: [
            "将交易Data转换为One-Hot编码",
            "使用Apriori算法挖掘频繁项集",
            "生成关联规则并筛选",
            "分析商品关联性",
            "可视化关联规则"
        ],
        quiz: [
            {
                question: "关联规则X→Y中，置信度表示什么？",
                options: ["X和Y同时出现的概率", "包含X时Y出现的条件概率", "X出现的概率", "Y出现的概率"],
                answer: 1
            },
            {
                question: "提升度Lift > 1表示什么？",
                options: ["负相关", "无相关", "正相关", "独立"],
                answer: 2
            },
            {
                question: "Apriori算法的先验性质是？",
                options: ["频繁项集的子集都是频繁的", "频繁项集的超集都是频繁的", "非频繁项集的子集都是频繁的", "以上都不对"],
                answer: 0
            }
        ],
        exam: {
            singleChoice: [
                {
                    question: "支持度表示？",
                    options: ["规则的可信度", "项集的普遍性", "规则的提升程度", "项集的数量"],
                    answer: 1
                },
                {
                    question: "以下哪个指标用于衡量规则的实用性？",
                    options: ["支持度", "置信度", "提升度", "计数"],
                    answer: 2
                },
                {
                    question: "Apriori算法的核心思想是？",
                    options: ["贪心策略", "分治策略", "先验性质", "递归优化"],
                    answer: 2
                }
            ],
            multipleChoice: [
                {
                    question: "关联规则挖掘的主要应用包括？（多选）",
                    options: ["商品推荐", "货架优化", "用户分群", "价格策略"],
                    answer: [0, 1, 2, 3]
                },
                {
                    question: "以下哪些是评估关联规则的指标？（多选）",
                    options: ["支持度", "置信度", "提升度", "准确率"],
                    answer: [0, 1, 2]
                }
            ],
            trueFalse: [
                {
                    question: "置信度越高质量规则一定越好",
                    answer: false
                },
                {
                    question: "提升度小于1表示负相关",
                    answer: true
                },
                {
                    question: "频繁项集的支持度一定大于最小支持度阈值",
                    answer: true
                }
            ],
            codeQuestion: {
                question: "编写代码：创建交易Data集，使用Apriori算法挖掘频繁项集，生成关联规则，并筛选高提升度的规则",
                initialCode: "# 请在此处编写代码\nimport pandas as pd\nfrom collections import defaultdict\nimport itertools\n\n# 模拟交易Data\ntransactions = [\n    ['Milk', 'Bread', 'Eggs'],\n    ['Milk', 'Diapers', 'Beer'],\n    ['Bread', 'Diapers', 'Beer'],\n    ['Milk', 'Bread', 'Diapers'],\n    ['Milk', 'Bread', 'Eggs', 'Diapers'],\n    ['Bread', 'Eggs'],\n    ['Milk', 'Eggs'],\n]\n\n# 分析项集计数\n\n\n# 计算支持度\n\n\n# 找出频繁项集",
                solutionCode: "import pandas as pd\nfrom collections import defaultdict\nimport itertools\n\ntransactions = [\n    ['Milk', 'Bread', 'Eggs'],\n    ['Milk', 'Diapers', 'Beer'],\n    ['Bread', 'Diapers', 'Beer'],\n    ['Milk', 'Bread', 'Diapers'],\n    ['Milk', 'Bread', 'Eggs', 'Diapers'],\n    ['Bread', 'Eggs'],\n    ['Milk', 'Eggs'],\n]\n\n# 统计单个项的支持度\nitem_counts = defaultdict(int)\nfor trans in transactions:\n    for item in trans:\n        item_counts[item] += 1\n\n# 计算支持度\nsupport = {}\nn_transactions = len(transactions)\nfor item, count in item_counts.items():\n    support[frozenset([item])] = count / n_transactions\n\n# 统计两两组合\npair_counts = defaultdict(int)\nfor trans in transactions:\n    for pair in itertools.combinations(trans, 2):\n        pair_counts[frozenset(pair)] += 1\n\nfor pair, count in pair_counts.items():\n    support[pair] = count / n_transactions\n\n# 打印结果\nprint(\"=\"*60)\nprint(\"Frequent Itemsets (Support > 0.3)\")\nprint(\"=\"*60)\nfor itemset, supp in sorted(support.items(), key=lambda x: x[1], reverse=True):\n    if supp >= 0.3:\n        print(f\"{set(itemset)}: {supp:.2f}\")\n\nprint(\"\\n\" + \"=\"*60)\nprint(\"Simple Association Rules\")\nprint(\"=\"*60)\nfor pair, supp in pair_counts.items():\n    if supp / n_transactions >= 0.3:\n        items = list(pair)\n        for i in range(2):\n            antecedent = {items[i]}\n            consequent = {items[1-i]}\n            conf = (pair_counts[pair] / n_transactions) / (item_counts[items[i]] / n_transactions)\n            if conf > 0.5:\n                print(f\"{antecedent} -> {consequent}: conf={conf:.2f}, supp={pair_counts[pair]/n_transactions:.2f}\")"
            }
        },
        initialCode: "",
        solutionCode: `import pandas as pd
from collections import defaultdict
import itertools
import matplotlib.pyplot as plt

print("="*60)
print("Market Basket Analysis Practice")
print("="*60)

# 模拟超市交易Data
transactions = [
    ['Milk', 'Bread', 'Eggs'],
    ['Milk', 'Diapers', 'Beer', 'Bread'],
    ['Bread', 'Diapers', 'Beer'],
    ['Milk', 'Bread', 'Diapers'],
    ['Milk', 'Bread', 'Eggs', 'Diapers'],
    ['Bread', 'Eggs'],
    ['Milk', 'Eggs'],
    ['Diapers', 'Beer', 'Eggs'],
    ['Milk', 'Diapers', 'Eggs'],
    ['Bread', 'Diapers', 'Eggs'],
]

# 统计单个项的支持度
item_counts = defaultdict(int)
for trans in transactions:
    for item in trans:
        item_counts[item] += 1

# 计算支持度
support = {}
n_transactions = len(transactions)
for item, count in item_counts.items():
    support[frozenset([item])] = count / n_transactions

# 统计两两组合
pair_counts = defaultdict(int)
for trans in transactions:
    for pair in itertools.combinations(trans, 2):
        pair_counts[frozenset(pair)] += 1

for pair, count in pair_counts.items():
    support[pair] = count / n_transactions

# 打印结果
print("\n【Frequent Itemsets (Support > 0.3)】")
for itemset, supp in sorted(support.items(), key=lambda x: x[1], reverse=True):
    if supp >= 0.3:
        print(f"{set(itemset)}: {supp:.2f}")

# 简单规则生成
print("\n【Simple Association Rules】")
rules_data = []
for pair, count in pair_counts.items():
    if count / n_transactions >= 0.3:
        items = list(pair)
        for i in range(2):
            antecedent = items[i]
            consequent = items[1-i]
            conf = (pair_counts[pair] / n_transactions) / (item_counts[antecedent] / n_transactions)
            if conf > 0.5:
                lift = conf / (item_counts[consequent] / n_transactions)
                rules_data.append({
                    'antecedent': {antecedent},
                    'consequent': {consequent},
                    'support': count / n_transactions,
                    'confidence': conf,
                    'lift': lift
                })
                print(f"{{{antecedent}}} -> {{{consequent}}}: conf={conf:.2f}, supp={count/n_transactions:.2f}, lift={lift:.2f}")

# 可视化
if rules_data:
    fig, axes = plt.subplots(1, 2, figsize=(14, 5))
    
    supports = [r['support'] for r in rules_data]
    confidences = [r['confidence'] for r in rules_data]
    lifts = [r['lift'] for r in rules_data]
    
    # 支持度 vs 置信度
    axes[0].scatter(supports, confidences, alpha=0.6, c='blue')
    axes[0].set_xlabel('Support')
    axes[0].set_ylabel('Confidence')
    axes[0].set_title('Support vs Confidence')
    
    # 支持度 vs 提升度
    axes[1].scatter(supports, lifts, alpha=0.6, c='green')
    axes[1].axhline(y=1, color='r', linestyle='--')
    axes[1].set_xlabel('Support')
    axes[1].set_ylabel('Lift')
    axes[1].set_title('Support vs Lift')
    
    plt.tight_layout()
    plt.savefig('association_rules.png', dpi=150)
    print("\nChart saved as association_rules.png")
`
    },
    {
        id: 10,
        title: "聚类分析",
        level: "高级",
        description: "掌握K-Means和层次聚类等算法",
        theory: `
<h3>一、聚类分析概述</h3>
<p>聚类是无监督学习方法，将Data集中的样本划分为若干个簇，使同簇内样本相似度高，不同簇间相似度低。</p>

<h4>1.1 聚类与分类的区别</h4>
<ul>
    <li><b>分类</b>：监督学习，有标签</li>
    <li><b>聚类</b>：无监督学习，无标签</li>
</ul>

<h4>1.2 聚类的应用</h4>
<ul>
    <li><b>客户细分</b>：识别不同类型的客户群体</li>
    <li><b>图像分割</b>：将图像分为不同Region</li>
    <li><b>异常检测</b>：识别与大多数不同的异常点</li>
    <li><b>文档分类</b>：将相似文档归为一类</li>
</ul>

<h3>二、距离度量</h3>

<h4>2.1 欧氏距离</h4>
<ul>
    <li><b>公式</b>：d(x,y) = √(Σ(xᵢ-yᵢ)²)</li>
    <li><b>特点</b>：最常用的距离度量</li>
</ul>

<h4>2.2 曼哈顿距离</h4>
<ul>
    <li><b>公式</b>：d(x,y) = Σ|xᵢ-yᵢ|</li>
    <li><b>特点</b>：对异常值更鲁棒</li>
</ul>

<h4>2.3 余弦相似度</h4>
<ul>
    <li><b>公式</b>：cos(θ) = (A·B)/(|A||B|)</li>
    <li><b>特点</b>：适用于文本Data</li>
</ul>

<h3>三、K-Means聚类</h3>

<h4>3.1 算法步骤</h4>
<ol>
    <li>随机选择K个初始质心</li>
    <li>计算每个样本到各质心的距离，分配到最近的簇</li>
    <li>更新每个簇的质心为该簇样本的均值</li>
    <li>重复2-3直到收敛或达到最大迭代次数</li>
</ol>

<h4>3.2 K值的选择</h4>
<ul>
    <li><b>肘部法则</b>：绘制SSE随K变化的曲线，选择拐点</li>
    <li><b>轮廓系数</b>：衡量聚类质量，取值范围[-1, 1]</li>
</ul>

<h4>3.3 优缺点</h4>
<ul>
    <li><b>优点</b>：简单高效，适用于大Data集</li>
    <li><b>缺点</b>：对初始值和异常值敏感，需预设K值</li>
</ul>

<h3>四、层次聚类</h3>

<h4>4.1 凝聚层次聚类</h4>
<ul>
    <li><b>思想</b>：自底向上，每个样本初始为一个簇，逐步合并</li>
    <li><b>距离计算</b>：最近邻、最远邻、组平均、 Ward</li>
</ul>

<h4>4.2 分裂层次聚类</h4>
<ul>
    <li><b>思想</b>：自顶向下，所有样本初始为一个簇，逐步分裂</li>
</ul>

<h4>4.3 树状图 (Dendrogram)</h4>
<ul>
    <li><b>作用</b>：可视化聚类过程和层次结构</li>
    <li><b>解读</b>：可帮助确定合适的聚类数量</li>
</ul>

<h3>五、聚类评估指标</h3>

<h4>5.1 内部评估</h4>
<ul>
    <li><b>轮廓系数</b>：衡量簇内紧密度和簇间分离度</li>
    <li><b>CH指数</b>：考虑簇间和簇内距离</li>
</ul>

<h4>5.2 外部评估</h4>
<ul>
    <li><b>调整兰德指数</b>：与真实标签对比</li>
    <li><b>互信息</b>：衡量聚类与标签的一致性</li>
</ul>
        `,
        exercises: [
            "使用K-Means进行客户聚类",
            "绘制肘部法则图确定最优K值",
            "使用层次聚类分析Data",
            "绘制树状图",
            "评估聚类结果"
        ],
        quiz: [
            {
                question: "K-Means聚类中，K表示什么？",
                options: ["迭代次数", "聚类数目", "特征数量", "样本数量"],
                answer: 1
            },
            {
                question: "肘部法则用于确定什么？",
                options: ["聚类中心", "最优聚类数K", "距离度量", "样本权重"],
                answer: 1
            },
            {
                question: "层次聚类的树状图叫什么？",
                options: ["热力图", "树状图", "雷达图", "箱线图"],
                answer: 1
            }
        ],
        exam: {
            singleChoice: [
                {
                    question: "K-Means算法的目标是最小化什么？",
                    options: ["簇间距离", "簇内距离（SSE）", "样本数量", "特征数量"],
                    answer: 1
                },
                {
                    question: "轮廓系数的取值范围是？",
                    options: ["[0, 1]", "[-1, 1]", "[0, 100]", "[-∞, ∞]"],
                    answer: 1
                },
                {
                    question: "K-Means对什么比较敏感？",
                    options: ["Data量大小", "初始质心选择和异常值", "Data维度", "计算速度"],
                    answer: 1
                }
            ],
            multipleChoice: [
                {
                    question: "聚类分析的常用场景包括？（多选）",
                    options: ["客户细分", "图像分割", "异常检测", "回归预测"],
                    answer: [0, 1, 2]
                },
                {
                    question: "确定K值的方法有？（多选）",
                    options: ["肘部法则", "轮廓系数", "交叉验证", "层次分析"],
                    answer: [0, 1, 2]
                }
            ],
            trueFalse: [
                {
                    question: "聚类是有监督学习方法",
                    answer: false
                },
                {
                    question: "K-Means无法处理非球形簇",
                    answer: true
                },
                {
                    question: "层次聚类不需要预先指定聚类数目",
                    answer: true
                }
            ],
            codeQuestion: {
                question: "编写代码：生成二维聚类Data，使用肘部法则确定最优K值，进行K-Means聚类，绘制聚类结果图和肘部法则图",
                initialCode: "# 请在此处编写代码\nimport numpy as np\nimport matplotlib.pyplot as plt\nfrom sklearn.cluster import KMeans\nfrom sklearn.datasets import make_blobs\n\n# 生成聚类Data\nnp.random.seed(42)\nX, y_true = make_blobs(n_samples=300, centers=4, cluster_std=0.6, random_state=0)\n\n# 使用肘部法则确定最优K\n\n\n# 进行K-Means聚类\n\n\n# 绘制结果图",
                solutionCode: "import numpy as np\nimport matplotlib.pyplot as plt\nfrom sklearn.cluster import KMeans\nfrom sklearn.datasets import make_blobs\n\nnp.random.seed(42)\nX, y_true = make_blobs(n_samples=300, centers=4, cluster_std=0.6, random_state=0)\n\n# 肘部法则\ninertias = []\nK_range = range(1, 11)\nfor k in K_range:\n    km = KMeans(n_clusters=k, random_state=42, n_init=10)\n    km.fit(X)\n    inertias.append(km.inertia_)\n\n# K=4的K-Means聚类\nkmeans = KMeans(n_clusters=4, random_state=42, n_init=10)\ny_pred = kmeans.fit_predict(X)\n\n# 可视化\nfig, axes = plt.subplots(1, 2, figsize=(14, 5))\n\n# 肘部法则图\naxes[0].plot(K_range, inertias, 'bo-', linewidth=2)\naxes[0].axvline(x=4, color='r', linestyle='--', label='Optimal K=4')\naxes[0].set_xlabel('Number of Clusters (K)')\naxes[0].set_ylabel('SSE')\naxes[0].set_title('Elbow Method')\naxes[0].legend()\n\n# 聚类结果\ncolors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728']\nfor i in range(4):\n    axes[1].scatter(X[y_pred==i, 0], X[y_pred==i, 1], c=colors[i], s=30, alpha=0.7)\naxes[1].scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1], \n                 c='black', marker='X', s=200, label='Centroids')\naxes[1].set_title('K-Means Clustering Result (K=4)')\naxes[1].legend()\n\nplt.tight_layout()\nplt.savefig('clustering_result.png', dpi=150, bbox_inches='tight')\nprint(\"Chart saved as clustering_result.png\")"
            }
        },
        initialCode: "",
        solutionCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans, AgglomerativeClustering
from sklearn.datasets import make_blobs
from sklearn.metrics import silhouette_score

print("="*60)
print("Clustering Analysis Practice")
print("="*60)

# 生成Data
np.random.seed(42)
X, y_true = make_blobs(n_samples=300, centers=4, cluster_std=0.6, random_state=0)

# K-Means聚类
kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)
y_kmeans = kmeans.fit_predict(X)

# 层次聚类
hierarchical = AgglomerativeClustering(n_clusters=4, linkage='ward')
y_hier = hierarchical.fit_predict(X)

# 评估
sil_kmeans = silhouette_score(X, y_kmeans)
sil_hier = silhouette_score(X, y_hier)

print(f"\\n【Clustering Evaluation】")
print(f"K-Means Silhouette: {sil_kmeans:.4f}")
print(f"Hierarchical Silhouette: {sil_hier:.4f}")

# 肘部法则
inertias = []
K_range = range(1, 11)
for k in K_range:
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    km.fit(X)
    inertias.append(km.inertia_)

# 可视化
fig, axes = plt.subplots(2, 2, figsize=(14, 12))

# 肘部法则
axes[0, 0].plot(K_range, inertias, 'bo-', linewidth=2)
axes[0, 0].set_xlabel('Number of Clusters (K)')
axes[0, 0].set_ylabel('SSE')
axes[0, 0].set_title('Elbow Method')
axes[0, 0].grid(True, alpha=0.3)

# 原始Data
axes[0, 1].scatter(X[:, 0], X[:, 1], c=y_true, cmap='viridis', s=30, alpha=0.7)
axes[0, 1].set_title('Original Data')

# K-Means结果
colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728']
for i in range(4):
    axes[1, 0].scatter(X[y_kmeans==i, 0], X[y_kmeans==i, 1], c=colors[i], s=30, alpha=0.7)
axes[1, 0].scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1], 
                   c='black', marker='X', s=200, label='Centroids')
axes[1, 0].set_title(f'K-Means Clustering (Silhouette={sil_kmeans:.3f})')
axes[1, 0].legend()

# 层次聚类结果
for i in range(4):
    axes[1, 1].scatter(X[y_hier==i, 0], X[y_hier==i, 1], c=colors[i], s=30, alpha=0.7)
axes[1, 1].set_title(f'Hierarchical Clustering (Silhouette={sil_hier:.3f})')

plt.tight_layout()
plt.savefig('clustering_analysis.png', dpi=150)
print("\\nChart saved as clustering_analysis.png")
`
    }
];