<template>
  <div class="questionList">
    <div
      v-for="(item, index) in questionList"
      :key="index"
      class="questionItem"
    >
        <Input
          v-model="item.question"
          :ref="`question`"
        />

      <div class="btns">
        <Button
          :disabled="index == 0"
          type="primary"
          shape="circle"
          icon="md-arrow-round-up"
          @click="clickUp(index)"
        ></Button>
        <Button
          :disabled="index == questionList.length - 1"
          type="success"
          shape="circle"
          icon="md-arrow-round-down"
          @click="clickDown(index)"
        ></Button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      questionList: [
        { question: "第一个问题？" },
        { question: "第二个问题？" },
        { question: "第三个问题？" },
        { question: "第四个问题？" },
        { question: "第五个问题？" },
      ],
    }
  },
  methods: {
     // 上移
    clickUp(index) {
      let arr = this.questionList;
      arr.splice(index - 1, 1, ...arr.splice(index, 1, arr[index - 1]));
    },
    // 下移
    clickDown(index) {
      let arr = this.questionList;
      arr.splice(index, 1, ...arr.splice(index + 1, 1, arr[index]));
    },
  }
}
</script>
<style scoped>
.questionList {
  padding: 40px;
}
.questionItem {
  width: 100%;
  display: flex;
}
.btns {
  width: 100px;
}
input {
  flex: 1;
}
</style>