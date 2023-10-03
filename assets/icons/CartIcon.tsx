import React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

interface Props {
  color: string;
  size: number;
  focused: boolean;
}

const HomeIcon = (props: Props) => {
  const fillColor = props.focused ? "#F28482" : "none"; 
  const strokeColor = props.focused ? "#3D405B": "#3D405B" ;
  return (
    <Svg width="33" height="32" viewBox="0 0 33 32" fill={fillColor}>
      <Path
        d="M10.2143 12.8889V8.22222M22.7857 12.8889V8.22222M10.2143 8.22222H7.5C6.39543 8.22222 5.5 9.11765 5.5 10.2222V28C5.5 29.1046 6.39543 30 7.5 30H25.5C26.6046 30 27.5 29.1046 27.5 28V10.2222C27.5 9.11765 26.6046 8.22222 25.5 8.22222H22.7857M10.2143 8.22222V6.66667C10.2143 4.08934 12.3249 2 14.9286 2H18.0714C20.6751 2 22.7857 4.08934 22.7857 6.66667V8.22222M10.2143 8.22222H22.7857"
        stroke={strokeColor}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default HomeIcon;
