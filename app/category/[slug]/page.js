"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";

import { getProductsByCategory } from "@/lib/api";
import { getNumericPrice } from "@/lib/utils";

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug;

  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(false);

        const data = await getProductsByCategory(slug);

        const result = Array.isArray(data)
          ? data
          : data?.products || data?.data || [];

        setProducts(result);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadProducts();
    }
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "asc") {
      return getNumericPrice(a) - getNumericPrice(b);
    }

    if (sort === "desc") {
      return getNumericPrice(b) - getNumericPrice(a);
    }

    return 0;
  });

  return (
    <main className="min-h-screen bg-[#f7f8f3]">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#1d5c3a]">
              ক্যাটাগরি
            </p>

            <h1 className="mt-2 text-3xl font-black capitalize text-[#193f2a]">
              {slug}
            </h1>

            <p className="mt-2 text-gray-500">
              এই ক্যাটাগরির সব পণ্যের আজকের বাজার দর।
            </p>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#1d5c3a]"
          >
            <option value="default">
              সাজান: ডিফল্ট
            </option>

            <option value="asc">
              দাম: কম থেকে বেশি
            </option>

            <option value="desc">
              দাম: বেশি থেকে কম
            </option>
          </select>
        </div>

        {loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        )}

        {!loading && (error || sortedProducts.length === 0) && (
          <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="text-6xl">😕</div>

            <h2 className="mt-5 text-2xl font-black text-[#193f2a]">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
            </h2>

            <p className="mt-2 text-gray-500">
              ক্যাটাগরিটি সঠিক কিনা যাচাই করুন।
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-xl bg-[#1d5c3a] px-6 py-3 font-bold text-white"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        )}

        {!loading && sortedProducts.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedProducts.map((product, index) => (
              <ProductCard
                key={product.id ?? product._id ?? index}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}