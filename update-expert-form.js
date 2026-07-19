const fs = require('fs');
const file = 'src/components/expertises/ExpertForm.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Imports
content = content.replace(
  'import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";',
  'import { Send, CheckCircle, AlertCircle, Loader2, UploadCloud, FileText, X } from "lucide-react";'
);

// 2. State
content = content.replace(
  'const [error, setError] = useState("");',
  'const [error, setError] = useState("");\n  const [cvFile, setCvFile] = useState<File | null>(null);'
);

// 3. Logic & Helper
const submitBlock = `setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const { error: submitError } = await supabase`;

// Handle windows rn
const regexSubmit = /setIsSubmitting\(true\);\r?\n\s*setError\(""\);\r?\n\s*setSuccess\(false\);\r?\n\r?\n\s*try \{\r?\n\s*const \{ error: submitError \} = await supabase/;

const replacementLogic = `  const uploadFile = async (file: File, folder: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = \`\${Math.random().toString(36).substring(2, 15)}_\${Date.now()}.\${fileExt}\`;
    const filePath = \`\${folder}/\${fileName}\`;

    const { error: uploadError } = await supabase.storage
      .from('publication_submissions')
      .upload(filePath, file, { cacheControl: '3600', upsert: false });

    if (uploadError) {
      throw new Error(\`Erreur de téléchargement: \${uploadError.message}\`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from('publication_submissions')
      .getPublicUrl(filePath);

    return publicUrl;
  };

    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      let finalCvLink = formData.cv_link;
      if (cvFile) {
        try {
          finalCvLink = await uploadFile(cvFile, "expert_cvs");
        } catch (uploadErr: any) {
          throw new Error("Impossible de télécharger le fichier: " + uploadErr.message);
        }
      }

      const { error: submitError } = await supabase`;

content = content.replace(regexSubmit, replacementLogic);

// 4. Update the DB call
content = content.replace(
  /cv_link: formData\.cv_link,/g,
  'cv_link: finalCvLink,'
);

// 5. Reset State
const resetBlockRegex = /setSuccess\(true\);\r?\n\s*setFormData\(\{/;
content = content.replace(
  resetBlockRegex,
  'setSuccess(true);\n      setCvFile(null);\n      setFormData({'
);

// 6. UI Update
const searchUIRegex = /<div className="space-y-2">\r?\n\s*<label className="text-sm font-semibold text-white font-poppins">Lien vers votre profil professionnel<\/label>\r?\n\s*<input type="url" name="cv_link" value=\{formData\.cv_link\} onChange=\{handleChange\} className="w-full px-4 py-3 rounded-xl bg-white\/5 border border-white\/10 text-white placeholder-white\/40 focus:border-orange focus:ring-2 focus:ring-orange\/20 outline-none transition-all" placeholder="https:\/\/linkedin\.com\/in\/\.\.\. ou lien vers CV en ligne" \/>\r?\n\s*<\/div>/;

const replaceUI = `<div className="space-y-2">
                  <label className="text-sm font-semibold text-white font-poppins">Dossier de candidature / CV (PDF) *</label>
                  <div className="relative">
                    {cvFile ? (
                      <div className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-6 h-6 text-emerald-400" />
                          <div className="flex flex-col min-w-0">
                            <span className="text-white text-sm font-bold font-poppins truncate max-w-[200px]">{cvFile.name}</span>
                            <span className="text-[10px] text-white/40 font-poppins font-semibold mt-0.5">{(cvFile.size / (1024 * 1024)).toFixed(2)} Mo</span>
                          </div>
                        </div>
                        <button type="button" onClick={() => setCvFile(null)} className="text-white/40 hover:text-white transition-colors p-1">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <label className="w-full bg-white/5 border border-dashed border-white/20 hover:border-orange/50 hover:bg-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all">
                        <UploadCloud className="w-8 h-8 text-white/40" />
                        <span className="text-sm text-white/80 font-bold font-poppins text-center">Téléverser votre CV</span>
                        <span className="text-xs text-white/40 font-medium font-poppins text-center max-w-sm leading-relaxed">
                          Veuillez joindre votre CV au format PDF.
                        </span>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setCvFile(e.target.files[0]);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <label className="text-sm font-semibold text-white font-poppins">Lien LinkedIn (Optionnel)</label>
                  <input type="url" name="cv_link" value={formData.cv_link} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all" placeholder="https://linkedin.com/in/... " />
                </div>`;

content = content.replace(searchUIRegex, replaceUI);

fs.writeFileSync(file, content);
console.log("SUCCESS");
