"use client";

import Link from "next/link";
import {
  getChange,
  getNumericPrice,
  getProductEmoji,
  getProductName,
  getProductUnit,
  toBengaliNumber,
} from "@/lib/utils";

export default function ProductCard({ product }) {
  const price = getNumericPrice(product);
  const change = Number(getChange(product)) || 0;

  const id =
    product?.id ??
    product?._id ??
    product?.slug;

  const slug =
    product?.slug ??
    product?.id ??
    product?._id;

  const isUp = change > 0;
  const isDown = change < 0;

  return (
    <Link
      href={`/product/${slug}`}
      className="group block rounded-2xl border border-[#dfe5dd] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#eef5ed] text-3xl">
          {getProductEmoji(product)}
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold ${
            isUp
              ? "bg-green-100 text-green-700"
              : isDown
                ? "bg-red-100 text-red-600"
                : "bg-gray-100 text-gray-500"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
          {toBengaliNumber(Math.abs(change))}%
        </span>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-bold text-[#193f2a] group-hover:text-[#1d5c3a]">
          {getProductName(product)}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {getProductUnit(product)}
        </p>
      </div>

      <div className="mt-5 flex items-end justify-between border-t border-gray-100 pt-4">
        <div>
          <p className="text-xs text-gray-500">
            আজকের দাম
          </p>

          <p className="mt-1 text-xl font-black text-[#1d5c3a]">
            {toBengaliNumber(price)} টাকা
          </p>
        </div>

        <span className="text-gray-400 transition group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}