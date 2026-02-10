import SEO from "../components/SEO";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 text-m3-on-surface">
      <SEO
        title="Privacy Policy"
        description="Privacy practices for Miko#3059 Discord bot."
        url="https://vorlie.pl/privacy-policy"
      />
      <div className="max-w-4xl mx-auto bg-m3-surface-container rounded-[40px] p-8 sm:p-16 shadow-sm border border-m3-outline/10">
        <h1 className="text-4xl sm:text-5xl font-black mb-4 text-m3-primary tracking-tight text-center sm:text-left">
          Privacy Policy
        </h1>
        <p className="text-sm font-black uppercase tracking-widest text-m3-on-surface-variant opacity-50 mb-12 text-center sm:text-left">
          Last Updated: 15/09/2025
        </p>

        <div className="space-y-12">
          <section className="group">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-black text-m3-primary/30 group-hover:text-m3-primary transition-colors">
                01
              </span>
              <h2 className="text-2xl font-black text-m3-on-surface tracking-tight">
                Information Collection
              </h2>
            </div>
            <div className="sm:ml-12 border-l-2 border-m3-primary/10 pl-6 group-hover:border-m3-primary/30 transition-colors">
              <p className="text-lg text-m3-on-surface-variant font-medium leading-relaxed mb-4">
                Miko#3059 collects minimally necessary data for operation:
              </p>
              <ul className="grid gap-3 list-none mb-6">
                {[
                  "User, Server, and Channel IDs.",
                  "Member counts for statistics and status display.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-m3-on-surface-variant/80 font-bold"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-m3-primary mt-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-lg text-m3-on-surface-variant font-medium opacity-80 italic">
                We do not collect or store message content or personally
                identifiable information.
              </p>
            </div>
          </section>

          <section className="group">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-black text-m3-primary/30 group-hover:text-m3-primary transition-colors">
                02
              </span>
              <h2 className="text-2xl font-black text-m3-on-surface tracking-tight">
                Data Security
              </h2>
            </div>
            <div className="sm:ml-12 border-l-2 border-m3-primary/10 pl-6 group-hover:border-m3-primary/30 transition-colors">
              <ul className="grid gap-3 list-none">
                {[
                  "Processing is performed in-memory without permanent storage.",
                  "Temporary files are immediately deleted after use.",
                  "No permanent storage of user-submitted content or images.",
                  "Prepared statements protect against SQL vulnerabilities.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-m3-on-surface-variant/80 font-bold"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-m3-primary mt-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="group">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-black text-m3-primary/30 group-hover:text-m3-primary transition-colors">
                03
              </span>
              <h2 className="text-2xl font-black text-m3-on-surface tracking-tight">
                User Rights
              </h2>
            </div>
            <div className="sm:ml-12 border-l-2 border-m3-primary/10 pl-6 group-hover:border-m3-primary/30 transition-colors">
              <p className="text-lg text-m3-on-surface-variant font-medium leading-relaxed mb-4">
                You retain full rights to your data (Access, Rectification,
                Deletion). Since we only store basic Discord IDs, requests can
                be handled via our support channels.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-m3-outline/10 text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-m3-on-surface-variant opacity-30">
            © {new Date().getFullYear()} vorlie
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
