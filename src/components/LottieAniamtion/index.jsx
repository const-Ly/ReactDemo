import React from "react";
// import Lottie from "react-lottie-player";
import Lottie from 'react-lottie-player/dist/LottiePlayerLight'


function AnimationComponent({ src, style = { width: 36, height: 24 } }) {
  return <Lottie loop animationData={src} play style={style} />;
}

export default AnimationComponent;
