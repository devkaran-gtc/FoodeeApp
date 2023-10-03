import React from 'react';
import Svg, {SvgProps, Path,Rect} from 'react-native-svg';

const HomeIcon = () => {
  return (
    <Svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <Rect width="44" height="44" rx="16" fill="#F28482" />
      <Path
        d="M21 18H31M21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18M21 18C21 16.3431 19.6569 15 18 15C16.3431 15 15 16.3431 15 18M15 18H13M23 26H13M23 26C23 24.3431 24.3431 23 26 23C27.6569 23 29 24.3431 29 26M23 26C23 27.6569 24.3431 29 26 29C27.6569 29 29 27.6569 29 26M29 26H31"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default HomeIcon;
