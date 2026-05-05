export default function ScannerSkeleton() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
      <div className="bg-white p-2 rounded-2xl w-full max-w-md relative overflow-hidden shadow-2xl">
        
        <div className="absolute top-4 right-4 z-10 w-20 h-10 bg-gray-200 rounded-lg animate-pulse" />

        <div className="w-full h-75 rounded-xl bg-gray-200 animate-pulse flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        </div>

        <div className="p-4 text-center">
          <div className="w-full h-1 bg-gray-200 animate-pulse mb-3 rounded" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
}