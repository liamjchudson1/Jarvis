import { BusinessInfo } from "./types";

const JURISDICTION_LABEL: Record<string, string> = {
  us: "the State of Delaware, United States",
  eu: "the laws of the European Union",
  uk: "England and Wales",
  ca: "the Province of Ontario, Canada",
  au: "the State of New South Wales, Australia",
  other: "applicable law",
};

export function generateToS(info: BusinessInfo): string {
  const effectiveDate = new Date(info.effectiveDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const jurisdiction = JURISDICTION_LABEL[info.jurisdiction] || "applicable law";
  const sellsProducts = info.sellsProducts !== "none";
  const isEcommerce =
    info.businessType === "ecommerce" ||
    info.businessType === "shopify" ||
    sellsProducts;

  return `
<div class="policy-document">

<h1>Terms of Service</h1>
<p><strong>Effective Date:</strong> ${effectiveDate}<br />
<strong>Last Updated:</strong> ${effectiveDate}</p>

<h2>1. Agreement to Terms</h2>
<p>These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and <strong>${info.businessName}</strong> ("Company," "we," "us," or "our") concerning your access to and use of the website ${info.websiteUrl} (the "Service").</p>
<p>By accessing or using the Service, you confirm that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must immediately discontinue use of the Service.</p>

<h2>2. Eligibility</h2>
${
  info.ageRestriction === "18plus"
    ? `<p>You must be at least 18 years of age to use this Service. By using the Service, you represent and warrant that you are 18 years of age or older and have the legal capacity to enter into these Terms. If you are under 18, you are not permitted to use the Service.</p>`
    : info.ageRestriction === "13plus"
    ? `<p>You must be at least 13 years of age to use this Service. If you are under 13, you may not use the Service. If you are between 13 and 18, you represent that a parent or legal guardian has reviewed and agreed to these Terms on your behalf.</p>`
    : `<p>By using the Service, you represent and warrant that you are at least 13 years of age and have the legal capacity to enter into these Terms. Users under 13 are not permitted to use the Service.</p>`
}

<h2>3. Changes to Terms</h2>
<p>We reserve the right to modify or replace these Terms at any time at our sole discretion. We will provide notice of any significant changes by updating the "Last Updated" date at the top of this page. Your continued use of the Service after any changes constitutes your acceptance of the new Terms. We encourage you to review these Terms periodically.</p>

<h2>4. Permitted Use</h2>
<p>Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Service for your personal${info.businessType === "saas" ? " or business" : ""} use.</p>
<p>You agree not to:</p>
<ul>
  <li>Use the Service for any unlawful purpose or in violation of any applicable laws or regulations</li>
  <li>Attempt to gain unauthorized access to any portion of the Service or its related systems</li>
  <li>Use any automated means (bots, scrapers, crawlers) to access the Service without our written consent</li>
  <li>Transmit any harmful, offensive, defamatory, or otherwise objectionable content</li>
  <li>Interfere with or disrupt the integrity or performance of the Service</li>
  <li>Attempt to reverse engineer, decompile, or disassemble any portion of the Service</li>
  <li>Use the Service to send unsolicited communications (spam)</li>
  <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
</ul>

<h2>5. Intellectual Property</h2>
<p>The Service and all of its contents, features, and functionality — including but not limited to text, graphics, logos, images, audio clips, video clips, data compilations, and software — are owned by ${info.businessName} or its licensors and are protected by applicable intellectual property laws.</p>
<p>You are granted a limited license to access and use the Service. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Service without prior written consent from ${info.businessName}.</p>

${
  info.allowsUserContent
    ? `<h2>6. User-Submitted Content</h2>
<p>Our Service may allow you to submit, post, or share content including reviews, comments, photos, or other materials ("User Content"). By submitting User Content, you:</p>
<ul>
  <li>Grant us a worldwide, non-exclusive, royalty-free, perpetual, irrevocable license to use, reproduce, modify, distribute, and display such content in connection with the Service</li>
  <li>Represent and warrant that you own or have the necessary rights to submit the User Content</li>
  <li>Represent and warrant that the User Content does not infringe any third-party intellectual property rights or violate any applicable laws</li>
</ul>
<p>We reserve the right to remove any User Content at our discretion without notice. We do not endorse any User Content and are not responsible for it.</p>`
    : ""
}

${
  isEcommerce
    ? `<h2>${info.allowsUserContent ? "7" : "6"}. Purchases and Payments</h2>
<p>If you make a purchase through our Service, the following terms apply:</p>
<ul>
  <li>All prices are listed in USD unless otherwise stated</li>
  <li>We reserve the right to change prices at any time without notice</li>
  <li>Payment must be received prior to delivery of ${info.sellsProducts === "digital" ? "digital products" : info.sellsProducts === "physical" ? "physical goods" : "products and services"}</li>
  <li>We use secure, encrypted payment processing. We do not store your payment card information on our servers</li>
  <li>By making a purchase, you represent that you are authorized to use the payment method provided</li>
</ul>
${
  info.sellsProducts === "digital" || info.sellsProducts === "both"
    ? `<h3>Digital Products</h3>
<p>Upon purchase and payment confirmation, digital products will be made available for immediate download or access. All digital product sales are final unless otherwise stated. We do not offer refunds on digital products once they have been downloaded or accessed.</p>`
    : ""
}
${
  info.sellsProducts === "physical" || info.sellsProducts === "both"
    ? `<h3>Physical Products</h3>
<p>Physical products are subject to availability. We reserve the right to limit quantities. Shipping times are estimates and not guaranteed. Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier. Returns and refunds are subject to our Return Policy.</p>`
    : ""
}`
    : ""
}

<h2>${isEcommerce ? (info.allowsUserContent ? "8" : "7") : info.allowsUserContent ? "7" : "6"}. Disclaimers</h2>
<p>THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:</p>
<ul>
  <li>IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT</li>
  <li>WARRANTIES REGARDING THE ACCURACY, RELIABILITY, OR AVAILABILITY OF THE SERVICE</li>
  <li>WARRANTIES THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS</li>
</ul>

<h2>${isEcommerce ? (info.allowsUserContent ? "9" : "8") : info.allowsUserContent ? "8" : "7"}. Limitation of Liability</h2>
<p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ${info.businessName.toUpperCase()}, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:</p>
<ul>
  <li>YOUR ACCESS TO OR USE OF (OR INABILITY TO ACCESS OR USE) THE SERVICE</li>
  <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE</li>
  <li>ANY CONTENT OBTAINED FROM THE SERVICE</li>
  <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT</li>
</ul>
<p>OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE GREATER OF $100 USD OR THE AMOUNT YOU PAID US IN THE TWELVE MONTHS PRECEDING THE CLAIM.</p>

<h2>${isEcommerce ? (info.allowsUserContent ? "10" : "9") : info.allowsUserContent ? "9" : "8"}. Indemnification</h2>
<p>You agree to defend, indemnify, and hold harmless ${info.businessName} and its officers, directors, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Service.</p>

<h2>${isEcommerce ? (info.allowsUserContent ? "11" : "10") : info.allowsUserContent ? "10" : "9"}. Third-Party Links</h2>
<p>The Service may contain links to third-party websites or services that are not owned or controlled by ${info.businessName}. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. We strongly advise you to review the privacy policy and terms of any third-party site you visit.</p>

<h2>${isEcommerce ? (info.allowsUserContent ? "12" : "11") : info.allowsUserContent ? "11" : "10"}. Termination</h2>
<p>We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Service will immediately cease.</p>

<h2>${isEcommerce ? (info.allowsUserContent ? "13" : "12") : info.allowsUserContent ? "12" : "11"}. Governing Law and Dispute Resolution</h2>
<p>These Terms shall be governed by and construed in accordance with the laws of ${jurisdiction}, without regard to its conflict of law provisions.</p>
<p>Any dispute arising out of or in connection with these Terms shall first be subject to good-faith negotiation between the parties. If the dispute cannot be resolved through negotiation within 30 days, the parties agree to binding arbitration or, where arbitration is not permitted, to the exclusive jurisdiction of the courts of ${jurisdiction}.</p>

<h2>${isEcommerce ? (info.allowsUserContent ? "14" : "13") : info.allowsUserContent ? "13" : "12"}. Severability</h2>
<p>If any provision of these Terms is held to be invalid, illegal, or unenforceable, the remaining provisions will continue in full force and effect. The invalid provision will be modified to the minimum extent necessary to make it valid and enforceable.</p>

<h2>${isEcommerce ? (info.allowsUserContent ? "15" : "14") : info.allowsUserContent ? "14" : "13"}. Entire Agreement</h2>
<p>These Terms, together with our Privacy Policy and any other legal notices published by us on the Service, constitute the entire agreement between you and ${info.businessName} concerning the Service and supersede all prior agreements.</p>

<h2>Contact Us</h2>
<p>If you have any questions about these Terms, please contact us at:</p>
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
