import React from 'react';
import Svg, {Path, G, Defs, Rect, Circle,ClipPath} from 'react-native-svg';

interface Props {
  color: string;
  size: number;
}

const MinusIcon = (props: Props) => {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 25 24"
      fill="none"
      >
      <G id="Minus" clip-path="url(#clip0_1_187)">
        <Circle id="Ellipse 14" cx="12.25" cy="12" r="12" fill={props.color} />
        <Path
          id="Minus_2"
          d="M7.25 12H17.25"
          stroke="#F28482"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_187">
          <Rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.25)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default MinusIcon;
