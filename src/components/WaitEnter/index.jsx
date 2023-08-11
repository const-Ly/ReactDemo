import React from "react";
import "./index.less";

import LoopPoint from '../LoopPoint'

function WaitEnter() {
  return (
    <div className="wait-enter-component">
      <span className="fl-center">对方正在输入</span>
      <LoopPoint className="point" />
    </div>
  );
}

export default WaitEnter;
