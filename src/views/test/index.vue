<template>
  <div class="about">
    <h1>test</h1>
  </div>
</template>
<script>
import { myMixins } from "@/mixins/myMixins.js";
export default {
  mixins: [myMixins],
  data() {
    return {}
  },
  created() {
    this.age++
  },
}
</script>

