import React, { useState } from "react";
import { Popup } from "react-vant";
import "./more.less";

import { useConvState, useConvDispatch } from "../context";

function More({ visible, onBacktrackConv, onCloseMorePop, onReSetConv }) {
  console.log('More组件更新了')
  const state = useConvState();
  const dispatch = useConvDispatch();

  const [popType, setPopType] = useState(1);
  const [overlay, setOverlay] = useState(true);

  // 回溯消息
  function clickBacktrackConv() {
    setPopType(3);
    setOverlay(false);
    dispatch({
      type: "update_status",
      status: true,
    });
  }

  return (
    <Popup
      visible={visible}
      overlay={overlay}
      position="bottom"
      round
      onClosed={() => {
        setPopType(1);
        setOverlay(true);
        dispatch({ type: "reset" });
      }}
      onClickOverlay={onCloseMorePop}
    >
      <div className="more-component">
        {popType == 1 && (
          <div className="first-pop fl-center">
            <div className="reset" onClick={() => setPopType(4)}>
              <img src="https://img.cacheserv.com/web/webai/switch-icon.png" />
              <div>切换模型</div>
            </div>
            <div className="reset" onClick={() => setPopType(2)}>
              <img src="https://img.cacheserv.com/web/webai/end-icon.png" />
              <div>重置对话</div>
            </div>
            <div className="reset" onClick={clickBacktrackConv}>
              <img src="https://img.cacheserv.com/web/webai/backtrack-icon.png" />
              <div>回溯对话</div>
            </div>
          </div>
        )}

        {/* <!-- 切换模型 --> */}
        {popType == 4 && (
          <div className="reset-pop fl-center">
            <div className="title">确定要切换TA的模型吗？</div>
            <div className="line"></div>
            <div
              className="btn fl-center"
              onClick={() => onReSetConv("switch")}
            >
              确定
            </div>
            <div className="btn cancel fl-center" onClick={onCloseMorePop}>
              取消
            </div>
          </div>
        )}

        {/* // <!-- 重置 --> */}
        {popType == 2 && (
          <div className="reset-pop fl-center">
            <div className="title">你和TA的对话将会重置到最初状态</div>
            <div className="line"></div>
            <div className="btn fl-center" onClick={() => onReSetConv("reset")}>
              确定
            </div>
            <div className="btn cancel fl-center" onClick={onCloseMorePop}>
              取消
            </div>
          </div>
        )}

        {/* // <!-- 回溯 --> */}
        {popType == 3 && (
          <div className="back-pop fl-center">
            <div className="title">回溯到某条记忆重新对话</div>
            <div className="fl-center">
              <div
                onClick={() => onBacktrackConv(state.backtrackMsgIndex)}
                className={`btn fl-center ${
                  state.backtrackMsgIndex > -1 ? "btn-active" : ""
                }`}
              >
                确定回溯
              </div>
              <img
                onClick={onCloseMorePop}
                src="https://img.cacheserv.com/web/webai/close-43.png"
              />
            </div>
          </div>
        )}
      </div>
    </Popup>
  );
}

export default More;
