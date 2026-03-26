import { BusinessInfo } from "./types";

const DATA_LABELS: Record<string, string> = {
  email: "email addresses",
  name: "full names",
  phone: "phone numbers",
  address: "mailing addresses",
  payment: "payment and billing information",
  location: "location data and IP addresses",
  usage: "usage and behavioral data",
  cookies: "cookies and similar tracking technologies",
};

const JURISDICTION_LABEL: Record<string, string> = {
  us: "the United States",
  eu: "the European Union",
  uk: "the United Kingdom",
  ca: "Canada",
  au: "Australia",
  other: "applicable jurisdictions",
};

const THIRD_PARTY_LABELS: Record<string, string> = {
  google_analytics: "Google Analytics (Google LLC) — website analytics",
  facebook_pixel: "Facebook Pixel (Meta Platforms, Inc.) — advertising",
  mailchimp: "Mailchimp (Intuit Inc.) — email marketing",
  stripe: "Stripe, Inc. — payment processing",
  paypal: "PayPal Holdings, Inc. — payment processing",
  shopify_payments: "Shopify Payments (Shopify Inc.) — payment processing",
  hotjar: "Hotjar Ltd. — behavior analytics and heatmaps",
  intercom: "Intercom, Inc. — customer messaging",
};

export function generatePrivacyPolicy(info: BusinessInfo): string {
  const effectiveDate = new Date(info.effectiveDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dataList = info.dataCollected.map((d) => DATA_LABELS[d] || d).join(", ");
  const jurisdiction = JURISDICTION_LABEL[info.jurisdiction] || "applicable jurisdictions";
  const hasThirdParties = info.thirdPartyServices.length > 0;
  const thirdPartyList = info.thirdPartyServices.map((s) => THIRD_PARTY_LABELS[s] || s);

  return `
<div class="policy-document">

<h1>Privacy Policy</h1>
<p><strong>Effective Date:</strong> ${effectiveDate}<br />
<strong>Last Updated:</strong> ${effectiveDate}</p>

<h2>1. Introduction</h2>
<p>Welcome to <strong>${info.businessName}</strong> ("we," "us," or "our"). We operate the website ${info.websiteUrl} (the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit or use our Service. Please read this policy carefully. If you disagree with its terms, please discontinue use of the Service.</p>

<h2>2. Information We Collect</h2>
<p>We may collect the following categories of personal information:</p>
<ul>
  ${info.dataCollected.map((d) => `<li><strong>${DATA_LABELS[d] || d}</strong></li>`).join("\n  ")}
</ul>
<p>This information is collected when you ${info.businessType === "ecommerce" || info.businessType === "shopify" ? "make a purchase," : ""} register for an account, subscribe to our newsletter, fill out a contact form, or otherwise interact with our Service.</p>

${
  info.dataCollected.includes("usage")
    ? `<h2>3. Automatically Collected Information</h2>
<p>When you visit our Service, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies installed on your device. Additionally, as you browse our Service, we collect information about the individual web pages you view, what websites or search terms referred you to our Service, and how you interact with the Service.</p>`
    : ""
}

<h2>${info.dataCollected.includes("usage") ? "4" : "3"}. How We Use Your Information</h2>
<p>We use the information we collect to:</p>
<ul>
  <li>Provide, operate, and improve our Service</li>
  <li>Process transactions and send related information${info.sellsProducts !== "none" ? ", including purchase confirmations and invoices" : ""}</li>
  <li>Send administrative information such as updates, security alerts, and support messages</li>
  ${info.dataCollected.includes("email") ? "<li>Send marketing and promotional communications (you may opt out at any time)</li>" : ""}
  <li>Respond to your comments and questions and provide customer service</li>
  <li>Monitor and analyze usage and trends to improve your experience with the Service</li>
  <li>Detect, prevent, and address technical issues and fraudulent activity</li>
  <li>Comply with applicable laws and legal obligations</li>
</ul>

<h2>${info.dataCollected.includes("usage") ? "5" : "4"}. Cookies and Tracking Technologies</h2>
${
  info.usesCookies
    ? `<p>We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our Service may not function properly.</p>
<p>We use the following types of cookies:</p>
<ul>
  <li><strong>Essential Cookies:</strong> Required for the Service to function and cannot be switched off.</li>
  <li><strong>Performance Cookies:</strong> Allow us to count visits and traffic sources to measure and improve performance.</li>
  <li><strong>Functional Cookies:</strong> Enable enhanced functionality and personalization.</li>
  ${info.thirdPartyServices.includes("google_analytics") || info.thirdPartyServices.includes("facebook_pixel") || info.thirdPartyServices.includes("hotjar") ? "<li><strong>Targeting/Advertising Cookies:</strong> May be set through our site by our advertising partners.</li>" : ""}
</ul>`
    : `<p>Our Service does not use cookies or similar tracking technologies.</p>`
}

<h2>${info.dataCollected.includes("usage") ? "6" : "5"}. Disclosure of Your Information</h2>
<p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
<ul>
  <li><strong>Service Providers:</strong> We may share your information with third-party vendors who perform services on our behalf.</li>
  ${info.collectsPayments || info.sellsProducts !== "none" ? "<li><strong>Payment Processors:</strong> We use secure third-party payment processors and do not store your full payment card details.</li>" : ""}
  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred.</li>
  <li><strong>Legal Obligations:</strong> We may disclose your information to comply with applicable laws, regulations, or legal process.</li>
  <li><strong>Protection of Rights:</strong> We may disclose information to protect the rights, property, or safety of ${info.businessName}, our users, or others.</li>
</ul>

${
  hasThirdParties
    ? `<h2>${info.dataCollected.includes("usage") ? "7" : "6"}. Third-Party Services</h2>
<p>We use the following third-party services that may collect your information:</p>
<ul>
  ${thirdPartyList.map((s) => `<li>${s}</li>`).join("\n  ")}
</ul>
<p>Each of these services has its own privacy policy governing the use of your information. We encourage you to review their privacy policies.</p>`
    : ""
}

<h2>${(info.dataCollected.includes("usage") ? 7 : 6) + (hasThirdParties ? 1 : 0)}. Data Retention</h2>
<p>We retain your personal information only for as long as necessary to fulfill the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we securely delete or anonymize it.</p>

<h2>${(info.dataCollected.includes("usage") ? 7 : 6) + (hasThirdParties ? 1 : 0) + 1}. Data Security</h2>
<p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>

${
  info.jurisdiction === "eu"
    ? `<h2>${(info.dataCollected.includes("usage") ? 7 : 6) + (hasThirdParties ? 1 : 0) + 2}. Your Rights Under GDPR</h2>
<p>If you are located in the European Economic Area (EEA), you have the following data protection rights:</p>
<ul>
  <li><strong>Right of Access:</strong> You have the right to request copies of your personal data.</li>
  <li><strong>Right to Rectification:</strong> You have the right to request that we correct inaccurate or incomplete information.</li>
  <li><strong>Right to Erasure:</strong> You have the right to request that we delete your personal data under certain conditions.</li>
  <li><strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data.</li>
  <li><strong>Right to Data Portability:</strong> You have the right to request that we transfer your data to another organization or directly to you.</li>
  <li><strong>Right to Object:</strong> You have the right to object to our processing of your personal data.</li>
</ul>
<p>To exercise any of these rights, please contact us at ${info.contactEmail}. We will respond to your request within 30 days.</p>`
    : ""
}

${
  info.jurisdiction === "us"
    ? `<h2>${(info.dataCollected.includes("usage") ? 7 : 6) + (hasThirdParties ? 1 : 0) + 2}. California Privacy Rights (CCPA)</h2>
<p>If you are a California resident, you have specific rights regarding your personal information under the California Consumer Privacy Act (CCPA):</p>
<ul>
  <li><strong>Right to Know:</strong> You have the right to request that we disclose what personal information we collect, use, disclose, and sell.</li>
  <li><strong>Right to Delete:</strong> You have the right to request deletion of your personal information, subject to certain exceptions.</li>
  <li><strong>Right to Opt-Out:</strong> You have the right to opt-out of the sale of your personal information. We do not sell personal information.</li>
  <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your CCPA rights.</li>
</ul>
<p>To exercise your California privacy rights, please contact us at ${info.contactEmail}.</p>`
    : ""
}

<h2>Children's Privacy</h2>
${
  info.ageRestriction === "18plus"
    ? `<p>Our Service is intended for users who are 18 years of age or older. We do not knowingly collect personal information from anyone under 18 years of age. If you are under 18, please do not use or provide any information on our Service. If we learn we have collected personal information from a child under 18 without parental consent, we will delete that information immediately.</p>`
    : info.ageRestriction === "13plus"
    ? `<p>Our Service is not directed to children under 13 years of age. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at ${info.contactEmail}.</p>`
    : `<p>Our Service is not directed to children under 13 years of age. We do not knowingly collect personally identifiable information from children under 13. If we discover that a child under 13 has provided us with personal information, we will promptly delete it from our systems.</p>`
}

<h2>Changes to This Privacy Policy</h2>
<p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically for any changes. Your continued use of the Service after any modifications constitutes your acceptance of the new Privacy Policy.</p>

<h2>Contact Us</h2>
<p>If you have any questions about this Privacy Policy or our privacy practices, please contact us at:</p>
<p>
  <strong>${info.businessName}</strong><br />
  Email: <a href="mailto:${info.contactEmail}">${info.contactEmail}</a><br />
  ${info.companyAddress ? `Address: ${info.companyAddress}<br />` : ""}
  Website: <a href="${info.websiteUrl}">${info.websiteUrl}</a>
</p>

<p><em>This document was generated by PolicyGen. It is intended for informational purposes only and does not constitute legal advice. We recommend consulting a qualified attorney for your specific legal situation.</em></p>

</div>
  `.trim();
}
