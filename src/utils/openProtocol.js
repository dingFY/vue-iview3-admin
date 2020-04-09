export default function (url, download) {
    let a = document.createElement("a");
    a.setAttribute("href", url);
    if (download) {
        a.setAttribute("download", download);
        a.setAttribute("target", "_blank");
    }
    a.click();
}