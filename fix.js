const fs = require('fs');
const file = 'src/components/expertises/ExpertForm.tsx';
let content = fs.readFileSync(file, 'utf8');

const startString = '    const activeDomains = formData.domains.filter(d => {';
const endString = "status: 'Nouveau'\n        }]);";

const startIndex = content.indexOf(startString);
const endIndex = content.indexOf(endString) + endString.length;

const replacement = `    const activeDomains = formData.domains.filter(d => {
      if (d.startsWith("Autre:")) {
        return d.substring(6).trim() !== "";
      }
      return d.trim() !== "";
    });

    if (activeDomains.length === 0) {
      setError("Veuillez sélectionner au moins un domaine d'expertise (ou en préciser un dans la case 'Autre').");
      return;
    }

  const uploadFile = async (file: File, folder: string) => {
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

      const { error: submitError } = await supabase
        .from('saninova_expert_applications')
        .insert([{
          last_name: formData.last_name,
          first_name: formData.first_name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          city: formData.city,
          professional_status: formData.professional_status,
          job_title: formData.job_title,
          institution: formData.institution,
          experience_years: formData.experience_years,
          education_level: formData.education_level,
          domains: formData.domains,
          collaboration_types: formData.collaboration_types,
          availability: formData.availability,
          languages: formData.languages,
          biography: formData.biography,
          cv_link: finalCvLink,
          consent: formData.consent,
          status: 'Nouveau'
        }]);`;

if (startIndex !== -1 && content.indexOf(endString) !== -1) {
  content = content.substring(0, startIndex) + replacement + content.substring(endIndex);
  fs.writeFileSync(file, content);
  console.log("Fix applied successfully!");
} else {
  console.log("Could not find start or end index!");
}
