import Image from "next/image";

export default function MemberPage() {
  return (
    <span className="flex justify-center pt-32">
      You are a member!
      <Image src="/Clerk-Image.png" alt="Clerk Logo" width={25} height={25} />
    </span>
  );
}
