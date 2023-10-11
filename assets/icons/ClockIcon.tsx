import React from 'react';
import Svg, {SvgProps, Path, G, ClipPath, Rect, Defs} from 'react-native-svg';

interface Props {
  size: number;
}

const ClockIcon = (props: Props) => {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 15 15" fill="none">
    <G id="wall-clock 1" clip-path="url(#clip0_211_595)">
    <G id="Group">
    <G id="Group_2">
    <Path id="Vector" d="M7.49998 0C3.36457 0 0 3.36457 0 7.49998C0 11.6354 3.36457 15 7.49998 15C11.6354 15 15 11.6354 15 7.49998C15 3.36457 11.6354 0 7.49998 0ZM7.49998 14.3478C3.7239 14.3478 0.652163 11.2761 0.652163 7.49998C0.652163 3.7239 3.7239 0.652163 7.49998 0.652163C11.2761 0.652163 14.3478 3.7239 14.3478 7.49998C14.3478 11.2761 11.2761 14.3478 7.49998 14.3478Z" fill="#34495E"/>
    </G>
    </G>
    <G id="Group_3">
    <G id="Group_4">
    <Path id="Vector_2" d="M10.6656 10.2046L7.82602 7.36501V2.28264C7.82602 2.10264 7.67992 1.95654 7.49992 1.95654C7.31992 1.95654 7.17383 2.10264 7.17383 2.28264V7.50004C7.17383 7.58677 7.2084 7.66961 7.26906 7.73091L10.2038 10.6657C10.2678 10.7289 10.3512 10.7609 10.4347 10.7609C10.5182 10.7609 10.6016 10.729 10.6656 10.6657C10.7927 10.5385 10.7927 10.3318 10.6656 10.2046Z" fill="#34495E"/>
    </G>
    </G>
    </G>
    <Defs>
    <ClipPath id="clip0_211_595">
    <Rect width="15" height="15" fill="white"/>
    </ClipPath>
    </Defs>
    </Svg>
    
  );
};

export default ClockIcon;
