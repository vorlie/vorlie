import { ExternalLink } from "lucide-react";
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

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 text-m3-on-surface">
      <SEO
        title={sale.title}
        description={sale.subtitle}
        url="https://vorlie.pl/for-sale"
      />

      <div className="max-w-5xl mx-auto bg-m3-surface-container rounded-[40px] p-8 sm:p-16 shadow-sm border border-m3-outline/10">
        <header className="text-center mb-12">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-m3-on-surface-variant opacity-60 mb-4">
            {sale.subtitle}
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-m3-primary tracking-tight mb-4">
            {sale.title}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-m3-on-surface-variant leading-relaxed">
            {sale.intro}
          </p>
        </header>

        <div className="space-y-10">
          <section className="group">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black text-m3-on-surface tracking-tight mb-3">
                  {sale.whatThisPageTitle}
                </h2>
                <p className="text-lg text-m3-on-surface-variant leading-relaxed">
                  {sale.whatThisPageText}
                </p>
              </div>
              <div className="rounded-[24px] border border-m3-outline/10 bg-m3-surface-variant p-5 text-sm text-m3-on-surface-variant">
                <p className="font-bold text-m3-primary mb-2">
                  {sale.keyPointsHeading}
                </p>
                <ul className="space-y-2">
                  {sale.keyPoints.map((point: string, index: number) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[32px] border border-m3-outline/10 bg-m3-surface p-6">
                <h3 className="text-2xl font-black text-m3-on-surface mb-4">
                  {sale.paymentTitle}
                </h3>
                <ul className="space-y-3 text-m3-on-surface-variant leading-relaxed">
                  {sale.paymentItems.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[32px] border border-m3-outline/10 bg-m3-surface p-6">
                <h3 className="text-2xl font-black text-m3-on-surface mb-4">
                  {sale.shippingTitle}
                </h3>
                <ul className="space-y-3 text-m3-on-surface-variant leading-relaxed">
                  {sale.shippingItems.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="group">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-black text-m3-primary/30 group-hover:text-m3-primary transition-colors">
                02
              </span>
              <h2 className="text-3xl font-black text-m3-on-surface tracking-tight">
                {sale.packagingTitle}
              </h2>
            </div>
            <div className="sm:ml-12 border-l-2 border-m3-primary/10 pl-6">
              <p className="text-lg text-m3-on-surface-variant leading-relaxed mb-4">
                {sale.packagingText}
              </p>
            </div>
          </section>

          <section className="group">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-black text-m3-primary/30 group-hover:text-m3-primary transition-colors">
                03
              </span>
              <h2 className="text-3xl font-black text-m3-on-surface tracking-tight">
                {sale.trafficTitle}
              </h2>
            </div>
            <div className="sm:ml-12 border-l-2 border-m3-primary/10 pl-6">
              <p className="text-lg text-m3-on-surface-variant leading-relaxed mb-4">
                {sale.trafficText}
              </p>
            </div>
          </section>

          <section className="group">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-black text-m3-primary/30 group-hover:text-m3-primary transition-colors">
                04
              </span>
              <h2 className="text-3xl font-black text-m3-on-surface tracking-tight">
                {sale.listingsTitle}
              </h2>
            </div>

            {forSaleItems.length === 0 ? (
              <div className="rounded-[32px] border border-m3-outline/10 bg-m3-surface p-10 text-center">
                <p className="text-xl font-bold text-m3-on-surface mb-3">
                  {sale.noListingsHeading}
                </p>
                <p className="text-m3-on-surface-variant leading-relaxed">
                  {sale.noListingsBody}
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {forSaleItems.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-[32px] border border-m3-outline/10 bg-m3-surface p-6"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-m3-outline/10 bg-m3-surface-variant px-3 py-1 text-sm font-semibold text-m3-on-surface-variant">
                          ID: {item.id}
                        </span>
                        <h3 className="mt-4 text-2xl font-black text-m3-on-surface">
                          {item.title[language]}
                        </h3>
                        {item.price && (
                          <p className="mt-2 text-lg font-semibold text-m3-primary">
                            {item.price}
                          </p>
                        )}
                      </div>
                      <div className="inline-flex items-center rounded-full border border-m3-outline/10 bg-m3-surface-variant px-4 py-2 text-sm font-black text-m3-on-surface-variant">
                        {sale.conditionLabel} {item.condition[language]}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6">
                      <div className="grid grid-cols-2 grid-rows-2 gap-3">
                        {item.photos && item.photos.length > 0 ? (
                          <>
                            {/* Main large image (first image) */}
                            <div className="col-span-2 row-span-2">
                              <img
                                src={item.photos[0]}
                                alt={`${item.title[language]} main photo`}
                                className="h-full w-full rounded-[24px] object-cover border border-m3-outline/10"
                              />
                            </div>

                            {/* Two smaller images (second and third if they exist) */}
                            {item.photos.slice(1, 3).map((src, index) => (
                              <div key={index + 1} className="hidden lg:block">
                                <img
                                  src={src}
                                  alt={`${item.title[language]} photo ${index + 2}`}
                                  className="h-full w-full rounded-[24px] object-cover border border-m3-outline/10"
                                />
                              </div>
                            ))}

                            {/* Show remaining images in mobile view */}
                            {item.photos.length > 3 && (
                              <div className="col-span-2 lg:hidden grid grid-cols-2 gap-3">
                                {item.photos.slice(3).map((src, index) => (
                                  <img
                                    key={index + 3}
                                    src={src}
                                    alt={`${item.title[language]} photo ${index + 4}`}
                                    className="h-40 w-full rounded-[24px] object-cover border border-m3-outline/10"
                                  />
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="col-span-2 flex h-40 items-center justify-center rounded-[24px] border border-dashed border-m3-outline/40 bg-m3-surface-variant text-m3-on-surface-variant">
                            {sale.photosMissing}
                          </div>
                        )}
                      </div>

                      <div className="space-y-4 text-m3-on-surface-variant leading-relaxed">
                        <p>{item.description[language]}</p>
                        {item.shippingNote && (
                          <p>
                            <span className="font-semibold text-m3-on-surface">
                              {sale.shippingLabel}
                            </span>{" "}
                            {item.shippingNote[language]}
                          </p>
                        )}
                        {item.notes && (
                          <div className="space-y-2">
                            {item.notes.map((note, index) => (
                              <p
                                key={index}
                                className="text-m3-on-surface-variant"
                              >
                                • {note[language]}
                              </p>
                            ))}
                          </div>
                        )}
                        <a
                          href={`mailto:sales@vorlie.pl?subject=${encodeURIComponent(
                            `Item ${item.id}`,
                          )}`}
                          className="text-sm font-semibold text-m3-primary hover:underline"
                        >
                          {sale.contactAboutItem}
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="group">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-black text-m3-primary/30 group-hover:text-m3-primary transition-colors">
                05
              </span>
              <h2 className="text-3xl font-black text-m3-on-surface tracking-tight">
                {sale.contactTitle}
              </h2>
            </div>
            <div className="sm:ml-12 pl-2 mb-6">
              <p className="text-sm font-semibold text-m3-on-surface-variant">
                {sale.contactText}
              </p>
            </div>
            <div className="sm:ml-12 pl-2 mb-6">
              <p className="text-sm text-m3-on-surface-variant">
                {sale.parcelLockerHint}{" "}
                <a
                  href="https://inpost.pl/znajdz-paczkomat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-m3-primary font-semibold hover:underline inline-flex items-center gap-1"
                >
                  {sale.parcelLockerLink}
                  <ExternalLink size={14} />
                </a>
              </p>
            </div>
            <div className="sm:ml-12 border-l-2 border-m3-primary/10 pl-6 space-y-6">
              <p className="text-lg text-m3-on-surface-variant leading-relaxed">
                {sale.contactInstructions}
              </p>

              {/* Email block */}
              <div className="rounded-[24px] border border-m3-outline/10 bg-m3-surface-variant p-5">
                <p className="text-sm font-semibold text-m3-on-surface-variant mb-2">
                  {sale.contactEmailLabel}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <a
                    href="mailto:sales@vorlie.pl"
                    className="font-mono text-m3-primary break-all"
                  >
                    sales@vorlie.pl
                  </a>

                  <button
                    onClick={() =>
                      navigator.clipboard.writeText("sales@vorlie.pl")
                    }
                    className="text-sm font-semibold text-m3-primary hover:underline"
                  >
                    {sale.copyEmail}
                  </button>
                </div>
              </div>

              {/* Example message */}
              <div className="text-sm text-m3-on-surface-variant">
                <p className="font-semibold text-m3-on-surface mb-1">
                  {sale.contactExample}
                </p>
                <code className="block rounded bg-m3-surface-variant px-3 py-2 mt-1">
                  FS-001 – asking about availability
                </code>
              </div>
            </div>
          </section>
          {/* Legal note */}
          <section className="group">
            <div className="flex items-center gap-4 mb-6">
              <p className="text-sm font-semibold text-m3-on-surface-variant">
                {sale.legalNote}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ForSale;
