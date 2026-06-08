#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# 读取文件
with open('/workspace/js/projects.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 定义更多替换
replacements = {
    '姓名': 'Name',
    '张三': 'Alice',
    '李四': 'Bob',
    '王五': 'Charlie',
    '赵六': 'David',
    '孙八': 'Eve',
    '年龄': 'Age',
    '收入': 'Income',
    '原始Data：': 'Original Data:',
    '清洗后的Data：': 'Cleaned Data:',
    '填充后的Data:': 'Filled Data:',
}

# 执行替换
for chinese, english in replacements.items():
    content = content.replace(chinese, english)

# 写回文件
with open('/workspace/js/projects.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Additional replacements completed!")
