export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f7f8f3] px-4 py-12">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-10 w-56 rounded bg-gray-200" />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-64 rounded-2xl bg-white p-5"
            >
              <div className="h-14 w-14 rounded-xl bg-gray-200" />

              <div className="mt-5 h-5 w-32 rounded bg-gray-200" />

              <div className="mt-3 h-4 w-24 rounded bg-gray-200" />

              <div className="mt-10 h-6 w-28 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}