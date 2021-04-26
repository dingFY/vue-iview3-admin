<template>
  <div>
    <p>{{ base64 }}</p>
    <img :src="base64" alt="" />
  </div>
</template>
<script>
import base64ToFile from "@/utils/base64ToFile";
export default {
  data() {
    return {
      base64:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
    };
  },
  mounted() {
    this.base64ToFile();
  },
  methods: {
    base64ToFile() {
      let file = base64ToFile(this.base64, "test");
      // 转成文件后可以提交到后台
      console.log(file);
    },
  },
};
</script>