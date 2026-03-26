import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const PRICES: Record<string, number> = {
  privacy: 999,   // $9.99
  tos: 999,       // $9.99
  bundle: 1499,   // $14.99
};

const NAMES: Record<string, string> = {
  privacy: "Privacy Policy",
  tos: "Terms of Service",
  bundle: "Privacy Policy + Terms of Service Bundle",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { docType, encodedData } = body;

    if (!docType || !PRICES[docType]) {
      return NextResponse.json({ error: "Invalid document type" }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: NAMES[docType],
              description: "Professionally structured legal document for your website or app. Download as PDF or HTML after purchase.",
            },
            unit_amount: PRICES[docType],
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}&data=${encodeURIComponent(encodedData)}`,
      cancel_url: `${appUrl}/preview?data=${encodeURIComponent(encodedData)}`,
      metadata: {
        docType,
        encodedData: encodedData.substring(0, 500), // Stripe metadata limit
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
