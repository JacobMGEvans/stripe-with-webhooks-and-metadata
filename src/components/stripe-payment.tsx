import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function CheckoutButton() {
  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        return;
      }

      const { sessionId } = await (
        await fetch("/api/stripe-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: 1,
            unit_amount: 10,
          }),
        })
      ).json();
      debugger;
      await stripe.redirectToCheckout({
        sessionId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col items-center ">
      <button
        onClick={handleCheckout}
        className="flex bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-4 rounded"
      >
        <Image src="/Clerk-Image.png" alt="Clerk Logo" width={20} height={20} />
        <span className="ml-2">Purchase Membership</span>
      </button>
    </section>
  );
}
