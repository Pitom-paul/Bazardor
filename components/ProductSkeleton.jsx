export default function ProductSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-[#e2e6e0] bg-white p-4">
      <div className="h-14 w-14 rounded-xl bg-gray-200" />

      <div className="mt-5 h-5 w-32 rounded bg-gray-200" />

      <div className="mt-2 h-4 w-24 rounded bg-gray-200" />

      <div className="mt-5 border-t border-gray-100 pt-4">
        <div className="h-3 w-20 rounded bg-gray-200" />
        <div className="mt-2 h-6 w-28 rounded bg-gray-200" />
      </div>
    </div>
  );
}