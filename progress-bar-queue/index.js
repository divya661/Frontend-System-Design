import "./index.css";

const container = document.getElementById("container");
const button = document.getElementById("btn");
const queueCount = document.getElementById("queue");

let inProgress = false;
let queue = [];

button.addEventListener("click", () => {
  const outer = document.createElement("div");
  outer.className = "outer";
  const filler = document.createElement("div");
  filler.className = "filler";
  filler.addEventListener("animationend", () => {
    if (queue.length) {
      const firstElement = queue.shift();
      inProgress = true;
      firstElement.classList.add("active");
    } else {
      inProgress = false;
    }

    queueCount.innerText = queue.length;
  });

  outer.appendChild(filler);
  container.appendChild(outer);

  if (inProgress) {
    queue.push(filler);
    queueCount.innerText = queue.length;
  } else {
    filler.classList.add("active");
    inProgress = true;
  }

  console.log(queue);
});
