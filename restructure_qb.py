import json
import re

with open('src/data/courses/quantificationBesoins.ts', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'export const quantificationBesoinsCourse: any = (\[.*\]);', content, re.DOTALL)
if not match:
    exit(1)

data = json.loads(match.group(1))

# Flatten all chapters first
all_chapters = []
for m in data:
    for c in m['chapters']:
        all_chapters.append(c)

# We will create 5 modules based on the PPTX outline:
# 1. Introduction à la quantification
# 2. Méthodes de prévision
# 3. Outils de prévision et modélisation de la demande
# 4. Planification des approvisionnements (and adjustments/analysis)
# 5. Atelier pratique

modules = [
    {'id': 'qb-m1', 'title': 'Module 1 : Introduction à la quantification', 'chapters': []},
    {'id': 'qb-m2', 'title': 'Module 2 : Méthodes de prévision', 'chapters': []},
    {'id': 'qb-m3', 'title': 'Module 3 : Outils de prévision et modélisation de la demande', 'chapters': []},
    {'id': 'qb-m4', 'title': 'Module 4 : Planification des approvisionnements', 'chapters': []},
    {'id': 'qb-m5', 'title': 'Module 5 : Atelier pratique', 'chapters': []}
]

for c in all_chapters:
    # Improve the title if it's generic
    if c['title'] == 'Gestion des approvisionnements et des stocks' or c['title'] == 'Quantification  des besoins':
        lines = c['content'].split('\n')
        # Find the first meaningful line that is not empty, not ###, and not "Gestion des approvisionnements..."
        for line in lines:
            line_clean = line.replace('###', '').strip()
            if line_clean and line_clean != 'Gestion des approvisionnements et des stocks' and line_clean != 'QUANTIFICATION DES BESOINS' and line_clean != 'ACADEMIE SUPPLY CHAIN SANTE':
                c['title'] = line_clean
                break
                
    if c['title'] == 'Gestion des approvisionnements et des stocks' or c['title'] == 'Quantification  des besoins':
        c['title'] = "Introduction" # Fallback
        
    title_lower = c['title'].lower()
    content_lower = c['content'].lower()
    
    # Categorize
    if 'atelier' in title_lower or 'atelier' in content_lower and 'exercice' in content_lower:
        modules[4]['chapters'].append(c)
    elif 'ajustement' in title_lower or 'écart' in title_lower or 'planification' in title_lower:
        modules[3]['chapters'].append(c)
    elif 'outil' in title_lower or 'quantimed' in title_lower or 'pipeline' in title_lower or 'forlab' in title_lower or 'qat' in title_lower:
        modules[2]['chapters'].append(c)
    elif 'méthode' in title_lower or 'prévision' in title_lower or 'consommation' in title_lower or 'morbidité' in title_lower or 'cible' in title_lower or 'service' in title_lower or 'triangulation' in title_lower or 'comparaison' in title_lower:
        # Check if it belongs to intro
        if 'principe' in title_lower and 'demande' in title_lower:
            modules[0]['chapters'].append(c)
        else:
            modules[1]['chapters'].append(c)
    else:
        # By default intro
        modules[0]['chapters'].append(c)

# Clean up empty modules
modules = [m for m in modules if len(m['chapters']) > 0]

# Fix IDs and ensure content is properly structured
for i, m in enumerate(modules):
    m['id'] = f'qb-m{i+1}'
    for j, c in enumerate(m['chapters']):
        c['id'] = f"{m['id']}-c{j+1}"

out_js = 'export const quantificationBesoinsCourse: any = ' + json.dumps(modules, indent=2, ensure_ascii=False) + ';\n'
with open('src/data/courses/quantificationBesoins.ts', 'w', encoding='utf-8') as f:
    f.write(out_js)

print("Restructured successfully")
