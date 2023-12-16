import {getSuggestions} from "./utils.js";
// import "./styles.css";

getSuggestions("ma").then((i)=>{
    console.log(i);
})

const inputBox = document.getElementById('search-input');
const suggestionBox = document.getElementById('suggestions-wrapper');

const resetState = () => {
    suggestionBox.classList.remove("suggestions-visible");
}
const renderDropdownItems = (list) => {
    const suggestFragment = document.createDocumentFragment();
    list.forEach(item => {
        const el = document.createElement('div');
        el.innerHTML = item;
        el.classList.add('dropdown-item');
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
    suggestionBox.classList.add('suggestions-visible');
    renderDropdownItems(result);
   } 
    console.log(result);
};

const handleInputChange = (event) => {
    const value = event.target.value;
    if(value){
       handleSearch(value);
    } else {
        resetState();
    }
}

(()=>{
    console.log("i am call");
    inputBox.addEventListener("input",handleInputChange);
})();
