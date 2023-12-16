const controller = new AbortController();
// signal is a unique identify that we have attached to anything we are making through api calls 
const res = fetch('/',{signal:controller.signal});
controller.abort();
console.log(res);