# Tests fail, but shouldn't

npm test and the compiled browser version behave differently.

We do not enter the filter function. I though it should always throw an error.

* run `npm t` for test
* run `npm build` and open dist/index.html in Browser (see the console.logs, only the first time you click you see the error. Afterwards the pipe is broken)
