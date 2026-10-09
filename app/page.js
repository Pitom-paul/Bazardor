
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import { getChange } from "@/lib/utils";

export default async function HomePage() {
  let products = [];
  let error = false;

  try {
    const data = await getProducts();

    products = Array.isArray(data)
      ? data
      : Array.isArray(data?.products)
        ? data.products
        : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.results)
            ? data.results
            : [];
  } catch (err) {
    console.error("Products API error:", err);
    error = true;
  }

  const sorted = [...products].sort(
    (a, b) => Number(getChange(b) || 0) - Number(getChange(a) || 0)
  );

  const risers = sorted
    .filter((product) => Number(getChange(product) || 0) > 0)
    .slice(0, 6);

  const fallers = [...products]
    .sort(
      (a, b) => Number(getChange(a) || 0) - Number(getChange(b) || 0)
    )
    .filter((product) => Number(getChange(product) || 0) < 0)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f7f8f3]">
      <Navbar />

      <Hero />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* আজ দাম বেড়েছে */}
        <section className="py-14">
          <div className="mb-7">
            <p className="text-sm font-semibold text-green-600">
              আজকের আপডেট
            </p>

            <h2 className="mt-1 text-2xl font-black text-[#193f2a] sm:text-3xl">
              আজ দাম বেড়েছে ▲
            </h2>
          </div>

          {risers.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {risers.map((product, index) => (
                <ProductCard
                  key={product.id ?? product._id ?? index}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-white p-6 text-gray-500">
              {error
                ? "পণ্যের তথ্য লোড করা যায়নি।"
                : "আজ দাম বাড়ার কোনো তথ্য পাওয়া যায়নি।"}
            </p>
          )}
        </section>

        {/* আজ দাম কমেছে */}
        <section className="py-8">
          <div className="mb-7">
            <p className="text-sm font-semibold text-red-500">
              আজকের আপডেট
            </p>

            <h2 className="mt-1 text-2xl font-black text-[#193f2a] sm:text-3xl">
              আজ দাম কমেছে ▼
            </h2>
          </div>

          {fallers.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {fallers.map((product, index) => (
                <ProductCard
                  key={product.id ?? product._id ?? index}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-white p-6 text-gray-500">
              {error
                ? "পণ্যের তথ্য লোড করা যায়নি।"
                : "আজ দাম কমার কোনো তথ্য পাওয়া যায়নি।"}
            </p>
          )}
        </section>

        {/* সব পণ্য */}
        <section id="সব-পণ্য" className="scroll-mt-10 py-16">
          <div className="mb-8">
            <p className="text-sm font-semibold text-[#1d5c3a]">
              বাজারের সব তথ্য
            </p>

            <h2 className="mt-1 text-3xl font-black text-[#193f2a]">
              সব পণ্য
            </h2>

            <p className="mt-2 max-w-xl text-gray-500">
              প্রয়োজনীয় সব পণ্যের আজকের দাম এক জায়গায় দেখে নিন।
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id ?? product._id ?? index}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-10 text-center">
              <div className="text-5xl">🛒</div>

              <h3 className="mt-4 text-xl font-bold">
                পণ্যের তথ্য পাওয়া যায়নি
              </h3>

              <p className="mt-2 text-gray-500">
                {error
                  ? "API সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।"
                  : "কোনো পণ্য পাওয়া যায়নি।"}
              </p>
            </div>
          )}
        </section>
      </div>

      <footer className="border-t border-[#dce3da] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="font-semibold text-[#193f2a]">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>

          <p className="text-sm text-gray-500">
            সকল দাম বাজারের তথ্যের ওপর নির্ভরশীল।
          </p>
        </div>
      </footer>
    </main>
  );
}