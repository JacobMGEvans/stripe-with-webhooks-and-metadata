import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  const { userId } = auth();
  const { unit_amount, quantity } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Membership",
            },
            unit_amount,
          },
          quantity,
        },
      ],
      metadata: {
        userId,
      },
      mode: "payment",
      success_url: `${req.headers.get("origin")}/members`,
      cancel_url: `${req.headers.get("origin")}/`,
    });

    return NextResponse.json({ session }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      throw new Error(
        `Error creating Stripe checkout session: ${error.message}`,
        { cause: error }
      );
  }
}
