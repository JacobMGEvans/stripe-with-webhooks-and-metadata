'use client'

import * as React from 'react'
import { SignUp } from "@clerk/nextjs";

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault;
}

export default function SignUpPage() {
  const [lang, setLang] = React.useState('')
  return (
    <div className="w-full h-[calc(100vh-80px)] flex justify-center items-center">
      <div className="flex flex-row ">
        <div className="bg-[#ffffff] text-black z-50 rounded-l-2xl pt-28 pb-12 px-8 w-96">
          <h1 className="text-2xl font-bold mb-3">Programming Camp!</h1>
          <p className="mb-4">Choose you language to get started with Programming Camp today!</p>
          <form onSubmit={(e) => handleSubmit(e)}>

            <ul>
              <li>
                <label>
                  <input type="radio" name="lang" className="mr-3 text-xl" onChange={() => setLang('ts')} value="ts" checked={lang === "ts"} />
                  TypeScript
                </label>
              </li>
              <li>
                <label>
                  <input type="radio" name="lang" className="mr-3 text-xl" onChange={() => setLang('go')} value="go" checked={lang === "go"} />
                  Go Lang
                </label>
              </li>
              <li>
                <label>
                  <input type="radio" name="lang" className="mr-3 text-xl" onChange={() => setLang('rust')} value="rust" checked={lang === "rust"} />
                  Rust
                </label>

              </li>
            </ul>
          </form>
        </div>

        <SignUp appearance={{
          elements: {
            card: "ml-0 rounded-l-none"
          }
        }}
        />
      </div>
    </div>
  )
}
