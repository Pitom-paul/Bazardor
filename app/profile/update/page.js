"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }

    if (!isPending && !session) {
      toast.error("আগে Login করুন");
      router.push("/signin");
    }
  }, [session, isPending, router]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name দিন");
      return;
    }

    try {
      setLoading(true);

      const { error } =
        await authClient.updateUser({
          name: name.trim(),
        });

      if (error) {
        toast.error(
          error.message || "Update failed"
        );
        return;
      }

      toast.success(
        "Information successfully updated"
      );

      router.push("/profile");
    } catch (error) {
      toast.error("Update করা যায়নি");
    } finally {
      setLoading(false);
    }
  }

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8f3] px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-sm">
        <Link
          href="/profile"
          className="font-semibold text-[#1d5c3a]"
        >
          ← Profile
        </Link>

        <h1 className="mt-6 text-3xl font-black text-[#193f2a]">
          Update Information
        </h1>

        <p className="mt-2 text-gray-500">
          আপনার নাম পরিবর্তন করুন।
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-7"
        >
          <label className="mb-2 block text-sm font-semibold">
            Name
          </label>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#1d5c3a]"
          />

          <button
            disabled={loading}
            className="mt-5 w-full rounded-xl bg-[#1d5c3a] py-3 font-bold text-white disabled:opacity-60"
          >
            {loading
              ? "Updating..."
              : "Update Information"}
          </button>
        </form>
      </div>
    </main>
  );
}