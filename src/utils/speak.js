import * as sdk from "microsoft-cognitiveservices-speech-sdk";

let speechConfig = sdk.SpeechConfig.fromSubscription(
  import.meta.env.VITE_SPEECH_KEY,
  import.meta.env.VITE_SERVICE_REGION
);

let player, audioConfig, synthesizer;

const speak = ({ item, voice, callback } = {}) => {
  if (!player) createAudioPlay(voice);
  const text = item.content;
  synthesizer.speakTextAsync(text, (result) => {
    console.warn("语音合成结果", result);
    if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
      callback && callback();
    } else {
      console.error("语音转换异常，请稍后再试");
    }
  });
};

// 创建播放语音对象
function createAudioPlay(voice) {
  player = new sdk.SpeakerAudioDestination();
  speechConfig.speechSynthesisVoiceName = voice || "en-US-JennyNeural";
  audioConfig = sdk.AudioConfig.fromSpeakerOutput(player);
  synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
}

function playerDestory() {
  if (player) player.pause();
  if (synthesizer) synthesizer.close();
  player = undefined;
  audioConfig = undefined;
  synthesizer = undefined;
}

speak.pause = function () {
  if (player) {
    player.pause();
    if (synthesizer) synthesizer.close();
    player = undefined;
    audioConfig = undefined;
    synthesizer = undefined;
  }
};

speak.playerDestory = playerDestory;

export default speak;
