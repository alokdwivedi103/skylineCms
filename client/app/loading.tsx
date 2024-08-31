export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-4 border-t-black rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
}
