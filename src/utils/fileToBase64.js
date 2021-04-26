export default function (file) {
    return new Promise((resolve, reject) => {
      if (!file) reject(new Error("no file"));
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        resolve(reader.result);
      });
      reader.readAsDataURL(file);
    });
  }