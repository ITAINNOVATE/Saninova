"use client";

import React, { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2, UploadCloud, Image as ImageIcon, FileText, Smartphone, CreditCard, Lock } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function PublicationSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"fedapay" | "izipay">("fedapay");
  const [paymentStep, setPaymentStep] = useState<"choice" | "redirecting" | "later">("choice");
  const [submittedAuthorType, setSubmittedAuthorType] = useState<string>("particulier");

  const [formData, setFormData] = useState({
    authorType: "particulier",
    structure: "",
    author: "",
    title: "",
    email: "",
    contact: "",
  });

  const [contentFile, setContentFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const uploadFile = async (file: File, folder: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('publication_submissions')
      .upload(filePath, file, { cacheControl: '3600', upsert: false });

    if (uploadError) {
      console.error("Upload error details:", uploadError);
      throw new Error(`Erreur lors de l'upload du fichier ${file.name} (${uploadError.message || JSON.stringify(uploadError)}). Assurez-vous que le bucket "publication_submissions" existe et est public.`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from('publication_submissions')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contentFile) {
      setError("Le fichier de contenu est obligatoire.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      setUploadProgress("Téléchargement du contenu...");
      const contentUrl = await uploadFile(contentFile, 'contents');
      
      let imageUrl = null;
      if (imageFile) {
        setUploadProgress("Téléchargement de l'image...");
        imageUrl = await uploadFile(imageFile, 'images');
      }

      setUploadProgress("Enregistrement de la soumission...");
      
      const { error: submitError } = await supabase
        .from('saninova_publication_submissions')
        .insert([{
          structure: `${formData.structure} (${formData.authorType === 'particulier' ? 'Particulier' : 'Entreprise'})`,
          author: formData.author,
          title: formData.title,
          content_file_url: contentUrl,
          image_url: imageUrl,
          email: formData.email,
          contact: formData.contact,
          status: 'Nouveau'
        }]);

      if (submitError) throw submitError;

      setSubmittedAuthorType(formData.authorType);
      setSuccess(true);
      setPaymentStep("choice");
      setFormData({
        authorType: "particulier",
        structure: "",
        author: "",
        title: "",
        email: "",
        contact: "",
      });
      setContentFile(null);
      setImageFile(null);
    } catch (err: any) {
      console.error("Error submitting publication form:", err);
      setError(err.message || "Une erreur est survenue lors de l'envoi de votre publication.");
    } finally {
      setIsSubmitting(false);
      setUploadProgress("");
    }
  };

  return (
    <section id="soumettre-publication" className="py-20 bg-light border-t border-light mt-16 relative glow-bg">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 space-y-4">
          <span className="inline-block font-poppins text-xs font-bold text-orange tracking-widest uppercase border-b-2 border-orange pb-1">
            Contribuez à notre réseau
          </span>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-extrabold text-primary">
            Soumettre une Publication
          </h2>
          <p className="font-inter text-dark/70 max-w-2xl mx-auto text-lg">
            Partagez vos recherches, articles et études avec la communauté SaniNova. Notre équipe éditoriale examinera votre proposition pour une éventuelle publication.
          </p>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-light relative overflow-hidden">
          {success ? (
            <div className="space-y-8 py-4">
              {paymentStep === "choice" && (
                <div className="space-y-6 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-4 shadow-sm border border-green-100">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="font-montserrat text-2xl md:text-3xl font-extrabold text-primary">
                      Publication enregistrée !
                    </h3>
                    <p className="text-slate-500 text-sm md:text-base mt-2 max-w-md mx-auto">
                      Votre document a été correctement enregistré. Veuillez finaliser votre soumission en procédant au règlement des frais de publication.
                    </p>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-2xl border border-light flex flex-col md:flex-row items-center justify-between gap-4 max-w-lg mx-auto">
                    <div className="text-center md:text-left">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Montant des frais</p>
                      <p className="font-montserrat text-2xl font-black text-primary mt-1">
                        {submittedAuthorType === "particulier" ? "15.000" : "25.000"} F CFA
                      </p>
                    </div>
                    <span className="px-3.5 py-1.5 bg-orange/10 text-orange font-poppins text-xs font-bold uppercase tracking-wider rounded-full">
                      {submittedAuthorType === "particulier" ? "Tarif Particulier" : "Tarif Entreprise"}
                    </span>
                  </div>

                  <div className="max-w-xl mx-auto space-y-4 pt-2">
                    <p className="text-sm font-semibold text-primary font-poppins text-left">Choisissez votre mode de paiement :</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Fédapay option */}
                      <button
                        onClick={() => setPaymentMethod("fedapay")}
                        className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
                          paymentMethod === "fedapay"
                            ? "border-orange bg-orange/5 shadow-md animate-pulse-subtle"
                            : "border-light bg-slate-50/50 hover:border-orange/20"
                        }`}
                      >
                        <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                          <Smartphone className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-primary text-sm font-poppins">Fédapay</div>
                          <div className="text-xs text-slate-400 mt-0.5">Mobile Money & Cartes</div>
                        </div>
                      </button>

                      {/* Izipay option */}
                      <button
                        onClick={() => setPaymentMethod("izipay")}
                        className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
                          paymentMethod === "izipay"
                            ? "border-orange bg-orange/5 shadow-md animate-pulse-subtle"
                            : "border-light bg-slate-50/50 hover:border-orange/20"
                        }`}
                      >
                        <div className="w-12 h-12 rounded-xl bg-[#d95c00] text-white flex items-center justify-center shrink-0">
                          <CreditCard className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-primary text-sm font-poppins">Izipay</div>
                          <div className="text-xs text-slate-400 mt-0.5">Crypto & Virement</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                    <button
                      onClick={async () => {
                        setPaymentStep("redirecting");
                        // Wait 2s to simulate secure token generation
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        
                        if (paymentMethod === "fedapay") {
                          window.open("https://app.fedapay.com", "_blank");
                        } else {
                          window.open("https://izipay.com", "_blank");
                        }
                        setPaymentStep("choice"); // reset for next steps if they go back
                      }}
                      className="w-full px-8 py-4 bg-orange hover:bg-[#d95c00] text-white font-poppins font-bold rounded-xl shadow-lg shadow-orange/20 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>Procéder au paiement</span>
                      <Send className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => {
                        setSuccess(false);
                        setPaymentStep("choice");
                      }}
                      className="text-slate-400 hover:text-orange text-sm font-semibold transition-all mt-2 cursor-pointer"
                    >
                      Soumettre une autre publication
                    </button>
                  </div>
                </div>
              )}

              {paymentStep === "redirecting" && (
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
                  <Loader2 className="w-12 h-12 text-orange animate-spin" />
                  <div>
                    <h3 className="font-montserrat text-2xl font-bold text-primary">Redirection sécurisée en cours...</h3>
                    <p className="text-slate-500 text-sm mt-2 max-w-sm">
                      Nous vous redirigeons vers la passerelle de paiement sécurisée de {paymentMethod === "fedapay" ? "Fédapay" : "Izipay"} pour finaliser votre transaction.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="p-4 bg-red-50/50 border border-red-200 text-red-600 rounded-2xl flex items-start space-x-3 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{error}</span>
                </div>
              )}

              <div className="space-y-4 mb-8">
                <label className="text-sm font-semibold text-primary font-poppins block">Vous soumettez en tant que :</label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all flex-1 border-2 ${formData.authorType === 'particulier' ? 'border-orange shadow-md' : 'border-light/60 hover:border-orange/30'}`}>
                    <input type="radio" name="authorType" value="particulier" checked={formData.authorType === 'particulier'} onChange={handleChange} className="w-5 h-5 mt-0.5 accent-orange" />
                    <div>
                      <div className="font-bold text-primary text-sm">Particulier / Indépendant</div>
                      <div className="text-xs font-semibold text-orange mt-1">Frais de publication : 15.000 F CFA</div>
                    </div>
                  </label>
                  <label className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all flex-1 border-2 ${formData.authorType === 'entreprise' ? 'border-orange shadow-md' : 'border-light/60 hover:border-orange/30'}`}>
                    <input type="radio" name="authorType" value="entreprise" checked={formData.authorType === 'entreprise'} onChange={handleChange} className="w-5 h-5 mt-0.5 accent-orange" />
                    <div>
                      <div className="font-bold text-primary text-sm">Entreprise / Personne morale</div>
                      <div className="text-xs font-semibold text-orange mt-1">Frais de publication : 25.000 F CFA</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="structure" className="text-sm font-semibold text-primary font-poppins">
                    {formData.authorType === 'particulier' ? 'Profession / Affiliation *' : 'Nom de la structure / Entreprise *'}
                  </label>
                  <input
                    type="text"
                    id="structure"
                    name="structure"
                    required
                    value={formData.structure}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl border border-light focus:border-orange focus:ring-4 focus:ring-orange/10 outline-none transition-all font-inter bg-slate-50"
                    placeholder={formData.authorType === 'particulier' ? 'Ex: Pharmacien titulaire, Étudiant...' : 'Nom de votre organisation'}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="author" className="text-sm font-semibold text-primary font-poppins">
                    {formData.authorType === 'particulier' ? 'Nom et Prénom(s) de l\'auteur *' : 'Point focal / Auteur(s) *'}
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    required
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl border border-light focus:border-orange focus:ring-4 focus:ring-orange/10 outline-none transition-all font-inter bg-slate-50"
                    placeholder="Ex: Dr. Jean Dupont"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="title" className="text-sm font-semibold text-primary font-poppins">Titre de la publication *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl border border-light focus:border-orange focus:ring-4 focus:ring-orange/10 outline-none transition-all font-inter bg-slate-50 text-lg font-medium"
                    placeholder="Titre complet de votre article ou étude"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-primary font-poppins">Email de contact *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl border border-light focus:border-orange focus:ring-4 focus:ring-orange/10 outline-none transition-all font-inter bg-slate-50"
                    placeholder="votre.email@exemple.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact" className="text-sm font-semibold text-primary font-poppins">Téléphone (Contact) *</label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    required
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl border border-light focus:border-orange focus:ring-4 focus:ring-orange/10 outline-none transition-all font-inter bg-slate-50"
                    placeholder="+229 00 00 00 00"
                  />
                </div>
              </div>

              {/* File Upload Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-light/50">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-primary font-poppins flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange" />
                    Fichier de la publication (Contenu) *
                  </label>
                  <div className="relative group">
                    <input
                      type="file"
                      id="contentFile"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setContentFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className={`w-full px-5 py-6 rounded-xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center gap-2
                      ${contentFile ? 'border-accent bg-accent/5' : 'border-light group-hover:border-orange/50 bg-slate-50 group-hover:bg-slate-100/50'}`}>
                      <UploadCloud className={`w-8 h-8 ${contentFile ? 'text-accent' : 'text-slate-400'}`} />
                      <div className="font-inter text-sm font-medium text-primary">
                        {contentFile ? contentFile.name : "Cliquez ou glissez le document PDF/Word ici"}
                      </div>
                      <div className="text-xs text-slate-400">Max 10MB</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-primary font-poppins flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-orange" />
                    Image illustrative (Optionnel)
                  </label>
                  <div className="relative group">
                    <input
                      type="file"
                      id="imageFile"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className={`w-full px-5 py-6 rounded-xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center gap-2
                      ${imageFile ? 'border-accent bg-accent/5' : 'border-light group-hover:border-orange/50 bg-slate-50 group-hover:bg-slate-100/50'}`}>
                      <ImageIcon className={`w-8 h-8 ${imageFile ? 'text-accent' : 'text-slate-400'}`} />
                      <div className="font-inter text-sm font-medium text-primary">
                        {imageFile ? imageFile.name : "Cliquez ou glissez une image (JPG, PNG) ici"}
                      </div>
                      <div className="text-xs text-slate-400">Image de couverture</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="bg-orange/10 border border-orange/20 rounded-xl p-5 mb-6 flex gap-3 shadow-sm">
                  <AlertCircle className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                  <p className="text-sm text-primary font-medium leading-relaxed">
                    <strong>Note importante :</strong> La soumission est facturée à <strong className="text-orange">{formData.authorType === 'particulier' ? '15.000 F CFA' : '25.000 F CFA'}</strong>. Une fois soumis, vous serez redirigé vers le paiement sécurisé pour finaliser votre règlement.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-10 py-4 bg-orange hover:bg-[#d95c00] text-white font-poppins font-bold text-lg rounded-xl shadow-xl shadow-orange/30 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>{uploadProgress || "Envoi en cours..."}</span>
                    </>
                  ) : (
                    <>
                      <span>Soumettre la publication</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
