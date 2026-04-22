import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { forSaleItems } from "../data/forSaleItems";
import { useTranslation } from "../i18n";

type ForSaleTranslation = {
  legalNote: string;
  title: string;
  subtitle: string;
  intro: string;
  whatThisPageTitle: string;
  whatThisPageText: string;
  keyPointsHeading: string;
  keyPoints: string[];
  paymentTitle: string;
  paymentItems: string[];
  shippingTitle: string;
  shippingItems: string[];
  packagingTitle: string;
  packagingText: string;
  trafficTitle: string;
  trafficText: string;
  listingsTitle: string;
  conditionLabel: string;
  noListingsHeading: string;
  noListingsBody: string;
  contactTitle: string;
  contactText: string;
  parcelLockerHint: string;
  parcelLockerLink: string;
  shippingLabel: string;
  photosMissing: string;
  contactEmailLabel: string;
  contactInstructions: string;
  contactExample: string;
  copyEmail: string;
  contactAboutItem: string;
};

function ForSale() {
  const { language, t } = useTranslation();
  const sale = t<ForSaleTranslation>("forSale");
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("sales@vorlie.pl");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 1500);
  };

  const SectionLabel = ({ number, title }: { number: string; title: string }) => (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-xs font-black text-m3-primary/30 group-hover:text-m3-primary transition-colors tracking-[0.2em] uppercase">
        {number}
      </span>
      <div className="h-px flex-grow bg-m3-outline/10" />
      <h2 className="text-2xl sm:text-3xl font-black text-m3-on-surface tracking-tighter">
        {title}
      </h2>
    </div>
  );

  return (
    <div className="min-h-screen text-m3-on-surface animate-reveal">
      <SEO
        title={sale.title}
        description={sale.subtitle}
        url="https://vorlie.pl/for-sale"
      />

      <div className="max-w-full mx-auto relative z-10 py-8">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-m3-primary text-xs font-black uppercase tracking-[0.25em] mb-3 opacity-70">
            Private sale
          </p>
          <h1 className="text-5xl sm:text-7xl font-black text-m3-on-surface tracking-tighter mb-4">
            {sale.title}
          </h1>
          <div className="h-1.5 w-20 bg-gradient-to-r from-m3-primary to-m3-secondary rounded-full mb-6" />
          <p className="text-lg text-m3-on-surface-variant font-bold opacity-70 max-w-2xl leading-relaxed">
            {sale.intro}
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Section 01 — What This Page Is */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="m3-card p-6 sm:p-10 group"
          >
            <SectionLabel number="01" title={sale.whatThisPageTitle} />
            <p className="text-m3-on-surface-variant leading-relaxed mb-6 font-medium">
              {sale.whatThisPageText}
            </p>

            <div className="grid gap-4 sm:grid-cols-3 mb-6">
              {/* Key Points */}
              <div className="sm:col-span-1 p-5 bg-m3-primary/5 rounded-2xl border border-m3-primary/10">
                <p className="text-xs font-black text-m3-primary uppercase tracking-widest mb-3">
                  {sale.keyPointsHeading}
                </p>
                <ul className="space-y-2">
                  {sale.keyPoints.map((point: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-m3-on-surface-variant">
                      <span className="text-m3-primary mt-0.5">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment */}
              <div className="p-5 bg-m3-on-surface/5 rounded-2xl border border-m3-outline/5">
                <h3 className="text-xs font-black text-m3-on-surface uppercase tracking-widest mb-3">
                  {sale.paymentTitle}
                </h3>
                <ul className="space-y-2">
                  {sale.paymentItems.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-m3-on-surface-variant">
                      <span className="text-m3-secondary mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shipping */}
              <div className="p-5 bg-m3-on-surface/5 rounded-2xl border border-m3-outline/5">
                <h3 className="text-xs font-black text-m3-on-surface uppercase tracking-widest mb-3">
                  {sale.shippingTitle}
                </h3>
                <ul className="space-y-2">
                  {sale.shippingItems.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-m3-on-surface-variant">
                      <span className="text-m3-secondary mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Section 02 — Packaging */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="m3-card p-6 sm:p-10 group"
          >
            <SectionLabel number="02" title={sale.packagingTitle} />
            <p className="text-m3-on-surface-variant leading-relaxed font-medium border-l-2 border-m3-primary/20 pl-4">
              {sale.packagingText}
            </p>
          </motion.div>

          {/* Section 03 — Traffic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="m3-card p-6 sm:p-10 group"
          >
            <SectionLabel number="03" title={sale.trafficTitle} />
            <p className="text-m3-on-surface-variant leading-relaxed font-medium border-l-2 border-m3-primary/20 pl-4">
              {sale.trafficText}
            </p>
          </motion.div>

          {/* Section 04 — Listings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="m3-card p-6 sm:p-10 group"
          >
            <SectionLabel number="04" title={sale.listingsTitle} />

            {forSaleItems.length === 0 ? (
              <div className="text-center py-16">
                <span className="material-symbols-rounded text-6xl text-m3-on-surface-variant opacity-20 block mb-4">
                  sell
                </span>
                <p className="text-xl font-black text-m3-on-surface mb-2">
                  {sale.noListingsHeading}
                </p>
                <p className="text-m3-on-surface-variant opacity-60 max-w-md mx-auto">
                  {sale.noListingsBody}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {forSaleItems.map((item, i) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 + i * 0.05 }}
                    className="bg-m3-on-surface/5 rounded-[28px] border border-m3-outline/5 p-5 sm:p-8 hover:bg-m3-on-surface/10 transition-colors duration-300"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                      <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-m3-outline/10 bg-m3-surface-container/60 backdrop-blur px-3 py-1 text-xs font-black text-m3-on-surface-variant uppercase tracking-wider mb-3">
                          ID: {item.id}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-m3-on-surface tracking-tighter">
                          {item.title[language]}
                        </h3>
                        {item.price && (
                          <p className="mt-1 text-lg font-black text-m3-primary">
                            {item.price}
                          </p>
                        )}
                      </div>
                      <span className="inline-flex items-center rounded-full border border-m3-outline/10 bg-m3-primary/10 text-m3-primary px-4 py-1.5 text-xs font-black uppercase tracking-wider">
                        {sale.conditionLabel} {item.condition[language]}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-5">
                      <div className="grid grid-cols-2 grid-rows-2 gap-2">
                        {item.photos && item.photos.length > 0 ? (
                          <>
                            <div className="col-span-2 row-span-2">
                              <img
                                src={item.photos[0]}
                                alt={`${item.title[language]} main photo`}
                                className="h-full w-full rounded-2xl object-cover border border-m3-outline/10"
                              />
                            </div>
                            {item.photos.slice(1, 3).map((src, index) => (
                              <div key={index + 1} className="hidden lg:block">
                                <img
                                  src={src}
                                  alt={`${item.title[language]} photo ${index + 2}`}
                                  className="h-full w-full rounded-2xl object-cover border border-m3-outline/10"
                                />
                              </div>
                            ))}
                          </>
                        ) : (
                          <div className="col-span-2 flex h-40 items-center justify-center rounded-2xl border border-dashed border-m3-outline/30 bg-m3-on-surface/5 gap-2 text-m3-on-surface-variant opacity-50">
                            <span className="material-symbols-rounded">image_not_supported</span>
                            <span className="text-sm font-bold">{sale.photosMissing}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3 text-m3-on-surface-variant leading-relaxed">
                        <p className="font-medium">{item.description[language]}</p>
                        {item.shippingNote && (
                          <p className="text-sm">
                            <span className="font-black text-m3-on-surface">
                              {sale.shippingLabel}{" "}
                            </span>
                            {item.shippingNote[language]}
                          </p>
                        )}
                        {item.notes && (
                          <div className="space-y-1">
                            {item.notes.map((note, index) => (
                              <p key={index} className="text-sm flex items-start gap-1.5">
                                <span className="text-m3-primary mt-0.5">•</span>
                                {note[language]}
                              </p>
                            ))}
                          </div>
                        )}
                        <a
                          href={`mailto:sales@vorlie.pl?subject=${encodeURIComponent(`Item ${item.id}`)}`}
                          className="inline-flex items-center gap-1.5 text-sm font-black text-m3-primary hover:opacity-80 transition-opacity mt-2"
                        >
                          <span className="material-symbols-rounded text-[16px]">mail</span>
                          {sale.contactAboutItem}
                        </a>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </motion.div>

          {/* Section 05 — Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="m3-card p-6 sm:p-10 group"
          >
            <SectionLabel number="05" title={sale.contactTitle} />

            <p className="text-m3-on-surface-variant font-medium mb-5 border-l-2 border-m3-primary/20 pl-4">
              {sale.contactText}
            </p>

            <p className="text-sm text-m3-on-surface-variant mb-5 font-medium opacity-70">
              {sale.parcelLockerHint}{" "}
              <a
                href="https://inpost.pl/znajdz-paczkomat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-m3-primary font-black hover:underline inline-flex items-center gap-1"
              >
                {sale.parcelLockerLink}
                <ExternalLink size={12} />
              </a>
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Email block */}
              <div className="p-5 bg-m3-on-surface/5 rounded-2xl border border-m3-outline/5">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-m3-on-surface-variant opacity-50 mb-3">
                  {sale.contactEmailLabel}
                </p>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href="mailto:sales@vorlie.pl"
                    className="font-mono text-m3-primary font-black break-all"
                  >
                    sales@vorlie.pl
                  </a>
                  <button
                    onClick={copyEmail}
                    className="flex items-center gap-1 text-xs font-black text-m3-primary hover:opacity-80 transition-opacity flex-shrink-0"
                  >
                    <span className="material-symbols-rounded text-[14px]">
                      {emailCopied ? "check" : "content_copy"}
                    </span>
                    {sale.copyEmail}
                  </button>
                </div>
              </div>

              {/* Example message */}
              <div className="p-5 bg-m3-on-surface/5 rounded-2xl border border-m3-outline/5">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-m3-on-surface-variant opacity-50 mb-3">
                  {sale.contactExample}
                </p>
                <code className="block text-sm font-mono text-m3-on-surface bg-m3-on-surface/10 rounded-xl px-3 py-2">
                  FS-001 – {language === "pl" ? "zapytanie o dostępność" : "asking about availability"}
                </code>
              </div>
            </div>
          </motion.div>

          {/* Legal Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="text-center py-4"
          >
            <p className="text-xs text-m3-on-surface-variant opacity-40 font-medium max-w-2xl mx-auto">
              {sale.legalNote}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ForSale;
