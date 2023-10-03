import React from 'react';
import Svg, {Path,G,Defs,ClipPath,Circle,Rect} from 'react-native-svg';

interface Props {
  color: string;
  size: number;
}

const PlusIcon = (props: Props) => {
  return (
    <Svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      >
      <G id="Plus" clip-path="url(#clip0_1_189)">
        <Circle id="Ellipse 14" cx="12.25" cy="12" r="12" fill="#F28482" />
        <Path
          id="Plus_2"
          d="M12.25 7V17M7.25 12H17.25"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_189">
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

export default PlusIcon;
