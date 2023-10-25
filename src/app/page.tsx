"use client";

import { SignIn, UserButton, useAuth } from "@clerk/nextjs";
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
        <>
          <header className="flex justify-end p-5 pr-10">
            <UserButton />
          </header>
          <div className="flex justify-center">You are signed in!</div>
          <div className="grid justify-center mt-4 w-full col-auto gap-2">
            <CheckoutButton />
            <a
              className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-1 rounded"
              href="/members"
            >
              Go to members page
            </a>
          </div>
        </>
      )}
    </main>
  );
}
