<template>
    <div class="scrollText" ref="outer">
        <div class="st-inner" :class="{'st-scrolling': needToScroll}">
            <span class="st-section" ref="inner">{{text}}</span>
            <span class="st-section" v-if="needToScroll">{{text}}</span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            needToScroll: false,
            text: "",
        }
    },
    mounted() {
        this.startCheck();
    },
    beforeDestroy() {
        this.stopCheck();
    },
    methods: {
        check() {
            this.setText();
            this.$nextTick(()=>{
                let flag = this.isOverflow();
                this.needToScroll = flag
            })
        },
        isOverflow() {
            let outer = this.$refs.outer;
            let inner = this.$refs.inner;
            let outerWidth = this.getWidth(outer)
            let innerWidth = this.getWidth(inner)
            return innerWidth > outerWidth
        },
        getWidth(el) {
            let { width } = el.getBoundingClientRect();
            return width;
        },
        setText() {
            this.text = this.$slots.default && this.$slots.default.reduce((res, it)=> res + it.text, "") || "";
        },
        startCheck() {
            this._checkTimer = setInterval(this.check, 1000);
            this.check();
        },
        stopCheck() {
            clearInterval(this._checkTimer)
        }
    }
}
</script>
<style lang="scss" scoped>
    .scrollText {
        overflow:hidden;
        white-space: nowrap;
    }
    .st-inner {
        display: inline-block;
    }
    .st-scrolling .st-section {
        padding: 0 5px;
    }
    // 向左匀速滚动动画
    .st-scrolling {
        animation: scroll 10s linear infinite;
    }

    @keyframes scroll {
        0% {
           transform: translate3d(0%, 0, 0) 
        }
        100% {
           transform: translate3d(-50%, 0, 0) 
        }
    }




</style>


