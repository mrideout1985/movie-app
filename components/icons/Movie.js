import * as React from "react";

function SvgMovie(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="movie_svg__h-6 movie_svg__w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      color={props.color}
      height={props.height}
      width={props.width}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
      />
    </svg>
  );
}

export { SvgMovie };
