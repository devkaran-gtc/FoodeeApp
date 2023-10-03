import React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

interface Props {
  color: string;
  size: number;
  focused: boolean;
}

const HomeIcon = (props: Props) => {

  const fillColor = props.focused ? "#F28482" : "none"; 
  const strokeColor = props.focused ? "#F28482" : "#3D405B";

  return (
    <Svg  width="32" height="32" viewBox="0 0 32 32" fill={fillColor}>
      <Path
        d="M27 24C27 26.2091 22.0751 28 16 28C9.92487 28 5 26.2091 5 24C5 21.7909 9.92487 20 16 20C22.0751 20 27 21.7909 27 24Z"
        stroke={strokeColor}
      />
      <Path
        d="M21.5 9.33333C21.5 12.2789 19.0376 14.6667 16 14.6667C12.9624 14.6667 10.5 12.2789 10.5 9.33333C10.5 6.38781 12.9624 4 16 4C19.0376 4 21.5 6.38781 21.5 9.33333Z"
        stroke={strokeColor}
      />
    </Svg>
  );
};

export default HomeIcon;
