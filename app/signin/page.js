"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo =
    searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email এবং Password দিন");
      return;
    }

    try {
      setLoading(true);

      const { error } =
        await authClient.signIn.email({
          email,
          password,
        });

      if (error) {
        toast.error(
          error.message || "Login failed"
        );
        return;
      }

      toast.success("সফলভাবে লগইন হয়েছে");

      router.push(redirectTo);
      router.refresh();
    } catch (error) {
      toast.error("কিছু সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocial(provider) {
    await authClient.signIn.social({
      provider,
      callbackURL: redirectTo,
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8f3] px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-lg sm:p-9">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1d5c3a] text-2xl">
            🛒
          </div>

          <h1 className="mt-5 text-3xl font-black text-[#193f2a]">
            সাইন ইন
          </h1>

          <p className="mt-2 text-gray-500">
            আপনার বাজার দর অ্যাকাউন্টে প্রবেশ করুন।
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-7 space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#1d5c3a]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#1d5c3a]"
          />

          <button
            disabled={loading}
            className="w-full rounded-xl bg-[#1d5c3a] py-3 font-bold text-white disabled:opacity-60"
          >
            {loading ? "Login হচ্ছে..." : "সাইন ইন"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">
            অথবা
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSocial("google")}
            className="rounded-xl border border-gray-300 py-3 font-semibold"
          >
            Google
          </button>

          <button
            onClick={() => handleSocial("github")}
            className="rounded-xl border border-gray-300 py-3 font-semibold"
          >
            GitHub
          </button>
        </div>

        <p className="mt-7 text-center text-sm text-gray-500">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-bold text-[#1d5c3a]"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </main>
  );
}