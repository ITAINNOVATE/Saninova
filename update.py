import json
import re

with open('src/data/courses/quantificationBesoins.ts', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'export const quantificationBesoinsCourse: any = (\[.*\]);', content, re.DOTALL)
if match:
    data = json.loads(match.group(1))
    for i, m in enumerate(data):
        if not m['title'].startswith('Module '):
            m['title'] = f"Module {i+1} : {m['title']}"
    
    out_js = 'export const quantificationBesoinsCourse: any = ' + json.dumps(data, indent=2, ensure_ascii=False) + ';\n'
    with open('src/data/courses/quantificationBesoins.ts', 'w', encoding='utf-8') as f:
        f.write(out_js)
    print('Updated successfully')
else:
    print('Failed to match')
