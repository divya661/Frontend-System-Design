import "./styles.css";
import {getSuggestions} from "./utils";

getSuggestions("ma").then((i)=>{
    console.log(i);
})

const inputBox = document.getElementById('search-input');
const suggestionBox = document.getElementById('suggestions-wrapper');

const handleSearch = async (keyword) => {
    const result = await getSuggestions(keyword);
   if(result.length){
    suggestionBox.classList.add('suggestions-visible');
    suggestionBox.innerHTML = "hello";
   }
    console.log(result);
};

const handleInputChange = (event) => {
    const value = event.target.value;
    handleSearch(value);

}

(()=>{
    inputBox.addEventListener("input",handleInputChange);
})();
