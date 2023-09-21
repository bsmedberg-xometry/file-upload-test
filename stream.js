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
  let stream = file.stream();
  let reader = stream.getReader();

  while (true) {
    let { done, value } = await reader.read();

    console.log("read data", done, value);
    if (done) {
      return;
    }
  }
}
