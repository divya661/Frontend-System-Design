import {FRUITS} from "./data.js";

export const getSuggestions = (keyword) =>{
    console.log(keyword);
    const result = FRUITS.filter(
        (i) => i.substring(0,keyword.length).toLowerCase()=== keyword.toLowerCase()
        );
    return new Promise(res => {
        setTimeout(()=>{
            res(result)
        },1000);
    });
};

export const debounce = (fn, delay=500)=>{
    let timerCtx;
    return function(){
        const context = this;
        const args = arguments;
        clearTimeout(timerCtx);
      timerCtx = setTimeout(()=>fn.apply(context,args),delay);
    }
}

export const throttle = (func,limit) => {
    let lastFunc;
    let lastRan;

    return function(){
        const context = this;
        const args = arguments;
        if(!lastRan){
            func.apply(context,args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function(){
                if((Date.now()-lastRan)>=limit){
                    func.apply(context.args);
                    lastRan = Date.now();
                }
            },limit - (Date.now()-lastRan))
        }
    }
}
