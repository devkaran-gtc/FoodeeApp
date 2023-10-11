import React from 'react';
import Svg, {Path,G} from 'react-native-svg';

interface Props {
  size: number;
}

const ForwardIcon = (props: Props) => {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none">
      <G id="chevron-right">
        <Path
          id="Vector"
          d="M9 18L15 12L9 6"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
    </Svg>
  );
};

export default ForwardIcon;
