import {FRUITS} from "./data.js";

const getSuggestions = (keyword) =>{
    console.log(keyword);
    const result = FRUITS.filter(
        (i) => i.substring(0,keyword.length).toLowerCase()=== keyword.toLowerCase()
        );
    return Promise(res => {
        setTimeout(()=>{
            res(result)
        },1000);
    });
};

export default getSuggestions;

