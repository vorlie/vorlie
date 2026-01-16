function TermsOfService() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 text-m3-on-surface">
      <div className="max-w-4xl mx-auto bg-m3-surface-container rounded-[40px] p-8 sm:p-16 shadow-sm border border-m3-outline/10">
        <h1 className="text-4xl sm:text-5xl font-black mb-4 text-m3-primary tracking-tight text-center sm:text-left">
          Terms of Service
        </h1>
        <p className="text-sm font-black uppercase tracking-widest text-m3-on-surface-variant opacity-50 mb-12 text-center sm:text-left">
          Last Updated: 15/09/2025
        </p>

        <div className="space-y-12">
          <section className="group">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-black text-m3-primary/30 group-hover:text-m3-primary transition-colors">01</span>
              <h2 className="text-2xl font-black text-m3-on-surface tracking-tight">Acceptance of Terms</h2>
            </div>
            <p className="text-lg text-m3-on-surface-variant font-medium leading-relaxed sm:ml-12 border-l-2 border-m3-primary/10 pl-6 group-hover:border-m3-primary/30 transition-colors">
              By using Miko#3059 (the "Bot"), you agree to be bound by these
              Terms of Service ("Terms"). If you do not agree to these Terms,
              please do not use the Bot.
            </p>
          </section>

          <section className="group">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-black text-m3-primary/30 group-hover:text-m3-primary transition-colors">02</span>
              <h2 className="text-2xl font-black text-m3-on-surface tracking-tight">Description of Service</h2>
            </div>
            <p className="text-lg text-m3-on-surface-variant font-medium leading-relaxed sm:ml-12 border-l-2 border-m3-primary/10 pl-6 group-hover:border-m3-primary/30 transition-colors">
              Miko#3059 is a versatile Discord bot that provides a range of
              features and services for users to enjoy. The Bot is provided "as
              is" without any warranties, express or implied.
            </p>
          </section>

          <section className="group">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-black text-m3-primary/30 group-hover:text-m3-primary transition-colors">03</span>
              <h2 className="text-2xl font-black text-m3-on-surface tracking-tight">User Obligations</h2>
            </div>
            <div className="sm:ml-12 border-l-2 border-m3-primary/10 pl-6 group-hover:border-m3-primary/30 transition-colors">
              <p className="text-lg text-m3-on-surface-variant font-medium mb-4">
                By using the Bot, you agree to the following:
              </p>
              <ul className="grid gap-3 list-none">
                {[
                  "Compliance with Discord's Terms and Community Guidelines.",
                  "Refrain from unlawful activities (spam, harassment, malware).",
                  "No abuse or misuse of Bot functionality.",
                  "Respect for the privacy and rights of other users."
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-m3-on-surface-variant/80 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-m3-primary mt-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="group">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-black text-m3-primary/30 group-hover:text-m3-primary transition-colors">04</span>
              <h2 className="text-2xl font-black text-m3-on-surface tracking-tight">Data and Privacy</h2>
            </div>
            <p className="text-lg text-m3-on-surface-variant font-medium leading-relaxed sm:ml-12 border-l-2 border-m3-primary/10 pl-6 group-hover:border-m3-primary/30 transition-colors">
              Miko#3059 respects your privacy and handles data responsibly. We do not store user messages or other sensitive data permanently. For more details, please review our{" "}
              <a href="/miko/privacy-policy" className="text-m3-primary font-black hover:underline">
                Privacy Policy
              </a>.
            </p>
          </section>

          <section className="group">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-black text-m3-primary/30 group-hover:text-m3-primary transition-colors">05</span>
              <h2 className="text-2xl font-black text-m3-on-surface tracking-tight">Termination & Changes</h2>
            </div>
            <p className="text-lg text-m3-on-surface-variant font-medium leading-relaxed sm:ml-12 border-l-2 border-m3-primary/10 pl-6 group-hover:border-m3-primary/30 transition-colors">
              We reserve the right to modify these Terms or terminate access at any time. Continued use of the Bot constitutes acceptance of updated Terms.
            </p>
          </section>
        </div>
        
        <div className="mt-16 pt-8 border-t border-m3-outline/10 text-center">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-m3-on-surface-variant opacity-30">© {new Date().getFullYear()} vorlie</p>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;
