export default function (base64, fileName) {
   var arr = base64.split(',');
   var mime = arr[0].match(/:(.*?);/)[1]
   var bstr = atob(arr[1])
   var n = bstr.length;
   var u8arr = new Uint8Array(n)
   while(n--) {
       u8arr[n] = bstr.charCodeAt(n);
   }
   return new File([u8arr], fileName, {type: mime});
  }