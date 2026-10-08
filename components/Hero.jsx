export default function Hero() {
  return (
    <section className="hero-pattern overflow-hidden bg-[#1d5c3a]">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div className="text-white">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#dcefdc]">
            প্রতিদিনের বাজারের আপডেট
          </p>

          <h2 className="max-w-xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            আজকের বাজার দর
            <span className="block text-[#f4c542]">
              এক নজরে দেখুন
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-[#e2eee5] sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ ও অন্যান্য প্রয়োজনীয়
            পণ্যের আজকের দাম সহজেই দেখে নিন।
          </p>

          <a
            href="#সব-পণ্য"
            className="mt-8 inline-flex rounded-xl bg-[#f4c542] px-6 py-3 font-bold text-[#173d28] transition hover:scale-105"
          >
            সব পণ্য দেখুন →
          </a>
        </div>

        <div className="flex justify-center lg:justify-end">
          <img
            src="/bazar-hero.png"
            alt="বাজার দর"
            className="w-full max-w-lg object-contain"
          />
        </div>
      </div>
    </section>
  );
}