function processInput(input) {
  Promise.all(Array.prototype.map.call(input.files, processFile)).then(
    () => {
      alert("Success!");
    },
    (err) => {
      alert(`Failure: ${err}`);
    }
  );
}

async function processFile(file) {
  return new Promise((resolve, reject) => {
    const chunkSize = 2097152;
    const chunks = Math.ceil(file.size / chunkSize);
    const fileReader = new FileReader();
    let currentChunk = 0;

    function loadNext() {
      console.log(`loadNext - currentChunk=${currentChunk}`);
      const start = currentChunk * chunkSize;
      const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
      fileReader.readAsArrayBuffer(file.slice(start, end));
    }

    fileReader.onerror = (err) => {
      fileReader.abort();
      console.error("fileReader.onerror", err);
      reject(new Error("fileReader.onError", {cause: err}));
    };

    fileReader.onload = (evt) => {
      console.log("fileReader.onload", evt.target.result);
      currentChunk += 1;
      if (currentChunk < chunks) {
        loadNext();
      } else {
        resolve(`Got ${chunks} chunks. Done.`);
      }
    }

    loadNext();
  });
}
