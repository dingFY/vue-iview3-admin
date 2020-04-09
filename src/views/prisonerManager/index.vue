<template>
    <PageTable ref="table" url="/prisoner/prisonerList" :params="params" :columns="columns">
        <div class="table-param">
            <div class="table-param-label">在押人员：</div>
            <div class="table-param-input">
                <Input v-model.trim="params.prisonerName" clearable />
            </div>
        </div>
        <Button @click="request" type="primary" :loading="loading">查询</Button>
    </PageTable>
</template>

<script>
import PageTable from "@/components/PageTable";
import dataSource from "@/utils/dataSource";

export default {
  components: { PageTable },
  data() {
    return {
      params: {
        prisonerName: "",
      },
      loading: false,
    };
  },
  computed: {
    columns() {
      return [
        { title: "在押人员", key: "name" },
        { title: "编号", key: "number" },
        {
          title: "操作",
          render: (h, { row }) => {
            return [
              <Button type="primary">编辑</Button>,
            ];
          }
        }
      ];
    }
  },
  mounted() {
    this.request();
  },
  methods: {
    async request() {
      this.loading = true;
      await this.$refs.table.request();
      this.loading = false;
    },
  }
};
</script>