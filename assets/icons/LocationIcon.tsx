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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M27 12.8889C27 17.5678 20.3413 25.3239 17.3853 28.5367C16.6327 29.3546 15.3673 29.3546 14.6147 28.5367C11.6587 25.3239 5 17.5678 5 12.8889C5 6.87512 9.92487 2 16 2C22.0751 2 27 6.87512 27 12.8889ZM16 17.5556C18.6036 17.5556 20.7143 15.4662 20.7143 12.8889C20.7143 10.3116 18.6036 8.22222 16 8.22222C13.3964 8.22222 11.2857 10.3116 11.2857 12.8889C11.2857 15.4662 13.3964 17.5556 16 17.5556Z"
        stroke={strokeColor}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default HomeIcon;
