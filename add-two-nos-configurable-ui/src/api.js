export const submit = (requestBody) =>
  new Promise((resolve, reject) => setTimeout(resolve(requestBody)), 3000);
