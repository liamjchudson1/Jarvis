export type DocType = "privacy" | "tos" | "bundle";

export interface BusinessInfo {
  // Step 1 - Business basics
  businessName: string;
  websiteUrl: string;
  businessType: "website" | "ecommerce" | "shopify" | "app" | "saas" | "blog";
  docType: DocType;

  // Step 2 - Data collection
  dataCollected: string[];          // email, name, phone, address, payment, location, usage, cookies
  collectsPayments: boolean;
  sellsProducts: "physical" | "digital" | "both" | "none";

  // Step 3 - Data practices
  usesCookies: boolean;
  sharesWithThirdParties: boolean;
  thirdPartyServices: string[];     // google_analytics, facebook_pixel, mailchimp, stripe, paypal, etc.

  // Step 4 - Jurisdiction & legal
  jurisdiction: "us" | "eu" | "uk" | "ca" | "au" | "other";
  usState?: string;
  ageRestriction: "all" | "13plus" | "18plus";
  allowsUserContent: boolean;

  // Step 5 - Contact
  contactEmail: string;
  companyAddress?: string;

  // Effective date
  effectiveDate: string;
}

export const defaultBusinessInfo: BusinessInfo = {
  businessName: "",
  websiteUrl: "",
  businessType: "website",
  docType: "bundle",
  dataCollected: ["email"],
  collectsPayments: false,
  sellsProducts: "none",
  usesCookies: true,
  sharesWithThirdParties: false,
  thirdPartyServices: [],
  jurisdiction: "us",
  ageRestriction: "all",
  allowsUserContent: false,
  contactEmail: "",
  companyAddress: "",
  effectiveDate: new Date().toISOString().split("T")[0],
};
