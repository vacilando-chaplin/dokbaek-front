const EmptyImage = () => {
  return (
    <div>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-50">
        <div className="mb-2 text-gray-400">
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <span className="text-xs text-gray-500">
          이미지를 불러오는데 실패 했어요.
        </span>
      </div>
    </div>
  );
};

export default EmptyImage;
