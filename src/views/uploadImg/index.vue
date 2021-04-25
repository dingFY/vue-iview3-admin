<template>
  <div>
    <h1>点击上传图片</h1>
    <ImageSelector
      ref="photo"
      class="photo"
      @getimgFile="getimgFile"
      v-model="data.file"
      @click="uploadPhoto"
    />
  </div>
</template>
<script>
import ImageSelector from "@/components/imageSelector";
export default {
  components: { ImageSelector },
  data() {
    return {
      data: {},
    };
  },
  methods: {
    uploadPhoto() {
      this.imgFile = [];
    },
    getimgFile(val) {
      this.imgFile = [];
      if (val) {
        this.imgFile.push(val);
      }
    },
  },
};
</script>
<style scoped>
.photo {
    width: 110px;
    height: 130px;
}
</style>
