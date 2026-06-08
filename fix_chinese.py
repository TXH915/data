#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

# 定义替换映射
replacements = {
    # 项目6 - 描述性统计
    '统计摘要:': 'Statistics Summary:',
    '均值:': 'Mean:',
    '中位数:': 'Median:',
    '标准差:': 'Std Dev:',
    '方差:': 'Variance:',
    'Pandas统计摘要:': 'Pandas Summary:',
    '描述性统计分析': 'Descriptive Statistics',
    '【集中趋势】': '\n【Central Tendency】',
    '数据1 均值:': 'Data1 Mean:',
    '数据1 中位数:': 'Data1 Median:',
    '【离散程度】': '\n【Dispersion】',
    '数据1 标准差:': 'Data1 Std Dev:',
    '数据1 方差:': 'Data1 Variance:',
    '数据1 极差:': 'Data1 Range:',
    '【分位数】': '\n【Quantiles】',
    'Q1 (25%):': 'Q1 (25%):',
    'Q2 (50%):': 'Q2 (50%):',
    'Q3 (75%):': 'Q3 (75%):',
    '【相关分析】': '\n【Correlation】',
    'Pearson相关系数:': 'Pearson Correlation:',
    '【Pandas 完整统计】': '\n【Pandas Complete Statistics】',
    '数据': 'Data',
    '数据1': 'Data1',
    '数据2': 'Data2',
    
    # 项目7 - 数据分组与聚合
    '原始数据：': 'Original Data:',
    '【基本信息】': '\n【Basic Information】',
    '形状:': 'Shape:',
    '列名:': 'Columns:',
    '【选择产品和销量列】': '\n【Select Product and Sales Columns】',
    '【筛选产品A且销量>200】': '\n【Filter Product A with Sales > 200】',
    '【添加销售额列】': '\n【Add Revenue Column】',
    '【按产品分组统计】': '\n【Group by Product】',
    '【按销售额降序排序】': '\n【Sort by Revenue Descending】',
    '产品': 'Product',
    '区域': 'Region',
    '销量': 'Sales',
    '单价': 'Price',
    '销售额': 'Revenue',
    '分组统计结果:': 'Grouping Statistics:',
    
    # 项目9 - 假设检验
    '独立样本t检验结果': 'Independent t-test Results',
    '组1均值:': 'Group 1 Mean:',
    '组2均值:': 'Group 2 Mean:',
    '均值差异:': 'Mean Difference:',
    't统计量:': 't-statistic:',
    'P值:': 'P-value:',
    '结论: 在α=0.05水平上，两组差异显著': 'Conclusion: At alpha=0.05, the difference is significant',
    '结论: 在α=0.05水平上，两组差异不显著': 'Conclusion: At alpha=0.05, the difference is not significant',
    '假设检验实战': 'Hypothesis Testing Practice',
    '【单样本t检验】': '\n【One-sample t-test】',
    '样本均值:': 'Sample Mean:',
    '总体均值:': 'Population Mean:',
    '【两独立样本t检验】': '\n【Two-sample t-test】',
    '【卡方检验】': '\n【Chi-square Test】',
    '观察频数:\n': 'Observed Frequencies:\n',
    '卡方统计量:': 'Chi-square Statistic:',
    '自由度:': 'Degrees of Freedom:',
    
    # 项目10 - 回归分析
    '回归分析实战': 'Regression Analysis Practice',
    '【简单线性回归】': '\n【Simple Linear Regression】',
    '截距:': 'Intercept:',
    '斜率:': 'Slope:',
    '图表已保存为': 'Chart saved as',
    
    # 项目8 - 时间序列
    '时间序列分析实战': 'Time Series Analysis Practice',
    '【数据概览】': '\n【Data Overview】',
    '【月度汇总】': '\n【Monthly Summary】',
    
    # 项目5 - 可视化
    '三角函数曲线': 'Trigonometric Function Curves',
    'X轴': 'X-axis',
    'Y轴': 'Y-axis',
    
    # 项目4 - 数据清洗
    '缺失值统计:': 'Missing Values Statistics:',
    '原始数据：': 'Original Data:',
    '缺失值统计：': 'Missing Values Statistics:',
    '清洗后的数据：': 'Cleaned Data:',
    '用中位数填充数值列的缺失值': 'Fill missing values with median',
    '填充后的数据:': 'Filled Data:',
}

# 读取文件
with open('/workspace/js/projects.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 执行替换
for chinese, english in replacements.items():
    content = content.replace(chinese, english)

# 写回文件
with open('/workspace/js/projects.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacements completed!")
