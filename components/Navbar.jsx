"use client";

import Link from "next/link";

const categories = [
  { name: "সব", slug: "" },
  { name: "চাল", slug: "chal" },
  { name: "ডাল", slug: "dal" },
  { name: "তেল", slug: "tel" },
  { name: "সবজি", slug: "sobji" },
  { name: "মাছ", slug: "mach" },
  { name: "মাংস", slug: "mangsho" },
  { name: "মসলা", slug: "moshla" },
];

const tickerItems = [
  ["🍚", "চাল", "৭২", "▲ ২.১%"],
  ["🫘", "ডাল", "১৩০", "▼ ১.৪%"],
  ["🫙", "সয়াবিন তেল", "১৭৫", "▲ ০.৮%"],
  ["🥔", "আলু", "৪৫", "▼ ২.৯%"],
  ["🧅", "পেঁয়াজ", "৮০", "▲ ১.৫%"],
  ["🌶️", "মরিচ", "২৪০", "▲ ৩.১%"],
];

export default function Navbar() {
  const ticker = [...tickerItems, ...tickerItems];

  return (
    <header className="bg-[#f7f8f3]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-[#dfe4dc] py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1d5c3a] text-2xl">
              🛒
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#173d28] sm:text-2xl">
                বাজার দর
              </h1>

              <p className="text-xs text-gray-500">
                ২৪ সেপ্টেম্বর ২০২৬
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-2 sm:flex">
            <Link
              href="/signin"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-[#1d5c3a] hover:bg-[#e8efe9]"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-[#1d5c3a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#174b30]"
            >
              সাইন আপ
            </Link>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={
                index === 0
                  ? "/"
                  : `/category/${category.slug}`
              }
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                index === 0
                  ? "bg-[#1d5c3a] text-white"
                  : "text-gray-600 hover:bg-[#e4eee6] hover:text-[#1d5c3a]"
              }`}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-y border-[#dce3da] bg-[#eef4ed] py-2">
        <div className="ticker-wrapper">
          <div className="ticker-track">
            {ticker.map((item, index) => (
              <div
                key={index}
                className="mx-5 flex items-center gap-2 text-sm"
              >
                <span>{item[0]}</span>
                <span className="font-medium text-gray-700">
                  {item[1]}
                </span>
                <span className="font-bold text-[#1d5c3a]">
                  {item[2]} টাকা
                </span>
                <span
                  className={
                    item[3].startsWith("▲")
                      ? "font-semibold text-green-600"
                      : "font-semibold text-red-500"
                  }
                >
                  {item[3]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}