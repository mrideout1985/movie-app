import * as React from "react";



function SvgCircle(props) {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      {...props}
    >
      <circle
        cx={250}
        cy={250}
        r={245}
        fill="url(#circle_svg__toning)"
        stroke={props.color || "green"}
        strokeWidth={25}
        strokeMiterlimit={10}
      />

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        fill={props.color || "green"}
        stroke={props.color || "green"}
        strokeWidth={10}
        fontSize="15rem"
        dy=".3em"
      >
        {props.rating}
      </text>
    </svg>
  );
}

export default SvgCircle;
