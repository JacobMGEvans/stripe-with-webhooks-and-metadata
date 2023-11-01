import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="w-full h-[calc(100vh-80px)] flex justify-center items-center">
      <SignIn />
    </div>
  )
}
