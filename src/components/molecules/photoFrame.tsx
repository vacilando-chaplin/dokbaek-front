const PhotoFrame = () => {
  return (
    <button
      type="button"
      className="flex h-[204px] w-40 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border-disabled-light bg-gray-50 text-caption1 font-medium leading-caption1 tracking-caption1 text-content-tertiary-light"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C12.5523 2 13 2.44772 13 3V11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H13V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H11V3C11 2.44772 11.4477 2 12 2Z"
          fill="#868E96"
        />
      </svg>
      추가
    </button>
  );
};

export default PhotoFrame;
