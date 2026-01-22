// frontend/src/components/LoadingScreen.jsx

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">

      {/* Wrapper */}
      <div className="flex flex-col items-center">

        {/* Animated Logo Circle */}
        <div className="relative w-24 h-24 flex items-center justify-center">

          {/* Outer spinning ring */}
          <div className="absolute w-24 h-24 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>

          {/* Inner pulsing circle */}
          <div className="absolute w-10 h-10 bg-green-600 rounded-full animate-ping opacity-70"></div>

          {/* Static center dot */}
          <div className="absolute w-6 h-6 bg-green-600 rounded-full"></div>
        </div>

        {/* Text */}
        <p className="mt-6 text-xl font-semibold text-gray-700 animate-pulse">
          CropAI is analysing…
        </p>

      </div>
    </div>
  );
}