<template>
    <div>
        <DatePicker v-bind="{...$props ,...$attrs}" v-model="innerStart" @on-change="startChange" />
        {{toText}}
        <DatePicker v-bind="{...$props ,...$attrs}" v-model="innerEnd" @on-change="endChange" />
    </div>
</template>
<script>
import moment from "moment";
export default {
    props: {
        toText: {
            type: String,
            default: "-"
        },
        start: {
            type: String,
            required: true
        },
        end: {
            type: String,
            required: true
        },
        momentFormat: {
            type: String,
            default: "YYYY/MM/DD HH:mm:ss"
        }
    },
    data() {
        return {
            innerStart: this.start ? moment(this.start, this.momentFormat).toDate() : "",
            innerEnd: this.end ? moment(this.end, this.momentFormat).toDate() : "",
        }
    },
    watch: {
        innerStart(val) {
            this.$emit("update:start", val ? moment(val).format(this.momentFormat) : "");
        },
        innerEnd(val) {
            this.$emit("update:end", val ? moment(val).format(this.momentFormat) : "");
        },
        start(val) {
            this.innerStart = val ? moment(val, this.momentFormat).toDate() : "";
        },
        end(val) {
            this.innerEnd = val ? moment(val, this.momentFormat).toDate() : "";
        }
    },
    methods: {
        startChange() {
            if (this.innerStart && this.innerEnd && this.innerStart > this.innerEnd) {
                this.innerEnd = this.innerStart;
            }
        },
        endChange() {
            if (this.innerStart && this.innerEnd && this.innerStart > this.innerEnd) {
                this.innerStart = this.innerEnd;
            }
        }
    }
}
</script>
<style scoped>
/deep/ .ivu-date-picker{
    width: 200px;
}
</style>
