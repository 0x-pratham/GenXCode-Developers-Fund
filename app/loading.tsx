export default function Loading() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
      {/* Animated Spinner matching your theme */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-genx-primary/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-genx-accent rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-6 text-genx-accent font-body tracking-widest uppercase text-sm animate-pulse">
        Loading GenXCode...
      </p>
    </div>
  );
}