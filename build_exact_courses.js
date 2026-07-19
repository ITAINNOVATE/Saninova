const fs = require('fs');

function parseMdToCourse(mdPath, varName, courseIdPrefix) {
    const content = fs.readFileSync(mdPath, 'utf8');
    const slides = content.split(/## Slide \d+/).filter(s => s.trim() !== '');
    
    let currentModule = {
        id: `${courseIdPrefix}-m1`,
        title: "Contenu de la formation",
        chapters: []
    };
    
    let modules = [currentModule];
    let currentChapter = null;
    let chapterCounter = 1;
    
    for (let slide of slides) {
        const lines = slide.trim().split('\n');
        if (lines.length === 0 || lines[0].trim() === '') continue;
        
        let slideTitle = lines[0].trim();
        let slideContent = lines.slice(1).join('\n').trim();
        
        // If it's a completely new section
        if (slideTitle === "Chapitres" || slideTitle.includes("Module") || slideTitle.toLowerCase() === "sommaire") {
            // we could create a new module, but for simplicity, we keep 1 module and chapters
        }
        
        if (!currentChapter || currentChapter.title !== slideTitle) {
            currentChapter = {
                id: `${courseIdPrefix}-m1-c${chapterCounter++}`,
                title: slideTitle,
                type: "text",
                duration: "5 min",
                content: slideContent ? `### ${slideTitle}\n\n${slideContent}` : `### ${slideTitle}`
            };
            currentModule.chapters.push(currentChapter);
        } else {
            // Append to existing chapter
            if (slideContent) {
                currentChapter.content += `\n\n${slideContent}`;
            }
        }
    }
    
    // Remove empty chapters
    currentModule.chapters = currentModule.chapters.filter(c => c.content.trim() !== `### ${c.title}`);
    
    const tsContent = `export const ${varName} = ${JSON.stringify(modules, null, 2)};\n`;
    return tsContent;
}

const gasTs = parseMdToCourse('GESTION DES APPROVISONNEMENTS ET DES STOCKS_extracted.md', 'gestionApprovisionnementsCourse', 'gas');
fs.writeFileSync('src/data/courses/gestionApprovisionnements.ts', gasTs);

const quantTs = parseMdToCourse('QUANTIFICATION DES BESOINS_extracted.md', 'quantificationBesoinsCourse', 'qb');
fs.writeFileSync('src/data/courses/quantificationBesoins.ts', quantTs);

console.log("Course files rebuilt purely from PPT content!");
