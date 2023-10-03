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
    <Svg width="32" height="32" viewBox="0 0 32 32" fill={fillColor}>
      <Path
        d="M3 14.0389C3 13.4542 3.25581 12.8989 3.70012 12.5189L14.7001 3.11167C15.4485 2.47162 16.5515 2.47162 17.2999 3.11166L28.2999 12.5189C28.7442 12.8989 29 13.4542 29 14.0389V27C29 28.1046 28.1046 29 27 29H21.25C20.1454 29 19.25 28.1046 19.25 27V21.4706C19.25 20.366 18.3546 19.4706 17.25 19.4706H14.75C13.6454 19.4706 12.75 20.366 12.75 21.4706V27C12.75 28.1046 11.8546 29 10.75 29H5C3.89543 29 3 28.1046 3 27V14.0389Z"
        stroke={strokeColor}
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default HomeIcon;
