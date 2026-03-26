"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { Shield, FileText, Lock, ArrowLeft, Download } from "lucide-react";
import { BusinessInfo } from "@/lib/types";
import { generatePrivacyPolicy } from "@/lib/generatePrivacyPolicy";
import { generateToS } from "@/lib/generateToS";

const DOC_PRICE: Record<string, string> = {
  privacy: "$9.99",
  tos: "$9.99",
  bundle: "$14.99",
};

const DOC_LABEL: Record<string, string> = {
  privacy: "Privacy Policy",
  tos: "Terms of Service",
  bundle: "Both Documents",
};

function PreviewContent() {
  const searchParams = useSearchParams();
  const encodedData = searchParams.get("data") || "";
  const [activeTab, setActiveTab] = useState<"privacy" | "tos">("privacy");
  const [loading, setLoading] = useState(false);

  const info = useMemo<BusinessInfo | null>(() => {
    try {
      return JSON.parse(atob(encodedData)) as BusinessInfo;
    } catch {
      return null;
    }
  }, [encodedData]);

  const privacyHtml = useMemo(() => (info ? generatePrivacyPolicy(info) : ""), [info]);
  const tosHtml = useMemo(() => (info ? generateToS(info) : ""), [info]);

  const handleCheckout = async () => {
    if (!info) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docType: info.docType, encodedData }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to start checkout. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Invalid preview link.</p>
          <Link href="/generate" className="text-brand-600 underline">Start over</Link>
        </div>
      </div>
    );
  }

  const showBoth = info.docType === "bundle";
  const showPrivacy = showBoth || info.docType === "privacy";
  const showTos = showBoth || info.docType === "tos";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/generate" className="text-gray-400 hover:text-gray-600">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="font-bold text-brand-600 flex items-center gap-2">
              <Shield className="w-5 h-5" /> PolicyGen
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-sm text-gray-500">
              Preview for <strong>{info.businessName}</strong>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="flex items-center gap-2 bg-brand-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-brand-700 transition-colors disabled:opacity-50 text-sm"
            >
              <Download className="w-4 h-4" />
              {loading ? "Loading…" : `Unlock & Download — ${DOC_PRICE[info.docType]}`}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Purchase card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 text-green-600 mb-3">
                <Lock className="w-4 h-4" />
                <span className="text-sm font-semibold">Free Preview</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{DOC_LABEL[info.docType]}</h3>
              <div className="text-3xl font-extrabold text-gray-900 mb-1">{DOC_PRICE[info.docType]}</div>
              <p className="text-xs text-gray-400 mb-4">One-time payment. No subscription.</p>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-brand-600 text-white py-3 rounded-xl font-bold hover:bg-brand-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Loading…" : "Pay & Download"}
              </button>
              <div className="flex items-center gap-1.5 justify-center mt-3 text-xs text-gray-400">
                <Lock className="w-3 h-3" />
                Secure payment via Stripe
              </div>
            </div>

            {/* What's included */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">What you get:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {showPrivacy && <li className="flex gap-2"><Shield className="w-4 h-4 text-brand-600 flex-shrink-0" /> Privacy Policy (HTML + PDF)</li>}
                {showTos && <li className="flex gap-2"><FileText className="w-4 h-4 text-brand-600 flex-shrink-0" /> Terms of Service (HTML + PDF)</li>}
                <li className="flex gap-2">✓ Customized for {info.businessName}</li>
                <li className="flex gap-2">✓ {info.jurisdiction === "eu" ? "GDPR compliant" : info.jurisdiction === "us" ? "CCPA compliant" : "Jurisdiction-appropriate"} language</li>
                <li className="flex gap-2">✓ Instant download after payment</li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 rounded-xl p-4 text-xs text-amber-700">
              <strong>Not legal advice.</strong> This document is generated for informational purposes. Consult a qualified attorney for legal guidance specific to your situation.
            </div>
          </div>

          {/* Document preview */}
          <div className="lg:col-span-2">
            {showBoth && (
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setActiveTab("privacy")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                    activeTab === "privacy"
                      ? "bg-brand-600 text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <Shield className="w-4 h-4" /> Privacy Policy
                </button>
                <button
                  onClick={() => setActiveTab("tos")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                    activeTab === "tos"
                      ? "bg-brand-600 text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <FileText className="w-4 h-4" /> Terms of Service
                </button>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative">
              {/* Blur overlay on bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent z-10 flex items-end justify-center pb-8">
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="flex items-center gap-2 bg-brand-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-lg disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  {loading ? "Loading…" : `Unlock Full Document — ${DOC_PRICE[info.docType]}`}
                </button>
              </div>

              <div
                className="p-8 prose prose-sm max-w-none overflow-hidden max-h-[600px]"
                style={{ WebkitMaskImage: "none" }}
                dangerouslySetInnerHTML={{
                  __html: (!showBoth || activeTab === "privacy") ? privacyHtml : tosHtml,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense>
      <PreviewContent />
    </Suspense>
  );
}
