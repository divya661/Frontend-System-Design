let scroller = document.querySelector("#scroller");
let sentinel = document.querySelector("#sentinel");

function loadItems(n) {
    for(let i=0;i<n;i++){
        let newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.textContent = 'Item' + counter++;
        scroller.appendChild( newItem);
    }
}

let intersectionObserver = new IntersectionObserver(entries =>{
    // if the browser is busy while scrolling happens, multiple entries can accumulate between invocations of this callback, As long as any one of the notifications reports the sentinel within the scrolling viewport, we add more content
    if(entries.some(entry => entry.intersectionRatio > 0)) {
        loadItems(10);
            //appendChild will move the existing element so there is no need to remove it first
            scroller.appendChild(sentinel);
            loadItems(5);
            ChromeSamples.setStatus('Loaded up to item'+counter);
    }
});
intersectionObserver.observe(sentinel);