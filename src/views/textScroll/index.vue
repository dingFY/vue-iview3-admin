<template>
  <div class="about">
    <div class="content">
      <scrollText>一二三四五六七八九十哈哈哈哈哈哈哈哈测试</scrollText>
    </div>
  </div>
</template>
<script>
import scrollText from "@/components/scrollText";
export default {
  components: { scrollText },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
  font-size: 40px;
  border: 1px solid lightblue;
  margin: 40px;
}
</style>



