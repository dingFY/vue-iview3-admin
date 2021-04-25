<template>
  <div @click="onClick" class="imageSelector" :class="className">
    <img class="imageSelector-img" v-if="src" :src="src" />
    <slot v-else />
  </div>
</template>
<script>
import getFile from "@/utils/getFile";
export default {
  props: {
    value: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      src: this.value,
      imgFile: "",
    };
  },
  watch: {
    src(val) {
      this.$emit("input", val);
      this.$emit("getimgFile", this.imgFile);
    },
    value(val) {
      this.src = val;
      this.imgFile = "";
    },
  },
  computed: {
    className() {
      return {
        "imageSelector-disabled": this.disabled,
        "imageSelector-noImg": !this.src,
      };
    },
  },
  methods: {
    onClick() {
      if (this.disabled) return;
      this.getFile();
    },
    async getFile() {
      try {
        let image = await getFile({
          accept: "image/jpeg,image/png",
          exts: ["jpg", "png"],
          maxSize: 10,
        });
        console.log(image);

        if (image) {
          this.imgFile = image;
          this.src = await this.fileToBase64(image);
        }
      } catch (e) {
        this.$Message.error(e);
      }
    },
    fileToBase64(file) {
      return new Promise((resolve, reject) => {
        if (!file) reject(new Error("no file"));
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          resolve(reader.result);
        });
        reader.readAsDataURL(file);
      });
    },
  },
};
</script>
<style scoped>
.imageSelector {
  display: inline-block;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
}
.imageSelector-disabled {
  cursor: default;
}
.imageSelector-noImg {
  height: 50px;
  width: 50px;
}
.imageSelector-img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
</style>
 