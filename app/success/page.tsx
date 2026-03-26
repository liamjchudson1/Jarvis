"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { Shield, Download, CheckCircle, FileText, Copy, Check } from "lucide-react";
import { BusinessInfo } from "@/lib/types";
import { generatePrivacyPolicy } from "@/lib/generatePrivacyPolicy";
import { generateToS } from "@/lib/generateToS";

function downloadHtml(filename: string, htmlContent: string, businessName: string) {
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${filename} — ${businessName}</title>
  <style>
    body { font-family: Georgia, serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a; line-height: 1.7; }
    h1 { font-size: 28px; margin-bottom: 8px; }
    h2 { font-size: 20px; margin-top: 32px; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 6px; }
    h3 { font-size: 16px; margin-top: 20px; }
    p, li { font-size: 15px; }
    ul { padding-left: 24px; }
    a { color: #3b55e6; }
    em { font-size: 13px; color: #666; display: block; margin-top: 40px; padding-top: 16px; border-top: 1px solid #eee; }
  </style>
</head>
<body>
${htmlContent}
</body>
</html>`;

  const blob = new Blob([fullHtml], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename.toLowerCase().replace(/\s+/g, "-")}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function downloadPdf(filename: string, htmlContent: string, businessName: string) {
  // Dynamic import to avoid SSR issues
  const { default: jsPDF } = await import("jspdf");
  const { default: html2canvas } = await import("html2canvas");

  // Create a hidden container
  const container = document.createElement("div");
  container.style.cssText = `
    position: fixed; top: -9999px; left: -9999px; width: 800px;
    font-family: Georgia, serif; padding: 40px; color: #1a1a1a; line-height: 1.7;
    background: white;
  `;
  container.innerHTML = `
    <style>
      h1 { font-size: 24px; margin-bottom: 8px; }
      h2 { font-size: 18px; margin-top: 28px; border-bottom: 1px solid #eee; padding-bottom: 4px; }
      p, li { font-size: 13px; }
      ul { padding-left: 20px; }
      a { color: #3b55e6; }
    </style>
    ${htmlContent}
  `;
  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, { scale: 1.5, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${filename.toLowerCase().replace(/\s+/g, "-")}.pdf`);
  } finally {
    document.body.removeChild(container);
  }
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const encodedData = searchParams.get("data") || "";
  const [copiedPrivacy, setCopiedPrivacy] = useState(false);
  const [copiedTos, setCopiedTos] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState<string | null>(null);

  const info = useMemo<BusinessInfo | null>(() => {
    try {
      return JSON.parse(atob(encodedData)) as BusinessInfo;
    } catch {
      return null;
    }
  }, [encodedData]);

  const privacyHtml = useMemo(() => (info ? generatePrivacyPolicy(info) : ""), [info]);
  const tosHtml = useMemo(() => (info ? generateToS(info) : ""), [info]);

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Could not load your documents. Please contact support.</p>
          <Link href="/" className="text-brand-600 underline">Go home</Link>
        </div>
      </div>
    );
  }

  const showPrivacy = info.docType === "privacy" || info.docType === "bundle";
  const showTos = info.docType === "tos" || info.docType === "bundle";

  const copyToClipboard = async (html: string, type: "privacy" | "tos") => {
    await navigator.clipboard.writeText(html);
    if (type === "privacy") {
      setCopiedPrivacy(true);
      setTimeout(() => setCopiedPrivacy(false), 2000);
    } else {
      setCopiedTos(true);
      setTimeout(() => setCopiedTos(false), 2000);
    }
  };

  const handlePdfDownload = async (filename: string, html: string) => {
    setDownloadingPdf(filename);
    try {
      await downloadPdf(filename, html, info.businessName);
    } catch (e) {
      console.error(e);
      alert("PDF generation failed. Try downloading as HTML instead.");
    } finally {
      setDownloadingPdf(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-brand-600">
            <Shield className="w-5 h-5" /> PolicyGen
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Success header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-500">
            Your documents for <strong>{info.businessName}</strong> are ready to download.
          </p>
        </div>

        {/* Document cards */}
        <div className="space-y-6">
          {showPrivacy && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Privacy Policy</h2>
                    <p className="text-xs text-gray-400">For {info.businessName} — {info.websiteUrl}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(privacyHtml, "privacy")}
                    className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    {copiedPrivacy ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    {copiedPrivacy ? "Copied!" : "Copy HTML"}
                  </button>
                  <button
                    onClick={() => downloadHtml("Privacy Policy", privacyHtml, info.businessName)}
                    className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <FileText className="w-4 h-4" /> HTML
                  </button>
                  <button
                    onClick={() => handlePdfDownload("Privacy Policy", privacyHtml)}
                    disabled={downloadingPdf === "Privacy Policy"}
                    className="flex items-center gap-1.5 px-3 py-2 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700 transition-colors disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    {downloadingPdf === "Privacy Policy" ? "Generating…" : "PDF"}
                  </button>
                </div>
              </div>
              <div
                className="p-8 prose prose-sm max-w-none max-h-80 overflow-y-auto text-gray-700"
                dangerouslySetInnerHTML={{ __html: privacyHtml }}
              />
            </div>
          )}

          {showTos && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Terms of Service</h2>
                    <p className="text-xs text-gray-400">For {info.businessName} — {info.websiteUrl}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(tosHtml, "tos")}
                    className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    {copiedTos ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    {copiedTos ? "Copied!" : "Copy HTML"}
                  </button>
                  <button
                    onClick={() => downloadHtml("Terms of Service", tosHtml, info.businessName)}
                    className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <FileText className="w-4 h-4" /> HTML
                  </button>
                  <button
                    onClick={() => handlePdfDownload("Terms of Service", tosHtml)}
                    disabled={downloadingPdf === "Terms of Service"}
                    className="flex items-center gap-1.5 px-3 py-2 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700 transition-colors disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    {downloadingPdf === "Terms of Service" ? "Generating…" : "PDF"}
                  </button>
                </div>
              </div>
              <div
                className="p-8 prose prose-sm max-w-none max-h-80 overflow-y-auto text-gray-700"
                dangerouslySetInnerHTML={{ __html: tosHtml }}
              />
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-3">How to add this to your website</h3>
          <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
            <li>Click <strong>HTML</strong> to download the file, or <strong>Copy HTML</strong> to copy the raw content</li>
            <li>In your website builder (WordPress, Squarespace, Webflow, Shopify), create a new page titled "Privacy Policy" or "Terms of Service"</li>
            <li>Switch to HTML/code view and paste the content</li>
            <li>Save and publish the page</li>
            <li>Add a link to the page in your website footer</li>
          </ol>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {info.docType !== "bundle" && (
            <Link
              href={`/generate?doc=${info.docType === "privacy" ? "tos" : "privacy"}`}
              className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Generate {info.docType === "privacy" ? "Terms of Service" : "Privacy Policy"} — $9.99
            </Link>
          )}
          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 text-sm"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
