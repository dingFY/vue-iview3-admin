export function printHtml(html) {
    // 获取样式
    let style = getStyle();
    let container = getContainer(html);

    document.body.appendChild(style);
    document.body.appendChild(container);

    getLoadPromise(container).then(() => {
        window.print();
        document.body.removeChild(style);
        document.body.removeChild(container);
    });
}

// 设置打印样式
function getStyle() {
    let styleContent = `
#print-container {
    display: none;
}

@media print {
    body > :not(.print-container) {
        display: none;
    }

    @page {
        margin: 0.4cm;
    }

    html,
    body {
        display: block !important;
    }

    #print-container {
        display: block;
    }

    table {
        width: 100%;
        text-align: center;
        border-collapse: collapse;
    }
    tr {
        page-break-inside: avoid;
    }
    th, td {
        padding: 1px;
    }
    caption {
        height: 40px;
        lingth: 40px;
        text-align: left;
    }
    td div {
        width: 110px;
        text-align: left;
        display: inline-block;
        vertical-align: middle;
        word-wrap: break-word;
        word-break: break-all;
    }
}
`;

    let style = document.createElement("style");
    style.innerHTML = styleContent;
    return style;
}

// 清空打印内容
function cleanPrint() {
    let p = document.getElementById('print-container')
    if (!!p) {
        document.querySelector('body').removeChild(p)
    }
}

// 新建DOM，将需要打印的内容填充到DOM
function getContainer(html) {
    cleanPrint()
    let container = document.createElement("div");
    container.setAttribute("id", "print-container");
    container.innerHTML = html;
    return container;
}

// 图片完全加载后再调用打印方法
function getLoadPromise(dom) {
    let imgs = dom.querySelectorAll("img");
    imgs = [].slice.call(imgs);

    if (imgs.length === 0) {
        return Promise.resolve();
    }

    let finishedCount = 0;
    return new Promise(resolve => {
        function check() {
            finishedCount++;
            if (finishedCount === imgs.length) {
                resolve();
            }
        }
        imgs.forEach(img => {
            img.addEventListener("load", check);
            img.addEventListener("error", check);
        })
    });
}