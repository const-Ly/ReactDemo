import React, { useEffect, useRef, memo } from "react";
// import Lottie from "react-lottie-player";
import Lottie from "react-lottie-player/dist/LottiePlayerLight";

const AnimationComponent = memo(
  ({ src, index, style = { width: 36, height: 24 }, isPlay, isEnd }) => {
    const lottieRef = useRef(null);

    console.log("Lottie组件更新了");

    useEffect(() => {
      if (lottieRef.current) {
        lottieRef.current.goToAndStop(1, true); // 将动画进度重置为初始位置
      }
    }, [index, isEnd]);

    return (
      <Lottie
        ref={lottieRef}
        loop
        animationData={src}
        play={isPlay}
        style={style}
      />
    );
  }
);

AnimationComponent.displayName = "AnimationComponent";
export default AnimationComponent;
