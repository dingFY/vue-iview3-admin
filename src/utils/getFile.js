export default function ({
    accept = "", // input框的accept属性值，它规定能够通过文件上传进行提交的文件类型 eg:  accept="image/gif, image/jpeg"
    multiple = false, // 是否多个
    exts = [], // 文件格式
    maxSize = 0 // 文件大小
  }) {
    exts = exts.map(it => it.toLowerCase());
    return new Promise((resolve, reject) => {
      let input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("style", "position:absolute;left: -1000px;");
      accept && input.setAttribute("accept", accept);
      multiple && input.setAttribute("multiple", "multiple");
      document.body.appendChild(input);
      input.focus();
      input.click();
      input.addEventListener("change", function () {
        let fileExts = Array.from(this.files)
          .map(it => it.name.replace(/.*\.([^.]+)$/, "$1"))
          .map(it => it.toLowerCase());
   
        if (fileExts.some(it => !exts.includes(it))) {
          reject(`只支持文件格式：${exts.join(",")}`);
        }
   
        if (maxSize > 0) {
          if (Array.from(this.files).some(it => it.size / 1024 / 1024 > maxSize)) {
            reject(`最大文件大小${maxSize}M`);
          }
        }
   
        if (multiple) {
          resolve(this.files);
        } else {
          resolve(this.files[0] || null);
        }
        input.parentElement.removeChild(input);
      })
   
    })
  }