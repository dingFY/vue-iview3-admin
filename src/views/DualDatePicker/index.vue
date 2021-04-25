<template>
  <div>
    <h1>选择时间范围: {{selectTime}}</h1>
    <div class="table-param-input" style="width: 430px">
      <DualDatePicker
        type="datetime"
        :start.sync="params.startTime"
        :end.sync="params.endTime"
      />
    </div>
  </div>
</template>
<script>
import DualDatePicker from "@/components/DualDatePicker";
export default {
  components: { DualDatePicker },
  data() {
    return {
      params: {},
    };
  },
  computed: {
    selectTime() {
      if(!this.params.startTime||!this.params.endTime) return ''
      return `${this.params.startTime}—${this.params.endTime}`
    }
  },
  methods: {},
};
</script>
<style scoped>
.photo {
  width: 110px;
  height: 130px;
}
</style>
