<template>
  <PageTable
    ref="table"
    url="/prisoner/prisonerList"
    :params="params"
    :columns="columns"
    @on-selection-change="selectChange"
  >
    <div class="table-param">
      <div class="table-param-label">姓名：</div>
      <div class="table-param-input">
        <Input v-model.trim="params.prisonerName" clearable />
      </div>
    </div>
    <Button @click="request" type="primary" :loading="loading">查询</Button>
    <Button @click="print" type="primary">打印</Button>
  </PageTable>
</template>

<script>
import PageTable from "@/components/PageTable";
import dataSource from "@/utils/dataSource";
import { printHtml } from "@/utils/print.js";
import { prisonerList } from "@/api/getData.js";
import IconButton from "@/components/IconButton";

export default {
  components: { PageTable, IconButton },
  data() {
    return {
      params: {
        prisonerName: "",
      },
      loading: false,
      selections: [],
    };
  },
  computed: {
    columns() {
      return [
        { type: "selection", width: 60, align: "center" },
        { title: "姓名", key: "name" },
        { title: "编号", key: "number" },
        {
          title: "操作",
          render: (h, { row }) => {
            return [
              <IconButton
                onClick={() => this.edit(row)}
                type="edit"
                title="编辑"
              />,
              <IconButton
                onClick={() => this.remove(row)}
                type="remove"
                title="删除"
              />,
            ];
          },
        },
      ];
    },
    printData() {
      let printData = "";
      printData = `
      <table border="1">
      <caption>打印内容</caption>
      <tr>
        <th>姓名</th>
        <th>编号</th>
      </tr>
      ${this.selections
        .map((it) => {
          let result = `
        <tr>
          <td>${it.name}</td>
          <td>${it.number}</td>
        </tr>`;
          return result;
        })
        .join("")}
    </table>`;
      return printData;
    },
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
    selectChange(args) {
      this.selections = [...args];
    },
    print() {
      if (this.selections.length == 0) {
        this.$Modal.confirm({
          title: "注意",
          content: "未勾选任何数据，是否打印全部查询条件数据？",
          onOk: async () => {
            try {
              let { data } = await prisonerList(this.params);
              this.selections = [...data];
              printHtml(this.printData);
            } catch (e) {
              this.$Message.warning(e);
            } finally {
              this.$Modal.remove();
              this.selections = [];
            }
          },
        });
      } else {
        this.$Modal.confirm({
          title: "注意",
          content: "是否要打印勾选数据？",
          onOk: () => {
            printHtml(this.printData);
            this.$refs.table.selectAll(false);
          },
        });
      }
    },
    edit(row) {

    },
    remove(row) {
      
    }
  },
};
</script>