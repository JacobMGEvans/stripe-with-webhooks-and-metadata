"use client";

import { SignIn, useAuth } from "@clerk/nextjs";

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
        <div
          style={{
            marginTop: "1rem",
            width: "100%",
            textAlign: "center",
          }}
        >
          You are signed in!
        </div>
      )}
    </main>
  );
}
