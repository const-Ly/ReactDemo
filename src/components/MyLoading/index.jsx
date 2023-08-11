import React from "react";
import { Loading } from "react-vant";
import './index.less'

function MyLoading({
  color = "#63bda1",
  type = "spinner",
  size = "30px",
  textSize = "14px",
  textColor = "#63bda1",
  vertical = false,
}) {
  return (
    <div className="loading-component">
      <div className="box">
        <Loading
          color={color}
          type={type}
          size={size}
          textSize={textSize}
          textColor={textColor}
          vertical={vertical}
        />
      </div>
    </div>
  );
}

export default MyLoading;
