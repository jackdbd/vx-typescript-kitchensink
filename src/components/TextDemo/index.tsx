import { getStringWidth, Text } from "@vx/text";
import React from "react";

interface IProps {
  height: number;
  text: string;
  width: number;
}

console.warn("getStringWidth", getStringWidth);

const TextDemo = (props: IProps) => {
  const { height, text, width } = props;
  return (
    <svg width={width} height={height}>
      <Text
        angle={10}
        style={{ fill: "black", fontSize: "4.5rem", stroke: "white" }}
        textAnchor="middle"
        verticalAnchor="middle"
        width={width}
        x={width / 2}
        y={height / 2}
      >
        {text}
      </Text>
    </svg>
  );
};

export default TextDemo;
