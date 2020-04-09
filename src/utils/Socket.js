import EventEmitter from "./EventEmitter";

class Heart {
    constructor(cb, timeout = 15000) {
        this.cb = cb;
        this.timeout = timeout;
        this.timer = null;
    }
    reset() {
        this.stop();
        this.start();
    }
    start() {
        this.timer = setTimeout(() => {
            this.cb();
            this.start();
        }, this.timeout);
    }
    stop() {
        clearTimeout(this.timer);
    }
}

class RetryCtrl {
    time = null;
    delay = null;
    retryCallback = null;
    tryTime = 0;
    timer = null;
    isTrying = false;

    constructor({
        time = 5,
        delay = 1000,
        retryCallback,
        failCallback
    }) {
        this.time = time;
        this.delay = delay;
        this.retryCallback = retryCallback;
        this.failCallback = failCallback;

        this.timeoutBody = this.timeoutBody.bind(this);
    }
    start() {
        this.isTrying = true;
        this.stop();
        this.timeoutBody();
    }

    reset() {
        this.tryTime = 0;
        this.isTrying = false;
    }

    async timeoutBody() {
        if (this.tryTime > this.time && this.time >= 0) {
            this.isTrying = false;
            this.failCallback();
            return;
        };
        let isSuccess = await this.retryCallback();
        this.tryTime++;
        if (!isSuccess) {
            this.timer = setTimeout(this.timeoutBody, this.delay)
        } else {
            this.isTrying = false;
        }
    }

    stop() {
        clearTimeout(this.timer);
    }
}

let allSocketArray = [];

export default class Socket extends EventEmitter {
    _heart = null;
    _url = null;
    _socket = null;
    _mailBox = [];
    _isHeartBeat = null;
    _isClosed = false;
    _retryCtrl = null;
    _getHeartBeatMsg = null;
    _isWorking = false;

    constructor({
        url,
        heartBeatDelay = 15000,          //心跳时间间隔
        isHeartBeat,                     //用于判断message是否心跳的回调
        retryTime = -1,                  //重连重试次数
        retryDelay = 1000,               //重连时间间隔
        getHeartBeatMsg                  //生成心跳内容的回调
    }) {
        super();
        allSocketArray.push(this);
        this._heartBeatCallback = this._heartBeatCallback.bind(this);

        this._onOpen = this._onOpen.bind(this);
        this._onClose = this._onClose.bind(this);
        this._onMessage = this._onMessage.bind(this);
        this._onError = this._onError.bind(this);

        this._url = url;
        this._heart = new Heart(this._heartBeatCallback, heartBeatDelay);
        this._isHeartBeat = isHeartBeat;
        this._getHeartBeatMsg = getHeartBeatMsg;

        this._onRetry = this._onRetry.bind(this);
        this._onRetryFail = this._onRetryFail.bind(this);
        this._retryCtrl = new RetryCtrl({
            time: retryTime,
            delay: retryDelay,
            retryCallback: this._onRetry,
            failCallback: this._onRetryFail
        })
    }

    get isOpened() {
        return this._isWorking;
    }

    _heartBeatCallback() {
        let msg = this._getHeartBeatMsg();
        if (typeof msg !== "string") {
            msg = JSON.stringify(msg);
        }
        this.send(msg);
    }

    _getSocket() {
        if (this._socket) {
            return this._socket;
        } else {
            this._socket = new WebSocket(this._url);
            this._socket.addEventListener("open", this._onOpen);
            this._socket.addEventListener("close", this._onClose);
            this._socket.addEventListener("message", this._onMessage);
            this._socket.addEventListener("error", this._onError);
        }
    }
    _dataParse(data) {
        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
    }
    _onOpen() {
        this._heart.start();
        this._isWorking = true;
        this._mailBox.forEach(it => this._socket.send(it));
        this._retryCtrl.reset();
        this.trigger("open");
    }
    _onClose() {
        this._isWorking = false;
        this._socket = null;
        if (this._isClosed) {
            this.trigger("close");
        } else {
            !this._retryCtrl.isTrying && this._retryCtrl.start();
        }
        this._heart.stop();
    }
    _onMessage(e) {
        let data = this._dataParse(e.data);
        if (typeof this._isHeartBeat === "function") {
            let flag = this._isHeartBeat(data);
            if (flag) return;
        }
        if (typeof this._messageTransform === "function") {
            this._messageTransform(data);
        } else {
            this.trigger("message", data);
        }
        this._heart.reset();
    }
    _onError(e) {
        this.trigger("error", e);
    }
    _onRetry() {
        return new Promise(resolve => {
            this.open();
            this._socket.addEventListener("open", () => resolve(true));
            this._socket.addEventListener("close", () => resolve(false));
        });
    }
    _onRetryFail() {
        this._isClosed = true;
        this._isWorking = false;
        this.trigger("error");
    }

    send(msg) {
        if (typeof msg !== "string") {
            msg = JSON.stringify(msg);
        }
        if (this._isWorking) {
            this._socket.send(msg);
        } else {
            this._mailBox.push(msg);
        }
    }
    open() {
        if (this._isWorking) return;
        this._getSocket();
        this._isClosed = false;
    }
    close() {
        this._isClosed = true;
        this._socket && this._socket.close();
        this._socket = null;
        this._heart.stop();
        this._retryCtrl.stop();
    }
}

export class MySocket extends Socket {
    requestId = 0;
    send(msg) {
        let data = {
            "method": "GET",
            "requestId": 'vmam_' + (this.requestId++),
            "uri": msg,
        }
        super.send(data);
    }
    _messageTransform(data) {
        let type = data.cmd;
        this.trigger(type, data.data);
        this.trigger("message", data);
    }
}

window.addEventListener("unload", () => {
    for (let i = 0; i < allSocketArray.length; i++) {
        let socket = allSocketArray[i];
        socket.close();
    }
})