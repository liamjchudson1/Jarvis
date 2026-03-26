import Link from "next/link";
import { Shield, FileText, Zap, CheckCircle, DollarSign, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-brand-600">
            <Shield className="w-6 h-6" />
            PolicyGen
          </div>
          <Link
            href="/generate"
            className="bg-brand-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-700 transition-colors"
          >
            Generate Free Preview →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <Zap className="w-4 h-4" /> Ready in 5 minutes · One-time $9.99
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          Privacy Policy & Terms of Service<br />
          <span className="text-brand-600">Without the Lawyer Bill</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Answer 10 simple questions about your website, app, or Shopify store.
          Get a professionally structured document you can publish today.
          <strong className="text-gray-700"> No subscriptions. No monthly fees. $9.99 once.</strong>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/generate"
            className="bg-brand-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-100"
          >
            Start Free Preview →
          </Link>
          <a
            href="#pricing"
            className="border border-gray-200 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            See Pricing
          </a>
        </div>
        <p className="text-sm text-gray-400 mt-4">Preview free · Pay only when you download</p>
      </section>

      {/* Social proof */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm mb-4">Trusted by website owners, app developers & Shopify stores</p>
          <div className="flex justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-gray-600 text-sm font-medium">"Took 4 minutes and saved me $400 in legal fees." — Michael T.</p>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 py-20" id="how-it-works">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">How It Works</h2>
        <p className="text-center text-gray-500 mb-12">Three steps. Five minutes. Done.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              icon: <FileText className="w-8 h-8 text-brand-600" />,
              title: "Answer 10 Questions",
              desc: "Tell us about your business: what data you collect, your jurisdiction, whether you sell products, and more.",
            },
            {
              step: "2",
              icon: <Shield className="w-8 h-8 text-brand-600" />,
              title: "Preview Your Document",
              desc: "Instantly see your complete, professionally structured Privacy Policy or Terms of Service — free preview, no payment needed yet.",
            },
            {
              step: "3",
              icon: <Zap className="w-8 h-8 text-brand-600" />,
              title: "Pay $9.99 & Download",
              desc: "One-time payment. Download as PDF or copy the HTML. Publish to your site in under a minute.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>
              <div className="text-xs font-bold text-brand-600 mb-1">STEP {item.step}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Everything Your Document Needs
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Covers all the legally-required sections — auto-tailored to your business type.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "GDPR & CCPA compliant language",
              "Cookie policy section",
              "Data collection disclosures",
              "Third-party sharing clauses",
              "User rights & opt-out",
              "Limitation of liability",
              "Intellectual property rights",
              "Payment & refund terms",
              "Age restriction clauses",
              "Governing law & jurisdiction",
              "Dispute resolution terms",
              "Contact & legal notices",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Perfect For</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {[
            { emoji: "🛍️", title: "Shopify Stores", desc: "Required for all Shopify merchants" },
            { emoji: "📱", title: "Mobile Apps", desc: "App Store & Play Store compliant" },
            { emoji: "💻", title: "SaaS Products", desc: "Covers user accounts & data" },
            { emoji: "🌐", title: "Websites & Blogs", desc: "Required if you collect any data" },
          ].map((item) => (
            <div key={item.title} className="text-center p-6 rounded-2xl border border-gray-100 hover:border-brand-200 hover:bg-brand-50/30 transition-colors">
              <div className="text-4xl mb-3">{item.emoji}</div>
              <div className="font-bold text-gray-900 mb-1">{item.title}</div>
              <div className="text-sm text-gray-500">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 py-20" id="pricing">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Simple, One-Time Pricing</h2>
          <p className="text-center text-gray-500 mb-12">No subscriptions. No renewals. Pay once, own it forever.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Privacy Policy */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
              <Shield className="w-8 h-8 text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Privacy Policy</h3>
              <div className="text-4xl font-extrabold text-gray-900 mb-1">$9.99</div>
              <div className="text-gray-400 text-sm mb-6">one-time</div>
              <ul className="text-sm text-gray-600 text-left space-y-2 mb-8">
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> GDPR & CCPA language</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> Cookie disclosures</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> Data rights section</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> PDF + HTML download</li>
              </ul>
              <Link href="/generate?doc=privacy" className="block w-full bg-brand-600 text-white py-3 rounded-xl font-semibold hover:bg-brand-700 transition-colors">
                Generate Now
              </Link>
            </div>

            {/* Bundle — Featured */}
            <div className="bg-brand-600 rounded-2xl p-8 text-center relative shadow-xl shadow-brand-100">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full">
                BEST VALUE
              </div>
              <DollarSign className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Both Documents</h3>
              <div className="text-4xl font-extrabold text-white mb-1">$14.99</div>
              <div className="text-brand-200 text-sm mb-1">one-time</div>
              <div className="text-brand-200 text-xs mb-6">Save $5 vs buying separate</div>
              <ul className="text-sm text-brand-100 text-left space-y-2 mb-8">
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-white flex-shrink-0 mt-0.5" /> Privacy Policy</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-white flex-shrink-0 mt-0.5" /> Terms of Service</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-white flex-shrink-0 mt-0.5" /> PDF + HTML downloads</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-white flex-shrink-0 mt-0.5" /> Full legal coverage</li>
              </ul>
              <Link href="/generate?doc=bundle" className="block w-full bg-white text-brand-700 py-3 rounded-xl font-bold hover:bg-brand-50 transition-colors">
                Get Both — $14.99
              </Link>
            </div>

            {/* Terms of Service */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
              <FileText className="w-8 h-8 text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Terms of Service</h3>
              <div className="text-4xl font-extrabold text-gray-900 mb-1">$9.99</div>
              <div className="text-gray-400 text-sm mb-6">one-time</div>
              <ul className="text-sm text-gray-600 text-left space-y-2 mb-8">
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> User agreements</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> Liability limitations</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> IP & content rights</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> PDF + HTML download</li>
              </ul>
              <Link href="/generate?doc=tos" className="block w-full bg-brand-600 text-white py-3 rounded-xl font-semibold hover:bg-brand-700 transition-colors">
                Generate Now
              </Link>
            </div>
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            Not legal advice. Documents are for informational purposes and should be reviewed by a qualified attorney for your specific situation.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "Is this real legal protection?",
              a: "These documents are professionally structured and cover all standard clauses. They're not a substitute for legal counsel for complex situations, but they satisfy the requirements for the vast majority of websites, apps, and online stores.",
            },
            {
              q: "What's the difference from free generators?",
              a: "Free generators give you generic, one-size-fits-all documents. Ours ask specific questions about your business and generate tailored language — covering your actual data practices, jurisdiction, and business type.",
            },
            {
              q: "Does this cover GDPR and CCPA?",
              a: "Yes. If you select EU or California as your jurisdiction, your document will include the required language for GDPR (EU users) and CCPA (California users) compliance.",
            },
            {
              q: "How do I add it to my site?",
              a: "After purchase you can download a PDF or copy the full HTML. Paste the HTML into a new page on your website, Shopify store, or app's legal section.",
            },
            {
              q: "What if I need to update it later?",
              a: "Simply come back and generate a new document. You only pay when you download, so updates cost $9.99 per document — cheaper than most alternatives.",
            },
          ].map((item) => (
            <div key={item.q} className="border border-gray-100 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">{item.q}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-600 py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Generate Your Documents in 5 Minutes
          </h2>
          <p className="text-brand-200 mb-8">
            Preview for free. Pay $9.99 only when you're ready to download.
          </p>
          <Link
            href="/generate"
            className="inline-block bg-white text-brand-700 px-10 py-4 rounded-xl text-lg font-bold hover:bg-brand-50 transition-colors"
          >
            Start Free Preview →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2 font-semibold text-gray-700">
            <Shield className="w-4 h-4 text-brand-600" /> PolicyGen
          </div>
          <p>Not legal advice. For informational purposes only.</p>
          <p>© {new Date().getFullYear()} PolicyGen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
