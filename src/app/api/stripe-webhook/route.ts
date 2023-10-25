import { auth, clerkClient } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  debugger;
  const { userId } = auth();
  if (userId === null || req === null)
    throw new Error(`Missing userId or request`, { cause: { userId, req } });

  const stripeSignature = req.headers.get("stripe-signature");
  const json = await req.json();
  const buffer = Buffer.from(JSON.stringify(json));

  if (stripeSignature === null) throw new Error("stripeSignature is null");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      buffer.toString(),
      stripeSignature,
      webhookSecret
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 400,
        }
      );
  }

  if (event === undefined) throw new Error(`event is undefined`);

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      console.log(`Payment successful for session ID: ${session.id}`);
      clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: {
          stripe: {
            status: session.status,
            payment: session.payment_status,
          },
        },
      });

      break;
    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  NextResponse.json({ status: 200, message: "success" });
}
