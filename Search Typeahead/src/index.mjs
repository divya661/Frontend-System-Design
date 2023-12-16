import {getSuggestions,debounce} from "./utils.js";

// getSuggestions("ma").then((i)=>{
//     console.log(i);
// })
const inputBox = document.getElementById('search-input');
const suggestionBox = document.getElementById('suggestions-wrapper');

const resetState = () => {
    suggestionBox.classList.remove('suggestionsVisible');
}
const renderDropdownItems = (list=[]) => {
    const suggestFragment = document.createDocumentFragment();
    list.forEach(item => {
        const el = document.createElement('div');
        el.innerHTML = item;
        el.classList.add('dropdown-item');
        el.setAttribute('data-key',item);
        suggestFragment.appendChild(el);
    });
    
    // We are cleaning the children of search box so that suggestion box doesn't have any previous suggestion result
    suggestionBox.innerHTML = "";
    // attaching newer fragment so that every new items gets appened to the empty list
    suggestionBox.appendChild(suggestFragment);
};

const handleSearch = async (keyword) => {
    const result = await getSuggestions(keyword);
    console.log(result);
   if(result.length){
    suggestionBox.classList.add('suggestionsVisible');
    renderDropdownItems(result);
   } 
    console.log(result);
};

const handleInputChange = (event) => {
    const value = event.target.value;
    console.log(value);
    if(value){
       handleSearch(value);
    } else {
        resetState();
    }
}

const handleSelect = (event) => {
    const {key} = event.target.dataset;
    if(key){
        inputBox.value = key;
        resetState();
    }
};


(()=>{
    inputBox.addEventListener("input",debounce(handleInputChange,200));
    // Event bubbles from bottom to top
// Every time a children is clicked, parent on-click will be called therefore it is better to attach on parent event listener
    suggestionBox.addEventListener('click',handleSelect);
})();

