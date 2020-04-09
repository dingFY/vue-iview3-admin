<template>
    <div :class="className">
        <div :class="prevClassName" @click="_onPrevClick">上页</div>
        <div class="gs-page-count">{{countText}}</div>
        <div :class="nextClassName" @click="_onNextClick">下页</div>
    </div>
</template>
<script>
export default {
    name: "gs-page",
    model: {
        prop: "current",
        event: "change"
    },
    props: {
        current: {
            type: Number,
            default: 1,
            validator(val) {
                return Math.ceil(val) === val;
            }
        },
        size: {
            type: Number,
            default: 10
        },
        total: {
            type: Number,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currentPage: this.current
        }
    },
    watch: {
        current(val) {
            this.currentPage = val;
        },
        currentPage(val) {
            this.$emit("change", val);
        },
        size() {
            this.currentPage = 1;
        }
    },
    computed: {
        className() {
            return {
                "gs-page": true,
                "gs-page-disabeld": this.disabled
            }
        },
        prevClassName() {
            return {
                "gs-page-btn": true,
                "gs-page-btn-disabled": this.isCurrentFistPage
            }
        },
        nextClassName() {
            return {
                "gs-page-btn": true,
                "gs-page-btn-disabled": this.isCurrentLastPage
            }
        },

        countText() {
            return `${this.currentPage}/${this.pageCount}`;
        },

        pageCount() {
            return Math.ceil(this.total / this.size) || 1;
        },
        isCurrentFistPage() {
            return this.currentPage === 1;
        },
        isCurrentLastPage() {
            return this.currentPage === this.pageCount;
        }
    },
    methods: {
        prev() {
            this.jump(this.currentPage - 1);
        },
        next() {
            this.jump(this.currentPage + 1);
        },
        jump(pageNum) {
            if (pageNum < 1) {
                pageNum = 1;
            }
            if (pageNum > this.pageCount) {
                pageNum = this.pageCount;
            }
            this.currentPage = pageNum;
        },

        _onPrevClick() {
            if (this.disabled) return;
            this.prev();
        },
        _onNextClick() {
            if (this.disabled) return;
            this.next();
        }
    }
}
</script>
<style lang="scss" scoped>
.gs-page {
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    color: #2b3646;
    text-align: center;
    user-select: none;
}

.gs-page-btn {
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    height: 28px;
    line-height: 26px;
    border: 1px solid #dae6f9;
    min-width: 28px;
    padding: 0 10px;
    box-sizing: border-box;
    background: white;
    &:hover {
        background: #f4f7fc;
    }
}

.gs-page-count {
    display: inline-block;
    padding: 10px;
    height: 28px;
    line-height: 28px;
}

.gs-page-disabeld .gs-page-btn,
.gs-page-btn-disabled {
    color: #bec9d8;
    cursor: not-allowed;
}
</style>


