"use client";

import { SignIn, useAuth } from "@clerk/nextjs";
import CheckoutButton from "../components/stripe-payment";

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
        <div>
          <div className="flex justify-center pt-12">You are signed in!</div>
          <div className="grid justify-center mt-4 w-full col-auto gap-2">
            <CheckoutButton />
            <a
              className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-2 rounded"
              href="/members"
            >
              Go to members page
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
