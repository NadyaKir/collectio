import React from "react";

export default function Chip({ title, marginRight, dismissible, onClick }) {
  return (
    <div
      className={`relative inline-block select-none items-center  rounded-xl border border-gray-300 bg-gray-100 hover:border-gray-500 py-1.5 px-3 font-sans text-xs uppercase text-black ${marginRight} mb-2`}
    >
      <span className={`${dismissible ? "mr-5" : "mr-0"} overflow-auto`}>
        #{title}
      </span>
      {dismissible && (
        <button
          className="absolute top-2/4 right-1 mx-px h-5 max-h-[32px] w-5 max-w-[32px] -translate-y-2/4 select-none rounded-md text-center align-middle font-sans text-xs font-medium uppercase text-black transition-all hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
