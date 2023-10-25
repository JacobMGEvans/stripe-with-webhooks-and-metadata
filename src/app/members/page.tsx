import Image from "next/image";

export default function MemberPage() {
  return (
    <div>
      You are a member!
      <Image src="/Clerk-Image.png" alt="Clerk Logo" width={20} height={20} />
    </div>
  );
}
