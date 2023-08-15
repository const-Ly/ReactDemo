import * as sdk from "microsoft-cognitiveservices-speech-sdk";

import { isIos } from "./utils";

let speechConfig = sdk.SpeechConfig.fromSubscription(
  import.meta.env.VITE_SPEECH_KEY,
  import.meta.env.VITE_SERVICE_REGION
);

let player,
  audioConfig,
  synthesizer,
  currentText = "";

const speak = ({ content, voice, startCallback, endCallback } = {}) => {
  console.log('content:', content, isIos)

  if (isIos) {
    playIosAudio(content, voice, endCallback)
    return
  }

  if (currentText == content && player) {
    player.resume(startCallback);
    return;
  }

  // 销毁上一个，重新新建一个（处理：挡在播放中，点击下一个播放的时候）
  if (player) playerDestory()
  if (!player) createAudioPlay(voice, endCallback);
  currentText = content;

  synthesizer.speakTextAsync(currentText, (result) => {
    console.warn("语音合成结果", result);
    if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
      startCallback && startCallback(result);
      synthesizer.close();
    } else {
      console.error("语音转换异常，请稍后再试");
    }
  });
};

// 播放语音
async function playIosAudio(content, voice, endCallback) {
  speechConfig.speechSynthesisVoiceName = voice || "zh-CN-XiaoxiaoNeural"
  const synthesizer = new sdk.SpeechSynthesizer(speechConfig)
  synthesizer.synthesisCompleted = (s, result) => {
    console.warn('语音合成结果', result.privResult)
    synthesizer.close()
    endCallback && endCallback(result.privResult)
  }
  await synthesizer.speakTextAsync(content)
}

// 创建播放语音对象
function createAudioPlay(voice, callback) {
  player = new sdk.SpeakerAudioDestination();
  speechConfig.speechSynthesisVoiceName = voice || "en-US-JennyNeural";
  audioConfig = sdk.AudioConfig.fromSpeakerOutput(player);
  synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
  player.onAudioEnd = () => {
    console.log("完毕");
    callback && callback()
    playerDestory();
  };
}

function playerDestory() {
  if (player) player.pause()
  player = undefined;
  audioConfig = undefined;
  synthesizer = undefined;
}

speak.close = () => {
  synthesizer.close();
};

speak.resume = function (cb) {
  cb && cb()
  player?.resume();
};

speak.pause = function () {
  if (player) {
    player.pause();
  }
};

speak.playerDestory = playerDestory;

export default speak;
