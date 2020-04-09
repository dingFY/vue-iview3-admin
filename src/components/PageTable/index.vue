<template>
    <div class="pageTable" :class="className">
        <div class="pageTable-header" ref="header" v-if="$slots.default">
            <slot />
        </div>
        <div class="pageTable-body" ref="body" :style="bodyStyle">
            <Table
                ref="table"
                :columns="formatColumns"
                :data="innerData"
                v-on="$listeners"
                :loading="loading"
                :height="bodyHeight"
                stripe
                border
            />
        </div>
        <div class="pageTable-footer" v-if="hasPage">
            <template v-if="pageStyle === 'style1'">
                <div class="pageTable-footer-left">
                    总共
                    <span class="pageTable-footer-total">{{total}}</span>条记录，每页显示
                    <Select
                        class="pageTable-footer-select"
                        size="small"
                        :value="pageSize"
                        @on-change="onPageSizeChange"
                    >
                        <Option v-for="it in pageSizeOpts" :key="it" :value="it">{{it}}</Option>
                    </Select>
                </div>
                <Page
                    class="pageTable-footer-right"
                    v-model="current"
                    :total="total"
                    :size="pageSize"
                />
            </template>
            <template v-if="pageStyle === 'style2'">
                <Page2
                    class="pageTable-footer-right"
                    v-model="current"
                    :total="total"
                    :size="pageSize"
                />
            </template>
        </div>
    </div>
</template>
<script>
import { get, post } from "@/api/axios";
import { Tooltip } from "iview";
import Page from "@/components/Page";
import Page2 from "@/components/Page2";

export default {
    components: { Page, Page2 },
    props: {
        columns: {
            type: Array
        },
        pageSizeOpts: {
            type: Array,
            default() {
                return [10, 20, 30, 40]
            }
        },
        method: {
            type: String,
            default: "get"
        },
        url: {
            type: String
        },
        params: {
            type: Object,
            default() {
                return {};
            }
        },
        hasPage: {
            type: Boolean,
            default: true
        },
        data: {
            type: Array,
            default() {
                return [];
            }
        },
        pageStyle: {
            type: String,
            default: "style1"
        },
        initPageSize: {
            type: Number,
            default: 10
        }
    },
    mounted() {
        this.setSize();
        window.addEventListener("resize", this.setSize);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.setSize);
    },
    data() {
        return {
            innerData: this.data,
            total: 0,
            pageSize: this.initPageSize,
            current: 1,
            loading: false,
            headerHeight: 0,
            bodyHeight: 0
        }
    },
    watch: {
        pageSize() {
            this.request();
        },
        current() {
            this.request(false);
        },
        data(val) {
            this.innerData = val;
        },
        innerData(val) {
            setTimeout(() => {
                try {
                    this.$el.querySelector(".ivu-table-body").scrollTop = 0;
                } catch (e) { }
            }, 100)
        }
    },
    methods: {
        onPageSizeChange(pageSize) {
            this.current = 1;
            this.pageSize = pageSize;
        },
        async request(reset = true) {
            if (this.loading) return;
            if (reset) this.current = 1;
            try {
                this.loading = true;
                let method = this.method.toLocaleLowerCase() === "get" ? get : post;
                let params = {
                    page: this.current,
                    size: this.pageSize,
                    ...this.params
                };
                let { data, page } = await method(this.url, params);
                this.$emit("on-selection-change", []);
                this.innerData = data;
                this.total = page.total;
            } catch (e) {
                this.$Message.warning(e);
                console.error(e);
            } finally {
                this.loading = false;
            }
        },
        setSize() {
            setTimeout(() => {
                this.setHeader();
                this.setBody();
            }, 200)
        },
        setHeader() {
            if (this.$refs.header) {
                let { height } = this.$refs.header.getBoundingClientRect();
                this.headerHeight = height;
            }
        },
        setBody() {
            setTimeout(() => {
                let { height } = this.$refs.body.getBoundingClientRect();
                if (this.hasPage) {
                    this.bodyHeight = height;
                } else {
                    this.bodyHeight = height - 20;
                }
            })
        },
        selectAll(status) {
            this.$refs.table.selectAll(status);
        },
        getInnerText(nodes) {
            if (Array.isArray(nodes)) {
                let textArr = nodes.map(this.getInnerText);
                return textArr.join("");
            } else if (typeof nodes === "string") {
                return nodes;
            } else {
                let node = nodes;
                if (node == null) {
                    return "";
                }
                if (typeof node.text === "string") {
                    return node.text;
                } else {
                    return this.getInnerText(node.children);
                }
            }
        }
    },
    computed: {
        formatColumns() {
            return this.columns.map(it => {
                let renderObj = it.render && it.title !== '操作' ? {
                    render: (...args) => {
                        let node = it.render(...args);
                        let innerText = this.getInnerText(node);
                        return (
                            <Tooltip class="ivu-table-cell-tooltip" content={innerText}>
                                <span class="ivu-table-cell-tooltip-content">{node}</span>
                            </Tooltip>
                        );
                    }
                } : {};

                return Object.assign({
                    ellipsis: true,
                    tooltip: true,
                    align: "center",
                    show: true
                }, it, renderObj)
            }).filter(it => it.show);
        },
        className() {
            return {
                "pageTable-noPage": !this.hasPage
            }
        },
        bodyStyle() {
            return {
                top: this.headerHeight + 20 + "px"
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.pageTable {
  position: relative;
  height: 100%;
}

.pageTable-header {
  position: absolute;
  top: 0;
  width: 100%;
  padding: 5px 20px;
  text-align: left;
  background: #f7faff;
  border-bottom: 1px solid #cee0f0;
}

.pageTable-header .ivu-btn {
  margin-right: 20px;
}

.pageTable-body {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 50px;
}

.pageTable-noPage .pageTable-body {
  bottom: 0;
}

.pageTable-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  text-align: center;
}

.pageTable-footer-left {
  float: left;
}

.pageTable-footer-right {
  float: right;
}

.pageTable-footer-select {
  width: auto;
}

.pageTable-footer-total {
  color: #579fff;
  font-weight: bold;
  padding: 0 5px;
}

/deeo/ {
  .ivu-table {
    background: transparent;
  }

  .ivu-table-wrapper {
    border: 0;
  }

  .ivu-table {
    &::before,
    &::after {
      content: none;
    }
  }

  .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td,
  .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
    background-color: #f7faff;
  }

  table {
    border-collapse: collapse;
  }

  .ivu-table-border td,
  .ivu-table-border th {
    border: 1px solid #cee0f0;
  }

  .ivu-table-body {
    margin-top: -1px;
  }

  .ivu-table th {
    background-color: #eff6ff;
  }

  .ivu-table-tip td {
    margin-top: -1px;
  }

  .ivu-table-tip td {
    height: 50px !important;
  }
}
</style>