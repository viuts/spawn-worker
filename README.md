# spawn-worker
<img src="logo.png" width="150" />
Spawn a web worker with a function

## Install

```
$ npm i spawn-worker
```

## Usage

```js
const spawn = require('spawn-worker');

// Single worker
const worker = spawn(function() {
  postMessage('Yo!');
  self.close();
});

worker.onmessage = function(event) {
  console.log(event.data); // 'Yo!'
};

// Multiple workers
const workers = spawn(function() {
  postMessage('Yo!');
  self.close();
}, 2);

workers.forEach(function(worker) {
  worker.onmessage = function(event) {
    console.log(event.data); // 'Yo!'
  };
});
```

## API

**spawn(function[, count])**

- `function` Function to be executed inside of a worker
- `count` Number of workers, Optional, Default: 1
- Return: single or multiple instances of `Worker`

## License

MIT
