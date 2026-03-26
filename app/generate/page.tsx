"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Shield, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { BusinessInfo, defaultBusinessInfo, DocType } from "@/lib/types";

const STEPS = [
  "Document Type",
  "Business Info",
  "Data & Payments",
  "Tracking & Sharing",
  "Legal & Age",
  "Contact",
];

function GenerateForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialDoc = (searchParams.get("doc") as DocType) || "bundle";

  const [step, setStep] = useState(0);
  const [info, setInfo] = useState<BusinessInfo>({
    ...defaultBusinessInfo,
    docType: initialDoc,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BusinessInfo, string>>>({});

  const update = (field: keyof BusinessInfo, value: unknown) => {
    setInfo((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleArrayItem = (field: "dataCollected" | "thirdPartyServices", item: string) => {
    const arr = info[field] as string[];
    update(field, arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]);
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BusinessInfo, string>> = {};
    if (step === 1) {
      if (!info.businessName.trim()) newErrors.businessName = "Required";
      if (!info.websiteUrl.trim()) newErrors.websiteUrl = "Required";
    }
    if (step === 5) {
      if (!info.contactEmail.trim() || !/\S+@\S+\.\S+/.test(info.contactEmail)) {
        newErrors.contactEmail = "Valid email required";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    if (step < STEPS.length - 1) setStep(step + 1);
    else {
      // Navigate to preview
      const params = new URLSearchParams({ data: btoa(JSON.stringify(info)) });
      router.push(`/preview?${params}`);
    }
  };

  const back = () => setStep(step - 1);

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-brand-600">
            <Shield className="w-5 h-5" /> PolicyGen
          </Link>
          <span className="text-sm text-gray-400">Step {step + 1} of {STEPS.length}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-200">
        <div
          className="h-1 bg-brand-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Step indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full transition-colors ${
                i < step ? "bg-brand-600" : i === step ? "bg-brand-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {/* STEP 0: Doc type */}
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What do you need?</h2>
              <p className="text-gray-500 mb-8">You can generate one or both documents.</p>
              <div className="grid gap-4">
                {[
                  {
                    id: "privacy" as DocType,
                    title: "Privacy Policy",
                    price: "$9.99",
                    desc: "Required if you collect any user data, use cookies, or have analytics.",
                    icon: <Shield className="w-6 h-6" />,
                  },
                  {
                    id: "tos" as DocType,
                    title: "Terms of Service",
                    price: "$9.99",
                    desc: "Defines the rules users agree to when using your website or app.",
                    icon: <CheckCircle className="w-6 h-6" />,
                  },
                  {
                    id: "bundle" as DocType,
                    title: "Both Documents",
                    price: "$14.99",
                    desc: "Privacy Policy + Terms of Service. Best value — save $5.",
                    icon: (
                      <span className="text-lg font-bold">2x</span>
                    ),
                    highlight: true,
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => update("docType", opt.id)}
                    className={`flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all ${
                      info.docType === opt.id
                        ? opt.highlight
                          ? "border-brand-600 bg-brand-50"
                          : "border-brand-600 bg-brand-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        info.docType === opt.id ? "bg-brand-600 text-white" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {opt.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900">{opt.title}</span>
                        <span className={`font-bold ${opt.highlight ? "text-brand-600" : "text-gray-700"}`}>
                          {opt.price}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">{opt.desc}</p>
                      {opt.highlight && (
                        <span className="inline-block mt-1 text-xs bg-yellow-100 text-yellow-800 font-medium px-2 py-0.5 rounded">
                          Best Value
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1: Business info */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Business</h2>
              <p className="text-gray-500 mb-8">Basic info to personalize your documents.</p>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Business / Website Name *
                  </label>
                  <input
                    type="text"
                    value={info.businessName}
                    onChange={(e) => update("businessName", e.target.value)}
                    placeholder="e.g. Acme Store"
                    className={`w-full border rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                      errors.businessName ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                  {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Website URL *
                  </label>
                  <input
                    type="text"
                    value={info.websiteUrl}
                    onChange={(e) => update("websiteUrl", e.target.value)}
                    placeholder="e.g. https://acmestore.com"
                    className={`w-full border rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                      errors.websiteUrl ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                  {errors.websiteUrl && <p className="text-red-500 text-xs mt-1">{errors.websiteUrl}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Business Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: "website", label: "Website" },
                      { id: "ecommerce", label: "E-commerce" },
                      { id: "shopify", label: "Shopify Store" },
                      { id: "app", label: "Mobile App" },
                      { id: "saas", label: "SaaS / Software" },
                      { id: "blog", label: "Blog / Media" },
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => update("businessType", type.id)}
                        className={`py-2.5 px-4 rounded-lg border text-sm font-medium transition-colors ${
                          info.businessType === type.id
                            ? "border-brand-600 bg-brand-50 text-brand-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Data & payments */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Data You Collect</h2>
              <p className="text-gray-500 mb-8">Select everything that applies to your business.</p>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    What personal data do you collect?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "email", label: "Email Address" },
                      { id: "name", label: "Full Name" },
                      { id: "phone", label: "Phone Number" },
                      { id: "address", label: "Mailing Address" },
                      { id: "payment", label: "Payment Info" },
                      { id: "location", label: "Location / IP" },
                      { id: "usage", label: "Usage Data" },
                      { id: "cookies", label: "Cookies & Tracking" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => toggleArrayItem("dataCollected", item.id)}
                        className={`flex items-center gap-2 py-2.5 px-4 rounded-lg border text-sm font-medium transition-colors text-left ${
                          (info.dataCollected as string[]).includes(item.id)
                            ? "border-brand-600 bg-brand-50 text-brand-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center ${
                            (info.dataCollected as string[]).includes(item.id)
                              ? "bg-brand-600 border-brand-600"
                              : "border-gray-300"
                          }`}
                        >
                          {(info.dataCollected as string[]).includes(item.id) && (
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                              <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Do you sell products or services?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "none", label: "No products / free" },
                      { id: "digital", label: "Digital products" },
                      { id: "physical", label: "Physical products" },
                      { id: "both", label: "Both types" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => update("sellsProducts", opt.id)}
                        className={`py-2.5 px-4 rounded-lg border text-sm font-medium transition-colors ${
                          info.sellsProducts === opt.id
                            ? "border-brand-600 bg-brand-50 text-brand-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Tracking & sharing */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tracking & Third Parties</h2>
              <p className="text-gray-500 mb-8">This determines required disclosures in your policy.</p>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Do you use cookies or tracking technologies?
                  </label>
                  <div className="flex gap-3">
                    {[
                      { val: true, label: "Yes, I use cookies" },
                      { val: false, label: "No cookies" },
                    ].map((opt) => (
                      <button
                        key={String(opt.val)}
                        onClick={() => update("usesCookies", opt.val)}
                        className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-colors ${
                          info.usesCookies === opt.val
                            ? "border-brand-600 bg-brand-50 text-brand-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Which third-party services do you use? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "google_analytics", label: "Google Analytics" },
                      { id: "facebook_pixel", label: "Facebook Pixel" },
                      { id: "mailchimp", label: "Mailchimp" },
                      { id: "stripe", label: "Stripe" },
                      { id: "paypal", label: "PayPal" },
                      { id: "shopify_payments", label: "Shopify Payments" },
                      { id: "hotjar", label: "Hotjar" },
                      { id: "intercom", label: "Intercom / Chat" },
                    ].map((svc) => (
                      <button
                        key={svc.id}
                        onClick={() => toggleArrayItem("thirdPartyServices", svc.id)}
                        className={`flex items-center gap-2 py-2.5 px-4 rounded-lg border text-sm font-medium transition-colors text-left ${
                          (info.thirdPartyServices as string[]).includes(svc.id)
                            ? "border-brand-600 bg-brand-50 text-brand-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center ${
                            (info.thirdPartyServices as string[]).includes(svc.id)
                              ? "bg-brand-600 border-brand-600"
                              : "border-gray-300"
                          }`}
                        >
                          {(info.thirdPartyServices as string[]).includes(svc.id) && (
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                              <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        {svc.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Don't see yours? That's fine — the document will include a general third-party disclosure.</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Legal & age */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Legal & Restrictions</h2>
              <p className="text-gray-500 mb-8">These determine which legal frameworks apply.</p>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Primary jurisdiction (where your business operates)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: "us", label: "🇺🇸 United States" },
                      { id: "eu", label: "🇪🇺 European Union" },
                      { id: "uk", label: "🇬🇧 United Kingdom" },
                      { id: "ca", label: "🇨🇦 Canada" },
                      { id: "au", label: "🇦🇺 Australia" },
                      { id: "other", label: "🌐 Other / Global" },
                    ].map((j) => (
                      <button
                        key={j.id}
                        onClick={() => update("jurisdiction", j.id)}
                        className={`py-2.5 px-4 rounded-lg border text-sm font-medium transition-colors ${
                          info.jurisdiction === j.id
                            ? "border-brand-600 bg-brand-50 text-brand-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {j.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Minimum user age
                  </label>
                  <div className="flex gap-3">
                    {[
                      { id: "all", label: "All ages (13+)" },
                      { id: "13plus", label: "13+ only" },
                      { id: "18plus", label: "18+ only" },
                    ].map((age) => (
                      <button
                        key={age.id}
                        onClick={() => update("ageRestriction", age.id)}
                        className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-colors ${
                          info.ageRestriction === age.id
                            ? "border-brand-600 bg-brand-50 text-brand-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {age.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Do users submit content (reviews, posts, uploads)?
                  </label>
                  <div className="flex gap-3">
                    {[
                      { val: true, label: "Yes" },
                      { val: false, label: "No" },
                    ].map((opt) => (
                      <button
                        key={String(opt.val)}
                        onClick={() => update("allowsUserContent", opt.val)}
                        className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-colors ${
                          info.allowsUserContent === opt.val
                            ? "border-brand-600 bg-brand-50 text-brand-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Contact */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Details</h2>
              <p className="text-gray-500 mb-8">Used in the legal notices section of your documents.</p>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Contact Email for Legal Notices *
                  </label>
                  <input
                    type="email"
                    value={info.contactEmail}
                    onChange={(e) => update("contactEmail", e.target.value)}
                    placeholder="legal@yoursite.com"
                    className={`w-full border rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                      errors.contactEmail ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                  {errors.contactEmail && <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Company Address (optional)
                  </label>
                  <input
                    type="text"
                    value={info.companyAddress || ""}
                    onChange={(e) => update("companyAddress", e.target.value)}
                    placeholder="123 Main St, City, State 12345"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Effective Date
                  </label>
                  <input
                    type="date"
                    value={info.effectiveDate}
                    onChange={(e) => update("effectiveDate", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-700">
                  <strong>Almost done!</strong> After this step you'll see a free preview of your complete document(s).
                  You only pay when you download.
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            {step > 0 ? (
              <button onClick={back} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-medium">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={next}
              className="flex items-center gap-2 bg-brand-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-brand-700 transition-colors"
            >
              {step === STEPS.length - 1 ? "Preview Documents" : "Continue"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense>
      <GenerateForm />
    </Suspense>
  );
}
