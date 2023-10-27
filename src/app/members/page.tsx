import Image from "next/image";

export default function MemberPage() {
  return (
    <div className="grid col-auto place-content-center">
      <p className="pt-12">You are a member!</p>
      <Image
        src="/Clerk-Image.png"
        alt="Clerk Logo"
        width={60}
        height={60}
        className="place-self-center"
      />
    </div>
  );
}
