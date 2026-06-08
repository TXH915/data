#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
正确的方式：把 solutionCode 使用反引号包裹的正确方法
"""

import re

with open('/workspace/js/projects.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 查找 solutionCode 的 pattern
# 我们要找的是 solutionCode: "  然后是  "
# 由于是多行代码，需要非贪婪匹配

# 先找到所有使用双引号的 solutionCode
# 这些是多行的，所以我们用一个一个替换

# 项目1
pattern1 = '''                solutionCode: "import pandas as pd\nimport numpy as np\n\n# 创建包含缺失值的DataFrame\ndata = {\n    'A': [1, 2, np.nan, 4, 5],\n    'B': [np.nan, 2, 3, np.nan, 5],\n    'C': [1, 2, 3, 4, 5]\n}\ndf = pd.DataFrame(data)\n\n# 统计各列缺失值数量\nprint(\"Missing Values Statistics:\")\nprint(df.isnull().sum())\n\n# Fill missing values with median\ndf_filled = df.fillna(df.median())\nprint(\"\\nFilled Data:\")\nprint(df_filled)'''
new_pattern1 = '''                solutionCode: `import pandas as pd
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
print(df_filled)`'''

# 检查是否匹配成功
content = content.replace(pattern1 + '"', new_pattern1)

# 保存
with open('/workspace/js/projects.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
