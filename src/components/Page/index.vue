<template>
    <div :class="className">
        <div :class="firstClassName" @click="_onFirstClick">{{fistText}}</div>

        <div :class="prevClassName" @click="_onPrevClick">{{prevText}}</div>

        <div
            v-for="pageNum in pagesShouldShow"
            :class="getJumpBtnClassName(pageNum)"
            @click="_onClick(pageNum)"
            :key="pageNum"
        >
            <slot :pageNum="pageNum" :isCurrent="isCurrent(pageNum)">{{pageNum}}</slot>
        </div>

        <div :class="nextClassName" @click="_onNextClick">{{nextText}}</div>

        <div :class="lastClassName" @click="_onLastClick">{{lastText}}</div>
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
        maxBtnCount: {
            type: Number,
            default: 5,
            validator(val) {
                return val >= 2 && Math.ceil(val) === val;
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        fistText: {
            type: String,
            default: "首页"
        },
        prevText: {
            type: String,
            default: "上页"
        },
        nextText: {
            type: String,
            default: "下页"
        },
        lastText: {
            type: String,
            default: "尾页"
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
        firstClassName() {
            return {
                "gs-page-btn": true,
                "gs-page-firstBtn": true,
                "gs-page-btn-disabled": this.isCurrentFistPage
            }
        },
        prevClassName() {
            return {
                "gs-page-btn": true,
                "gs-page-prevBtn": true,
                "gs-page-btn-disabled": this.isCurrentFistPage
            }
        },
        nextClassName() {
            return {
                "gs-page-btn": true,
                "gs-page-nextBtn": true,
                "gs-page-btn-disabled": this.isCurrentLastPage
            }
        },
        lastClassName() {
            return {
                "gs-page-btn": true,
                "gs-page-lastBtn": true,
                "gs-page-btn-disabled": this.isCurrentLastPage
            }
        },




        pageCount() {
            return Math.ceil(this.total / this.size) || 1;
        },
        pagesShouldShow() {
            let from;
            let to;
            let isOdd = this.maxBtnCount % 2;
            let leftSideCount;
            let rightSideCount;

            if (isOdd) {
                let sideCount = (this.maxBtnCount - 1) / 2;
                leftSideCount = sideCount;
                rightSideCount = sideCount;
            } else {
                let halfCount = this.pageCount / 2;
                let isBefore = this.currentPage <= halfCount;
                let halfMaxBtnCount = this.maxBtnCount / 2;
                leftSideCount = isBefore ? halfMaxBtnCount - 1 : halfMaxBtnCount;
                rightSideCount = isBefore ? halfMaxBtnCount : halfMaxBtnCount - 1;
            }

            if (this.currentPage <= leftSideCount) {
                from = 1;
                to = this.maxBtnCount;
            } else if (this.currentPage + rightSideCount >= this.pageCount) {
                from = this.pageCount - this.maxBtnCount + 1;
                to = this.pageCount;
            } else {
                from = this.currentPage - leftSideCount;
                to = this.currentPage + rightSideCount;
            }

            if (from < 1) {
                from = 1;
            }
            if (to > this.pageCount) {
                to = this.pageCount;
            }
            let pages = [];
            for (let i = from; i <= to; i++) {
                pages.push(i);
            }
            if (pages.length === 0) {
                pages.push(1);
            }
            return pages;
        },
        isCurrentFistPage() {
            return this.currentPage === 1;
        },
        isCurrentLastPage() {
            return this.currentPage === this.pageCount;
        }
    },
    methods: {
        first() {
            this.jump(1);
        },
        prev() {
            this.jump(this.currentPage - 1);
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
        next() {
            this.jump(this.currentPage + 1);
        },
        last() {
            this.jump(this.pageCount);
        },

        isCurrent(pageNum) {
            return this.currentPage === pageNum;
        },

        getJumpBtnClassName(pageNum) {
            return {
                "gs-page-btn": true,
                "gs-page-jumpBtn": true,
                "gs-page-btn-current": this.isCurrent(pageNum)
            }
        },

        _onFirstClick() {
            if (this.disabled) return;
            this.first();
        },
        _onPrevClick() {
            if (this.disabled) return;
            this.prev();
        },
        _onClick(pageNum) {
            if (this.disabled) return;
            this.jump(pageNum);
        },
        _onNextClick() {
            if (this.disabled) return;
            this.next();
        },
        _onLastClick() {
            if (this.disabled) return;
            this.last();
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
    margin-right: -1px;
    background: white;
    &:hover {
        background: #f4f7fc;
    }
}

.gs-page-disabeld .gs-page-btn,
.gs-page-btn-disabled {
    color: #bec9d8;
    cursor: not-allowed;
}

.gs-page-btn.gs-page-btn-current {
    background: #579fff;
    border-color: #579fff;
    color: white;
    cursor: default;
}

.gs-page-firstBtn {
    border-radius: 4px 0 0 4px;
}

.gs-page-lastBtn {
    border-radius: 0 4px 4px 0;
}

.gs-page-jumpBtn {
    padding: 0 5px;
}
</style>


