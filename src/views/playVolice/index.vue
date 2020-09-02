<template>
    <button @click="playVoice">播放语音</button>
</template>
<script>
const synth = window.speechSynthesis;
const msg = new SpeechSynthesisUtterance();
export default {
  data() {
    return {};
  },
  methods: {
    playVoice() {
      this.handleSpeak('小朋友，你是否有很多问号')
    },
    // 语音播报的函数
    handleSpeak(text) {
      msg.text = text;     // 文字内容: 小朋友，你是否有很多问号
      msg.lang = "zh-CN";  // 使用的语言:中文
      msg.volume = 1;      // 声音音量：1
      msg.rate = 1;        // 语速：1
      msg.pitch = 1;       // 音高：1
      synth.speak(msg);    // 播放
    },
    // 语音停止
    handleStop(e) {
      msg.text = e;
      msg.lang = "zh-CN";
      synth.cancel(msg);
    }
  }
};
</script>