import React from 'react';
import Svg, {SvgProps,G, Path} from 'react-native-svg';

interface Props {
  color: string;
  size: number;
}

const CloseIcon = ({color,size}: Props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
    <G id="X">
    <Path id="X_2" d="M6 6L18 18M18 6L6 18" stroke={color} stroke-linecap="round" stroke-linejoin="round"/>
    </G>
    </Svg>
  );
};

export default CloseIcon;
