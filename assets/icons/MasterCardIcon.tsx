import React from 'react';
import Svg, {G, Circle, Mask} from 'react-native-svg';

interface Props {
  size: number;
}

const CardIcon = (props: Props) => {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 20 12" fill="none">
      <G id="Group 8">
        <Circle
          id="Ellipse 8"
          cx="14.0829"
          cy="5.91716"
          r="5.91716"
          fill="#F1C40F"
        />
        <Circle
          id="Ellipse 7"
          cx="5.91716"
          cy="5.91716"
          r="5.91716"
          fill="#E74C3C"
        />
        <G id="Mask Group">
          <Mask
            id="mask0_211_250"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="12"
            height="12">
            <Circle
              id="Ellipse 10"
              cx="5.91716"
              cy="5.91716"
              r="5.91716"
              fill="#E74C3C"
            />
          </Mask>
          <G mask="url(#mask0_211_250)">
            <Circle
              id="Ellipse 9"
              cx="14.0829"
              cy="5.91716"
              r="5.91716"
              fill="#F1C40F"
              fill-opacity="0.3"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default CardIcon;
