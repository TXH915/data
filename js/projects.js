const projects = [
    {
        id: 1,
        title: "数据清洗实践",
        level: "入门",
        description: "学习处理缺失值、异常值和数据转换",
        theory: `
<h3>数据清洗基础</h3>
<p>数据清洗是数据分析的第一步，也是最重要的一步。高质量的数据是获得可靠分析结果的基础。</p>

<h4>常见数据问题</h4>
<ul>
    <li><b>缺失值</b>：数据集中某些字段为空</li>
    <li><b>异常值</b>：与其他数据显著不同的数值</li>
    <li><b>重复数据</b>：完全相同的记录</li>
    <li><b>数据类型错误</b>：数值被识别为字符串</li>
</ul>

<h4>处理缺失值的方法</h4>
<p>使用 Pandas 处理缺失值：</p>
<ul>
    <li><code>df.dropna()</code> - 删除含缺失值的行</li>
    <li><code>df.fillna(value)</code> - 填充缺失值</li>
    <li><code>df.fillna(df.mean())</code> - 用均值填充</li>
    <li><code>df.interpolate()</code> - 插值填充</li>
</ul>

<h4>识别异常值</h4>
<p>常用方法：</p>
<ul>
    <li>IQR（四分位距）方法</li>
    <li>Z-score 方法</li>
    <li>箱线图可视化</li>
</ul>
        `,
        exercises: [
            "创建一个包含缺失值的 DataFrame",
            "计算各列的缺失值数量",
            "用均值填充数值列的缺失值",
            "删除包含缺失值的行"
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
        initialCode: "",
        solutionCode: `import pandas as pd
import numpy as np

# 创建示例数据
data = {
    '姓名': ['张三', '李四', '王五', '赵六', None, '孙八'],
    '年龄': [25, np.nan, 30, 35, 28, 200],
    '收入': [5000, 6000, np.nan, 8000, 7000, 7500]
}
df = pd.DataFrame(data)
print("原始数据：")
print(df)
print()

# 查看缺失值
print("缺失值统计：")
print(df.isnull().sum())
print()

# 填充缺失值
df['年龄'] = df['年龄'].fillna(df['年龄'].mean())
df['收入'] = df['收入'].fillna(df['收入'].median())
df = df.dropna(subset=['姓名'])

# 处理异常值
Q1 = df['年龄'].quantile(0.25)
Q3 = df['年龄'].quantile(0.75)
IQR = Q3 - Q1
df = df[(df['年龄'] >= Q1 - 1.5*IQR) & (df['年龄'] <= Q3 + 1.5*IQR)]

print("清洗后的数据：")
print(df)
`
    },
    {
        id: 2,
        title: "数据可视化基础",
        level: "入门",
        description: "使用 Matplotlib 绘制基础图表",
        theory: `
<h3>数据可视化入门</h3>
<p>可视化是探索和呈现数据的强大工具。一图胜千言！</p>

<h4>常用图表类型</h4>
<ul>
    <li><b>折线图</b>：展示趋势变化</li>
    <li><b>柱状图</b>：比较类别数据</li>
    <li><b>散点图</b>：展示变量关系</li>
    <li><b>直方图</b>：展示数据分布</li>
    <li><b>饼图</b>：展示占比</li>
</ul>

<h4>Matplotlib 基础</h4>
<p>基本绘图步骤：</p>
<ul>
    <li><code>import matplotlib.pyplot as plt</code></li>
    <li><code>plt.plot()</code> 或其他绘图函数</li>
    <li><code>plt.title()</code> 添加标题</li>
    <li><code>plt.xlabel()</code> 和 <code>plt.ylabel()</code> 添加轴标签</li>
    <li><code>plt.show()</code> 显示图表</li>
</ul>
        `,
        exercises: [
            "绘制一条正弦曲线",
            "创建包含两个系列的折线图",
            "绘制柱状图比较不同类别",
            "制作散点图展示相关关系"
        ],
        quiz: [
            {
                question: "Matplotlib 中绘制折线图的函数是？",
                options: ["line()", "plot()", "draw()", "chart()"],
                answer: 1
            },
            {
                question: "用于显示图表的函数是？",
                options: ["display()", "show()", "print()", "view()"],
                answer: 1
            },
            {
                question: "比较不同类别最好使用？",
                options: ["折线图", "散点图", "柱状图", "饼图"],
                answer: 2
            }
        ],
        initialCode: "",
        solutionCode: `import matplotlib.pyplot as plt
import numpy as np

# 创建数据
x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)

# 折线图
print("绘制折线图...")
plt.figure(figsize=(12, 8))

plt.subplot(2, 2, 1)
plt.plot(x, y1, label='sin(x)', color='blue')
plt.plot(x, y2, label='cos(x)', color='red', linestyle='--')
plt.title('三角函数曲线')
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
plt.savefig('visualization.png')
print("图表已保存为 visualization.png")
`
    },
    {
        id: 3,
        title: "统计分析入门",
        level: "入门",
        description: "学习描述性统计和基础推断统计",
        theory: `
<h3>统计分析基础</h3>
<p>统计学是数据分析的核心，帮助我们理解数据背后的规律。</p>

<h4>描述性统计</h4>
<ul>
    <li><b>集中趋势</b>：均值、中位数、众数</li>
    <li><b>离散程度</b>：方差、标准差、极差</li>
    <li><b>分布形态</b>：偏度、峰度</li>
</ul>

<h4>NumPy 和 SciPy</h4>
<p>常用统计函数：</p>
<ul>
    <li><code>np.mean()</code> - 均值</li>
    <li><code>np.median()</code> - 中位数</li>
    <li><code>np.std()</code> - 标准差</li>
    <li><code>np.percentile()</code> - 分位数</li>
</ul>
        `,
        exercises: [
            "生成一组随机数据",
            "计算各项描述性统计指标",
            "进行正态性检验",
            "计算两组数据的相关系数"
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
        initialCode: "",
        solutionCode: `import numpy as np
import pandas as pd
from scipy import stats

# 生成示例数据
np.random.seed(42)
data1 = np.random.normal(100, 15, 1000)
data2 = np.random.normal(80, 10, 1000)

print("="*50)
print("描述性统计分析")
print("="*50)

# 集中趋势
print("\\n【集中趋势】")
print(f"数据1 均值: {np.mean(data1):.2f}")
print(f"数据1 中位数: {np.median(data1):.2f}")
print(f"数据1 众数: {stats.mode(data1, keepdims=True)[0][0]:.2f}")

# 离散程度
print("\\n【离散程度】")
print(f"数据1 标准差: {np.std(data1):.2f}")
print(f"数据1 方差: {np.var(data1):.2f}")
print(f"数据1 极差: {np.max(data1) - np.min(data1):.2f}")

# 分位数
print("\\n【分位数】")
print(f"Q1 (25%): {np.percentile(data1, 25):.2f}")
print(f"Q2 (50%): {np.percentile(data1, 50):.2f}")
print(f"Q3 (75%): {np.percentile(data1, 75):.2f}")

# 分布形态
print("\\n【分布形态】")
print(f"偏度: {stats.skew(data1):.4f}")
print(f"峰度: {stats.kurtosis(data1):.4f}")

# 相关分析
print("\\n【相关分析】")
corr, p_value = stats.pearsonr(data1, data2)
print(f"Pearson相关系数: {corr:.4f}")
print(f"P值: {p_value:.4f}")

# t检验
print("\\n【t检验】")
t_stat, t_p = stats.ttest_ind(data1, data2)
print(f"t统计量: {t_stat:.4f}")
print(f"P值: {t_p:.4f}")

# Pandas describe
print("\\n【Pandas 完整统计】")
df = pd.DataFrame({'数据1': data1, '数据2': data2})
print(df.describe())
`
    },
    {
        id: 4,
        title: "Pandas数据处理",
        level: "入门",
        description: "掌握 Pandas 的核心操作",
        theory: `
<h3>Pandas 数据处理</h3>
<p>Pandas 是 Python 数据分析的核心库，提供 DataFrame 和 Series 两种核心数据结构。</p>

<h4>核心数据结构</h4>
<ul>
    <li><b>Series</b>：一维带标签的数组</li>
    <li><b>DataFrame</b>：二维表格，类似 Excel</li>
</ul>

<h4>常用操作</h4>
<ul>
    <li>数据读取：<code>pd.read_csv()</code>, <code>pd.read_excel()</code></li>
    <li>数据筛选：<code>df[df['col'] > value]</code></li>
    <li>分组聚合：<code>df.groupby('col').agg()</code></li>
    <li>数据合并：<code>pd.merge()</code>, <code>pd.concat()</code></li>
</ul>
        `,
        exercises: [
            "创建一个 DataFrame",
            "选择特定的行和列",
            "按条件筛选数据",
            "进行分组聚合操作",
            "对数据进行排序"
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
        initialCode: "",
        solutionCode: `import pandas as pd
import numpy as np

# 创建销售数据
data = {
    '日期': pd.date_range('2024-01-01', periods=10),
    '产品': ['A', 'B', 'A', 'C', 'B', 'A', 'C', 'A', 'B', 'C'],
    '区域': ['东', '西', '东', '南', '西', '北', '南', '东', '西', '北'],
    '销量': np.random.randint(100, 500, 10),
    '单价': np.random.uniform(10, 100, 10).round(2)
}

df = pd.DataFrame(data)
print("原始数据：")
print(df)
print()

# 1. 基本信息
print("【基本信息】")
print(f"形状: {df.shape}")
print(f"列名: {df.columns.tolist()}")
print()

# 2. 数据选择
print("【选择产品和销量列】")
print(df[['产品', '销量']].head())
print()

# 3. 条件筛选
print("【筛选产品A且销量>200】")
filter_df = df[(df['产品'] == 'A') & (df['销量'] > 200)]
print(filter_df)
print()

# 4. 计算销售额
df['销售额'] = df['销量'] * df['单价']
print("【添加销售额列】")
print(df[['产品', '销量', '单价', '销售额']])
print()

# 5. 分组聚合
print("【按产品分组统计】")
product_stats = df.groupby('产品').agg({
    '销量': ['sum', 'mean', 'count'],
    '销售额': 'sum'
}).round(2)
print(product_stats)
print()

# 6. 排序
print("【按销售额降序排序】")
print(df.sort_values('销售额', ascending=False).head())
print()

# 7. 透视表
print("【透视表：区域vs产品】")
pivot = pd.pivot_table(df, values='销售额', index='区域', columns='产品', 
                      aggfunc='sum', fill_value=0)
print(pivot)
`
    },
    {
        id: 5,
        title: "Matplotlib绘图进阶",
        level: "入门",
        description: "高级图表和美化技巧",
        theory: `
<h3>Matplotlib 进阶技巧</h3>
<p>掌握高级绘图功能，制作专业级可视化图表。</p>

<h4>布局管理</h4>
<ul>
    <li><code>plt.subplot()</code> - 子图网格</li>
    <li><code>plt.subplots()</code> - 创建子图对象</li>
    <li><code>gridspec</code> - 复杂布局</li>
</ul>

<h4>样式美化</h4>
<ul>
    <li>颜色设置：color, cmap</li>
    <li>线条样式：linestyle, linewidth</li>
    <li>标记样式：marker, markersize</li>
    <li>样式表：<code>plt.style.use()</code></li>
</ul>

<h4>图表类型</h4>
<ul>
    <li>热力图：<code>plt.imshow()</code></li>
    <li>箱线图：<code>plt.boxplot()</code></li>
    <li>小提琴图：<code>plt.violinplot()</code></li>
</ul>
        `,
        exercises: [
            "创建2x2的子图布局",
            "绘制热力图展示相关性",
            "制作箱线图比较分布",
            "自定义颜色主题和样式"
        ],
        quiz: [
            {
                question: "创建2行3列子图的正确写法是？",
                options: ["subplot(2,3)", "subplots(2,3)", "plt.subplot(231)", "plt.subplots(2,3)"],
                answer: 3
            },
            {
                question: "热力图适合展示？",
                options: ["时间趋势", "类别比较", "矩阵数据", "占比"],
                answer: 2
            },
            {
                question: "箱线图不能显示的是？",
                options: ["中位数", "均值", "四分位数", "异常值"],
                answer: 1
            }
        ],
        initialCode: "",
        solutionCode: `import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

# 设置样式
plt.style.use('seaborn-v0_8-darkgrid')
np.random.seed(42)

# 创建数据
categories = ['产品A', '产品B', '产品C', '产品D']
months = ['1月', '2月', '3月', '4月', '5月', '6月']
sales_data = np.random.randint(100, 500, (6, 4))
corr_matrix = np.corrcoef(sales_data.T)

fig = plt.figure(figsize=(15, 10))

# 1. 热力图
ax1 = plt.subplot(2, 2, 1)
im = ax1.imshow(corr_matrix, cmap='RdBu_r', vmin=-1, vmax=1)
ax1.set_xticks(range(4))
ax1.set_yticks(range(4))
ax1.set_xticklabels(categories)
ax1.set_yticklabels(categories)
ax1.set_title('产品相关性热力图')
plt.colorbar(im, ax=ax1)

# 添加数值标签
for i in range(4):
    for j in range(4):
        ax1.text(j, i, f'{corr_matrix[i,j]:.2f}', 
                ha='center', va='center', color='white')

# 2. 箱线图
ax2 = plt.subplot(2, 2, 2)
data_box = [np.random.normal(100, 15, 100) + i*10 for i in range(4)]
bp = ax2.boxplot(data_box, patch_artist=True, labels=categories)
ax2.set_title('各产品销量分布')
ax2.set_ylabel('销量')
# 设置颜色
colors = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3']
for patch, color in zip(bp['boxes'], colors):
    patch.set_facecolor(color)
    patch.set_alpha(0.7)

# 3. 面积图
ax3 = plt.subplot(2, 2, 3)
x = np.arange(6)
for i in range(4):
    ax3.plot(x, sales_data[:, i], marker='o', label=categories[i], linewidth=2)
ax3.fill_between(x, sales_data[:, 0], alpha=0.3)
ax3.set_xticks(x)
ax3.set_xticklabels(months)
ax3.set_title('月度销量趋势')
ax3.legend()
ax3.grid(True, alpha=0.3)

# 4. 双Y轴图
ax4 = plt.subplot(2, 2, 4)
x = np.arange(6)
y1 = sales_data[:, 0]
y2 = y1 * 1.5 + np.random.randn(6)*20

l1, = ax4.plot(x, y1, 'b-', linewidth=2, label='销量')
ax4.set_xlabel('月份')
ax4.set_ylabel('销量', color='b')
ax4.tick_params(axis='y', labelcolor='b')
ax4.set_xticks(x)
ax4.set_xticklabels(months)

ax4_twin = ax4.twinx()
l2, = ax4_twin.plot(x, y2, 'r--', linewidth=2, label='利润')
ax4_twin.set_ylabel('利润', color='r')
ax4_twin.tick_params(axis='y', labelcolor='r')

ax4.legend([l1, l2], ['销量', '利润'], loc='upper left')
ax4.set_title('销量与利润对比')

plt.tight_layout()
plt.savefig('advanced_plots.png')
print("高级图表已保存为 advanced_plots.png")
`
    },
    {
        id: 6,
        title: "购物篮分析",
        level: "进阶",
        description: "使用关联规则挖掘进行购物篮分析",
        theory: `
<h3>购物篮分析与关联规则</h3>
<p>购物篮分析用于发现商品之间的关联关系，经典案例是"啤酒与尿布"。</p>

<h4>核心概念</h4>
<ul>
    <li><b>支持度(Support)</b>：商品组合出现的频率</li>
    <li><b>置信度(Confidence)</b>：购买A后购买B的概率</li>
    <li><b>提升度(Lift)</b>：关联强度的指标</li>
</ul>

<h4>Apriori 算法</h4>
<p>Apriori 是挖掘关联规则的经典算法：</p>
<ul>
    <li>找出频繁项集（满足最小支持度）</li>
    <li>生成关联规则（满足最小置信度）</li>
</ul>

<h4>应用场景</h4>
<ul>
    <li>商品推荐系统</li>
    <li>货架摆放优化</li>
    <li>捆绑销售策略</li>
</ul>
        `,
        exercises: [
            "创建购物篮交易数据",
            "计算商品的支持度",
            "挖掘关联规则",
            "分析结果并给出建议"
        ],
        quiz: [
            {
                question: "购买A后一定购买B，说明置信度为？",
                options: ["0", "0.5", "1", "无法确定"],
                answer: 2
            },
            {
                question: "提升度大于1表示？",
                options: ["负相关", "正相关", "不相关", "不确定"],
                answer: 1
            },
            {
                question: "Apriori算法的核心是？",
                options: ["先验原理", "后验概率", "最大似然", "梯度下降"],
                answer: 0
            }
        ],
        initialCode: "",
        solutionCode: `import pandas as pd
import numpy as np
from collections import defaultdict
from itertools import combinations

print("="*50)
print("购物篮分析 - 关联规则挖掘")
print("="*50)

# 创建示例购物篮数据
transactions = [
    ['牛奶', '面包', '鸡蛋'],
    ['面包', '鸡蛋', '香肠'],
    ['牛奶', '面包', '香肠', '啤酒'],
    ['牛奶', '鸡蛋'],
    ['面包', '鸡蛋'],
    ['牛奶', '面包', '鸡蛋', '香肠'],
    ['啤酒', '香肠'],
    ['牛奶', '面包', '啤酒'],
    ['鸡蛋', '香肠'],
    ['牛奶', '面包', '鸡蛋', '香肠', '啤酒']
]

print(f"\\n交易数量: {len(transactions)}")
print("\\n前5笔交易:")
for i, t in enumerate(transactions[:5], 1):
    print(f"交易{i}: {t}")

# 1. 计算所有商品的支持度
print("\\n【商品支持度】")
item_counts = defaultdict(int)
for trans in transactions:
    for item in trans:
        item_counts[item] += 1

items_df = pd.DataFrame({
    '商品': list(item_counts.keys()),
    '出现次数': list(item_counts.values()),
    '支持度': [count/len(transactions) for count in item_counts.values()]
}).sort_values('支持度', ascending=False)

print(items_df.round(3))

# 2. Apriori算法实现
min_support = 0.3
min_confidence = 0.6

print(f"\\n【最小支持度: {min_support}, 最小置信度: {min_confidence}】")

# 获取所有单个商品
all_items = sorted(list(item_counts.keys()))

# 生成频繁项集
frequent_itemsets = []

# 1-项集
L1 = []
for item in all_items:
    support = item_counts[item] / len(transactions)
    if support >= min_support:
        L1.append((frozenset([item]), support))
frequent_itemsets.extend(L1)
print(f"\\n1-项集: {len(L1)}个")

# 2-项集
C2 = list(combinations(all_items, 2))
L2 = []
for itemset in C2:
    count = 0
    for trans in transactions:
        if set(itemset).issubset(trans):
            count += 1
    support = count / len(transactions)
    if support >= min_support:
        L2.append((frozenset(itemset), support))
frequent_itemsets.extend(L2)
print(f"2-项集: {len(L2)}个")

# 3. 生成关联规则
print("\\n【关联规则】")
rules = []
for itemset, support in L2:
    items = list(itemset)
    # A -> B
    for i in range(2):
        A = frozenset([items[i]])
        B = frozenset([items[1-i]])
        # 计算置信度
        conf = support / dict(L1)[A]
        # 计算提升度
        lift = conf / (dict(L1)[B])
        if conf >= min_confidence:
            rules.append({
                '前件': set(A),
                '后件': set(B),
                '支持度': support,
                '置信度': conf,
                '提升度': lift
            })

rules_df = pd.DataFrame(rules).sort_values('提升度', ascending=False)
print(rules_df.round(3))

# 4. 业务建议
print("\\n【业务建议】")
for _, rule in rules_df.iterrows():
    print(f"● 购买 {rule['前件']} 的顾客，建议推荐 {rule['后件']}")
    print(f"  (置信度: {rule['置信度']:.1%}, 提升度: {rule['提升度']:.2f})")
`
    },
    {
        id: 7,
        title: "时间序列分析",
        level: "进阶",
        description: "学习时间序列的分解和预测",
        theory: `
<h3>时间序列分析</h3>
<p>时间序列是按时间顺序排列的数据点序列，广泛应用于销售预测、股票分析等。</p>

<h4>时间序列组成</h4>
<ul>
    <li><b>趋势(Trend)</b>：长期变化方向</li>
    <li><b>季节性(Seasonality)</b>：周期性波动</li>
    <li><b>周期性(Cyclical)</b>：长期循环</li>
    <li><b>随机性(Noise)</b>：不规则波动</li>
</ul>

<h4>分析方法</h4>
<ul>
    <li>移动平均法</li>
    <li>指数平滑法</li>
    <li>ARIMA 模型</li>
    <li>Prophet（Facebook）</li>
</ul>

<h4>评估指标</h4>
<ul>
    <li>MAE：平均绝对误差</li>
    <li>RMSE：均方根误差</li>
    <li>MAPE：平均绝对百分比误差</li>
</ul>
        `,
        exercises: [
            "创建时间序列数据",
            "进行时间序列分解",
            "计算移动平均值",
            "进行简单预测"
        ],
        quiz: [
            {
                question: "以下哪个不是时间序列的组成部分？",
                options: ["趋势", "季节性", "相关性", "随机性"],
                answer: 2
            },
            {
                question: "MAE 代表什么？",
                options: ["均方误差", "平均绝对误差", "最大误差", "平均误差"],
                answer: 1
            },
            {
                question: "移动平均可以用于？",
                options: ["消除噪声", "预测未来", "分解趋势", "分析相关性"],
                answer: 0
            }
        ],
        initialCode: "",
        solutionCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

print("="*50)
print("时间序列分析")
print("="*50)

# 1. 创建时间序列数据
np.random.seed(42)
dates = pd.date_range(start='2023-01-01', periods=365, freq='D')
time = np.arange(365)

# 生成带趋势、季节和噪声的数据
trend = 0.5 * time + 100
seasonality = 30 * np.sin(2 * np.pi * time / 30)
noise = np.random.randn(365) * 10
data = trend + seasonality + noise

ts = pd.Series(data, index=dates)

print(f"\\n数据范围: {dates[0]} 至 {dates[-1]}")
print(f"数据点数: {len(ts)}")
print(f"\\n统计信息:")
print(ts.describe())

# 2. 移动平均
print("\\n【移动平均分析】")
ma7 = ts.rolling(window=7).mean()
ma30 = ts.rolling(window=30).mean()

print(f"7日移动平均（最后5个值）:")
print(ma7.tail().round(2))

# 3. 时间序列分解（简化版）
print("\\n【时间序列分解】")
# 计算趋势（30日移动平均）
trend_est = ma30
# 去趋势
detrended = ts - trend_est
# 季节性（按月平均）
seasonal_est = detrended.groupby(detrended.index.day).transform('mean')
# 残差
residual = ts - trend_est - seasonal_est

print("分解完成: 趋势 + 季节性 + 残差")

# 4. 简单预测（Naive方法）
print("\\n【简单预测】")
train_size = int(len(ts) * 0.8)
train, test = ts[:train_size], ts[train_size:]

# 朴素预测：最后一个值
naive_pred = pd.Series([train.iloc[-1]] * len(test), index=test.index)

# 平均预测
mean_pred = pd.Series([train.mean()] * len(test), index=test.index)

# 漂移预测
drift = (train.iloc[-1] - train.iloc[0]) / (len(train) - 1)
drift_pred = pd.Series([train.iloc[-1] + drift * (i+1) for i in range(len(test))], index=test.index)

# 评估指标
def mae(y_true, y_pred):
    return np.mean(np.abs(y_true - y_pred))

def rmse(y_true, y_pred):
    return np.sqrt(np.mean((y_true - y_pred)**2))

print("\\n预测评估:")
print(f"朴素预测  MAE: {mae(test, naive_pred):.2f}, RMSE: {rmse(test, naive_pred):.2f}")
print(f"平均预测  MAE: {mae(test, mean_pred):.2f}, RMSE: {rmse(test, mean_pred):.2f}")
print(f"漂移预测  MAE: {mae(test, drift_pred):.2f}, RMSE: {rmse(test, drift_pred):.2f}")

# 5. 可视化
plt.figure(figsize=(14, 10))

plt.subplot(3, 1, 1)
plt.plot(ts.index, ts, label='原始数据', alpha=0.5)
plt.plot(ts.index, ma7, label='7日移动平均', linewidth=2)
plt.plot(ts.index, ma30, label='30日移动平均', linewidth=2)
plt.title('时间序列与移动平均')
plt.legend()
plt.grid(True, alpha=0.3)

plt.subplot(3, 1, 2)
plt.plot(ts.index, trend_est, label='趋势', color='red')
plt.title('趋势成分')
plt.legend()

plt.subplot(3, 1, 3)
plt.plot(ts.index, residual, label='残差', color='purple', alpha=0.7)
plt.axhline(y=0, color='black', linestyle='--', linewidth=0.5)
plt.title('残差成分')
plt.legend()

plt.tight_layout()
plt.savefig('timeseries.png')
print("\\n图表已保存为 timeseries.png")
`
    },
    {
        id: 8,
        title: "文本分析基础",
        level: "进阶",
        description: "学习文本预处理和词频统计",
        theory: `
<h3>文本分析基础</h3>
<p>文本分析是从文本数据中提取有价值信息的技术，广泛应用于情感分析、主题建模等。</p>

<h4>文本预处理步骤</h4>
<ul>
    <li><b>分词(Tokenization)</b>：将文本切分成词语</li>
    <li><b>去停用词</b>：去除无意义的词（的、了、是...）</li>
    <li><b>词干提取/词形还原</b>：将词转为基本形式</li>
    <li><b>向量化</b>：将文本转为数值向量</li>
</ul>

<h4>文本表示方法</h4>
<ul>
    <li><b>词袋模型(BOW)</b>：统计词频</li>
    <li><b>TF-IDF</b>：词频-逆文档频率</li>
    <li><b>词嵌入(Word Embedding)</b>：Word2Vec, GloVe</li>
</ul>

<h4>常用库</h4>
<ul>
    <li>中文：jieba, HanLP</li>
    <li>英文：NLTK, spaCy</li>
</ul>
        `,
        exercises: [
            "创建示例文本数据",
            "进行简单的文本处理",
            "计算词频统计",
            "生成词云可视化"
        ],
        quiz: [
            {
                question: "将文本切分成词语的过程称为？",
                options: ["分词", "切分", "分割", "分解"],
                answer: 0
            },
            {
                question: "TF-IDF 中的 IDF 代表什么？",
                options: ["词频", "逆文档频率", "重要性", "权重"],
                answer: 1
            },
            {
                question: "以下哪个是中文分词库？",
                options: ["NLTK", "spaCy", "jieba", "gensim"],
                answer: 2
            }
        ],
        initialCode: "",
        solutionCode: `import re
from collections import Counter, defaultdict
import math

print("="*50)
print("文本分析基础")
print("="*50)

# 1. 示例文本数据
documents = [
    "Python是一种优秀的编程语言，Python简单易学",
    "数据分析使用Python和Pandas进行数据处理",
    "机器学习是人工智能的重要分支，使用Python",
    "数据可视化使用Matplotlib和Seaborn",
    "深度学习使用TensorFlow和PyTorch框架",
    "Python在数据科学领域应用广泛"
]

print("\\n【文档列表】")
for i, doc in enumerate(documents, 1):
    print(f"{i}. {doc}")

# 2. 简单分词（中文按字/英文按词，演示用）
def simple_tokenize(text):
    # 简单实现：非汉字按单字，英文按词
    chars = []
    english_word = ''
    for char in text:
        if '\\u4e00' <= char <= '\\u9fff':
            if english_word:
                chars.append(english_word)
                english_word = ''
            chars.append(char)
        elif char.isalnum():
            english_word += char
        else:
            if english_word:
                chars.append(english_word)
                english_word = ''
    if english_word:
        chars.append(english_word)
    return chars

# 停用词（简单示例）
stopwords = set(['是', '的', '在', '和', '使', '用', '进', '行', '一', '种', '优', '秀'])

print("\\n【词频统计】")
# 3. 词频统计
all_words = []
doc_words = []
for doc in documents:
    tokens = simple_tokenize(doc)
    filtered = [w for w in tokens if w not in stopwords and len(w) > 1]
    doc_words.append(filtered)
    all_words.extend(filtered)

word_counts = Counter(all_words)
print("词频TOP10:")
for word, count in word_counts.most_common(10):
    print(f"  {word}: {count}次")

# 4. 计算TF-IDF
print("\\n【TF-IDF 计算】")
N = len(documents)

# 计算文档频率
df = defaultdict(int)
for words in doc_words:
    for word in set(words):
        df[word] += 1

# 计算每个文档的TF-IDF
for doc_idx, words in enumerate(doc_words):
    tf = Counter(words)
    tf_idf = {}
    for word, count in tf.items():
        tf_val = count / len(words)
        idf_val = math.log(N / (df[word]))
        tf_idf[word] = tf_val * idf_val
    
    top_words = sorted(tf_idf.items(), key=lambda x: x[1], reverse=True)[:3]
    print(f"\\n文档{doc_idx + 1}关键词:")
    for word, score in top_words:
        print(f"  {word}: {score:.4f}")

# 5. 简单关键词提取
print("\\n【关键词提取结果】")
key_words = [word for word, count in word_counts.most_common(5) if len(word) > 1]
print(f"核心关键词: {', '.join(key_words)}")

# 6. 共现分析
print("\\n【共现分析（出现在同一文档中）】")
cooccur = defaultdict(int)
for words in doc_words:
    pairs = list(zip(words, words[1:]))
    for a, b in pairs:
        if a < b:
            cooccur[(a, b)] += 1
        else:
            cooccur[(b, a)] += 1

print("共现TOP5:")
for (a, b), count in sorted(cooccur.items(), key=lambda x: x[1], reverse=True)[:5]:
    print(f"  {a} <-> {b}: {count}次")

# 7. 可视化数据准备
print("\\n【可视化数据】")
print("词频统计可用于生成词云")
for word, count in word_counts.most_common(8):
    print(f"{'█' * count} {word}({count})")
`
    },
    {
        id: 9,
        title: "异常值检测",
        level: "高级",
        description: "学习多种异常值检测方法",
        theory: `
<h3>异常值检测</h3>
<p>异常值是与其他数据显著不同的数据点，可能是错误也可能是重要发现。</p>

<h4>异常值产生原因</h4>
<ul>
    <li>数据录入错误</li>
    <li>测量误差</li>
    <li>真实异常（如欺诈交易）</li>
    <li>自然变异</li>
</ul>

<h4>检测方法</h4>
<ul>
    <li><b>统计方法</b>：Z-score, IQR</li>
    <li><b>基于距离</b>：KNN, DBSCAN</li>
    <li><b>基于模型</b>：Isolation Forest, One-Class SVM</li>
    <li><b>可视化方法</b>：箱线图, 散点图</li>
</ul>

<h4>处理策略</h4>
<ul>
    <li>删除异常值</li>
    <li>转换数据</li>
    <li>保留并特别分析</li>
</ul>
        `,
        exercises: [
            "创建包含异常值的数据",
            "使用IQR方法检测异常值",
            "使用Z-score方法检测异常值",
            "比较不同方法的效果"
        ],
        quiz: [
            {
                question: "IQR 是指？",
                options: ["均值与标准差之差", "上四分位数与下四分位数之差", "最大值与最小值之差", "中位数与均值之差"],
                answer: 1
            },
            {
                question: "Z-score为3表示？",
                options: ["距离均值3个标准差", "值为3", "概率为0.3", "排名第3"],
                answer: 0
            },
            {
                question: "以下哪种不是异常值处理方法？",
                options: ["删除", "填充", "放大", "保留"],
                answer: 2
            }
        ],
        initialCode: "",
        solutionCode: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

print("="*50)
print("异常值检测")
print("="*50)

# 1. 创建包含异常值的数据
np.random.seed(42)
# 正常数据
normal_data = np.random.normal(100, 15, 1000)
# 添加异常值
outliers = np.array([50, 55, 150, 155, 160, 200, 25, 30])
data = np.concatenate([normal_data, outliers])

print(f"\\n数据总量: {len(data)}")
print(f"正常数据: {len(normal_data)}")
print(f"添加异常值: {len(outliers)}")
print(f"异常值: {outliers}")

# 2. 统计描述
print("\\n【统计描述】")
df = pd.DataFrame({'数值': data})
print(df.describe())

# 3. IQR方法
print("\\n【IQR方法检测】")
Q1 = np.percentile(data, 25)
Q3 = np.percentile(data, 75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

iqr_outliers = data[(data < lower_bound) | (data > upper_bound)]
print(f"IQR范围: [{lower_bound:.2f}, {upper_bound:.2f}]")
print(f"检测到异常值: {len(iqr_outliers)}个")
print(f"异常值: {sorted(iqr_outliers)}")

# 4. Z-score方法
print("\\n【Z-score方法检测】")
mean = np.mean(data)
std = np.std(data)
z_scores = (data - mean) / std

threshold = 3
z_outliers = data[np.abs(z_scores) > threshold]
print(f"均值: {mean:.2f}, 标准差: {std:.2f}")
print(f"Z-score阈值: ±{threshold}")
print(f"检测到异常值: {len(z_outliers)}个")
print(f"异常值: {sorted(z_outliers)}")

# 5. 修正Z-score（更稳健）
print("\\n【修正Z-score方法】")
median = np.median(data)
mad = np.median(np.abs(data - median))
modified_z = 0.6745 * (data - median) / (mad if mad != 0 else 1)

modified_threshold = 3.5
modified_outliers = data[np.abs(modified_z) > modified_threshold]
print(f"中位数: {median:.2f}, MAD: {mad:.2f}")
print(f"检测到异常值: {len(modified_outliers)}个")
print(f"异常值: {sorted(modified_outliers)}")

# 6. 方法比较
print("\\n【方法比较】")
methods = {
    '真实异常值': set(outliers),
    'IQR': set(iqr_outliers),
    'Z-score': set(z_outliers),
    '修正Z-score': set(modified_outliers)
}

for name, found in methods.items():
    if name == '真实异常值':
        continue
    precision = len(found & methods['真实异常值']) / len(found) if len(found) > 0 else 0
    recall = len(found & methods['真实异常值']) / len(methods['真实异常值'])
    print(f"{name}:")
    print(f"  检测数: {len(found)}, 准确率: {precision:.2%}, 召回率: {recall:.2%}")

# 7. 可视化
plt.figure(figsize=(12, 8))

# 箱线图
plt.subplot(2, 2, 1)
bp = plt.boxplot(data, vert=True, patch_artist=True)
bp['boxes'][0].set_facecolor('#87CEEB')
plt.title('箱线图')
plt.ylabel('数值')

# 直方图
plt.subplot(2, 2, 2)
plt.hist(data, bins=50, alpha=0.7, color='skyblue', edgecolor='black')
plt.axvline(lower_bound, color='red', linestyle='--', label='IQR边界')
plt.axvline(upper_bound, color='red', linestyle='--')
plt.title('直方图')
plt.legend()

# Z-score图
plt.subplot(2, 2, 3)
plt.scatter(range(len(z_scores)), z_scores, alpha=0.6)
plt.axhline(y=threshold, color='red', linestyle='--')
plt.axhline(y=-threshold, color='red', linestyle='--')
plt.title('Z-score散点图')
plt.ylabel('Z-score')

# 散点图
plt.subplot(2, 2, 4)
x = range(len(data))
y = data
plt.scatter(x, y, alpha=0.5, label='正常数据')
outlier_x = [i for i, val in enumerate(data) if val in iqr_outliers]
outlier_y = [val for val in data if val in iqr_outliers]
plt.scatter(outlier_x, outlier_y, color='red', s=100, label='检测异常值')
plt.title('数据散点图')
plt.legend()

plt.tight_layout()
plt.savefig('outliers.png')
print("\\n图表已保存为 outliers.png")
`
    },
    {
        id: 10,
        title: "机器学习入门-分类",
        level: "高级",
        description: "学习基础分类算法：逻辑回归和KNN",
        theory: `
<h3>机器学习分类入门</h3>
<p>分类是监督学习的核心任务，预测数据属于哪个类别。</p>

<h4>常见分类算法</h4>
<ul>
    <li><b>逻辑回归</b>：线性分类器</li>
    <li><b>K近邻(KNN)</b>：基于实例的学习</li>
    <li><b>决策树</b>：规则-based分类</li>
    <li><b>随机森林</b>：集成学习</li>
</ul>

<h4>评估指标</h4>
<ul>
    <li><b>准确率(Accuracy)</b>：正确预测的比例</li>
    <li><b>精确率(Precision)</b>：预测为正的样本中真正为正的比例</li>
    <li><b>召回率(Recall)</b>：真正为正的样本中被正确预测的比例</li>
    <li><b>F1值</b>：精确率和召回率的调和平均</li>
</ul>

<h4>模型训练流程</h4>
<ul>
    <li>数据准备与预处理</li>
    <li>训练集/测试集划分</li>
    <li>模型训练</li>
    <li>模型评估</li>
</ul>
        `,
        exercises: [
            "创建分类数据集",
            "实现K近邻算法",
            "评估模型性能",
            "计算混淆矩阵"
        ],
        quiz: [
            {
                question: "以下哪个不是分类算法？",
                options: ["逻辑回归", "KNN", "线性回归", "决策树"],
                answer: 2
            },
            {
                question: "混淆矩阵中，真正例是指？",
                options: ["预测为正实际为正", "预测为正实际为负", "预测为负实际为正", "预测为负实际为负"],
                answer: 0
            },
            {
                question: "准确率的计算公式是？",
                options: ["TP/(TP+FP)", "TP/(TP+FN)", "(TP+TN)/(TP+TN+FP+FN)", "2*P*R/(P+R)"],
                answer: 2
            }
        ],
        initialCode: "",
        solutionCode: `import numpy as np
import math
from collections import Counter

print("="*50)
print("机器学习分类 - K近邻算法")
print("="*50)

# 1. 创建分类数据集
np.random.seed(42)

# 类别0
n_class0 = 50
X0 = np.random.normal(0, 1, (n_class0, 2))
y0 = np.zeros(n_class0)

# 类别1
n_class1 = 50
X1 = np.random.normal(3, 1, (n_class1, 2))
y1 = np.ones(n_class1)

X = np.vstack([X0, X1])
y = np.hstack([y0, y1])

print(f"\\n数据集大小: {X.shape}")
print(f"类别0: {n_class0}个样本")
print(f"类别1: {n_class1}个样本")
print(f"\\n前5个样本:")
for i in range(5):
    print(f"  样本{i}: X={X[i]}, y={y[i]}")

# 2. 划分训练集和测试集
print("\\n【数据集划分】")
indices = np.arange(len(X))
np.random.shuffle(indices)
train_size = int(0.8 * len(X))
train_indices = indices[:train_size]
test_indices = indices[train_size:]

X_train, y_train = X[train_indices], y[train_indices]
X_test, y_test = X[test_indices], y[test_indices]

print(f"训练集: {len(X_train)}个样本")
print(f"测试集: {len(X_test)}个样本")

# 3. 实现K近邻算法
class KNNClassifier:
    def __init__(self, k=5):
        self.k = k
    
    def fit(self, X, y):
        self.X_train = X
        self.y_train = y
    
    def euclidean_distance(self, x1, x2):
        return math.sqrt(sum((x1 - x2) ** 2))
    
    def predict_one(self, x):
        # 计算距离
        distances = []
        for i, x_train in enumerate(self.X_train):
            dist = self.euclidean_distance(x, x_train)
            distances.append((dist, self.y_train[i]))
        
        # 取最近的k个
        distances.sort()
        k_neighbors = distances[:self.k]
        
        # 多数投票
        labels = [neighbor[1] for neighbor in k_neighbors]
        return Counter(labels).most_common(1)[0][0]
    
    def predict(self, X):
        return [self.predict_one(x) for x in X]

# 4. 训练和预测
print("\\n【KNN训练与预测】")
knn = KNNClassifier(k=5)
knn.fit(X_train, y_train)

y_pred = knn.predict(X_test)
print(f"预测完成，k={knn.k}")

# 5. 评估指标
print("\\n【模型评估】")

def calculate_metrics(y_true, y_pred):
    tp = sum((yt == 1) and (yp == 1) for yt, yp in zip(y_true, y_pred))
    tn = sum((yt == 0) and (yp == 0) for yt, yp in zip(y_true, y_pred))
    fp = sum((yt == 0) and (yp == 1) for yt, yp in zip(y_true, y_pred))
    fn = sum((yt == 1) and (yp == 0) for yt, yp in zip(y_true, y_pred))
    
    accuracy = (tp + tn) / (tp + tn + fp + fn) if (tp + tn + fp + fn) > 0 else 0
    precision = tp / (tp + fp) if (tp + fp) > 0 else 0
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0
    f1 = 2 * precision * recall / (precision + recall) if (precision + recall) > 0 else 0
    
    return {'TP': tp, 'TN': tn, 'FP': fp, 'FN': fn,
            'Accuracy': accuracy, 'Precision': precision,
            'Recall': recall, 'F1': f1}

metrics = calculate_metrics(y_test, y_pred)

print("混淆矩阵:")
print(f"  TP={metrics['TP']}  FP={metrics['FP']}")
print(f"  FN={metrics['FN']}  TN={metrics['TN']}")
print()
print(f"准确率: {metrics['Accuracy']:.2%}")
print(f"精确率: {metrics['Precision']:.2%}")
print(f"召回率: {metrics['Recall']:.2%}")
print(f"F1值: {metrics['F1']:.4f}")

# 6. 尝试不同的k值
print("\\n【不同k值比较】")
k_values = [1, 3, 5, 7, 9, 11]
results = []

for k in k_values:
    knn_k = KNNClassifier(k=k)
    knn_k.fit(X_train, y_train)
    y_pred_k = knn_k.predict(X_test)
    metrics_k = calculate_metrics(y_test, y_pred_k)
    results.append((k, metrics_k['Accuracy']))
    print(f"k={k}: 准确率={metrics_k['Accuracy']:.2%}")

best_k, best_acc = max(results, key=lambda x: x[1])
print(f"\\n最佳k值: {best_k}, 准确率: {best_acc:.2%}")

# 7. 示例预测
print("\\n【示例预测】")
new_samples = np.array([[0, 0], [3, 3], [1.5, 1.5]])
new_preds = knn.predict(new_samples)
for sample, pred in zip(new_samples, new_preds):
    print(f"点{sample} -> 类别{int(pred)}")
`
    }
];
