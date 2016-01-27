R('../src/index', (err, spawn) => {

  if (err) {
    return console.error(err.statusText);
  }

  mocha.setup('bdd');

  const workerFn = () => self.close();

  describe('Worker', () => {

    it('should throw if no function was supplied', () => {

      let error;

      try {
        spawn();
      } catch (err) {
        error = err;
      }

      expect(error).to.be.ok();
    });

    it('should spawn a single worker', () => {

      const worker = spawn(workerFn);
      expect(worker instanceof Worker).to.be(true);
    });

    it('should spawn multiple workers', () => {

      const workers = spawn(workerFn, 2);
      expect(workers instanceof Array).to.be(true);
      expect(workers.every((worker) => worker instanceof Worker)).to.be(true);
    });

    it('should receive message from a single worker', (done) => {

      const worker = spawn(() => {
        postMessage('ok');
        self.close();
      });

      worker.onmessage = (event) => {
        expect(event.data).to.be('ok');
        done();
      };
    });

    it('should receive message from multiple workers', (done) => {

      const workerCount = 2;
      let msgCount = 0;

      const workers = spawn(() => {
        postMessage('ok');
        self.close();
      }, workerCount);

      workers.forEach((worker) => {
        worker.onmessage = (event) => {

          msgCount++;

          if (msgCount === workerCount) {
            expect(msgCount).to.equal(workerCount);
            done();
          }
        }
      });
    });
  });

  mocha.run();
});
