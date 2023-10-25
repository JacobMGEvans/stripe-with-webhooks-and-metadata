"use client";

import { SignIn, UserButton, useAuth } from "@clerk/nextjs";
import CheckoutButton from "../components/stripe-payment";

async function stripeWebhook() {
  await fetch("/api/stripe-webhook");
}

export default function Home() {
  const { isSignedIn } = useAuth();

  return (
    <main>
      {!isSignedIn ? (
        <div
          style={{
            marginTop: "1rem",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SignIn redirectUrl="/" />
        </div>
      ) : (
        <>
          <header className="flex justify-end p-5 pr-10">
            <UserButton />
          </header>
          <div
            style={{
              marginTop: "1rem",
              width: "100%",
              textAlign: "center",
            }}
          >
            You are signed in!
          </div>
          <div
            style={{
              marginTop: "1rem",
              width: "100%",
              textAlign: "center",
            }}
          >
            <CheckoutButton />
          </div>
        </>
      )}
    </main>
  );
}
