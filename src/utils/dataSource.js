import Vue from "vue";
function stateFactory(state) {
    return function () {
        return this.state === state;
    }
}

export default function ({ dataGetter, initData, loadAtOnce = true }) {
    let vm = new Vue({
        data() {
            return {
                data: this._getDefaultData(),
                state: "inited"
            }
        },
        computed: {
            isInited: stateFactory("inited"),
            isLoading: stateFactory("loading"),
            isSuccessed: stateFactory("successed"),
            isFailed: stateFactory("failed")
        },
        methods: {
            reload() {
                this._reset();
                let promise = this._getPromise();
                this.state = "loading";
                return promise.then(data => {
                    this._setData(data);
                    this.state = "successed";
                }, (err) => {
                    this._reset();
                    this.state = "failed";
                    console.error(err);
                })
            },
            load() {
                this.reload();
            },
            _getDefaultData() {
                return initData == void 0 ? {} : initData;
            },
            _getPromise() {
                let res = dataGetter();
                if (res instanceof Promise) {
                    return res;
                } else {
                    return Promise.resolve(res);
                }
            },
            _reset() {
                let data = this._getDefaultData();
                this._setData(data);
            },
            _setData(data) {
                this.data = data;
            }
        }
    });
    if (loadAtOnce) {
        vm.load();
    }
    return vm;
}