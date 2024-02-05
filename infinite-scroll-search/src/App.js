import './App.css';
import React, { useCallback, useRef, useState } from 'react';
import InfiniteScroll from './InfiniteScroll';
function App() {
  const [query,setQuery] = useState('');
  const [data,setData] = useState([]);
  const controllerRef= useRef(null);

  const handleInput = useCallback((e)=>{
    setQuery(e.target.value);
  },[]);

  const renderListItems = useCallback(({title},key,ref)=>{
    return (
      <div key={key} ref={ref}>{title}</div>
    );
  });

  const getData = useCallback((query,pageNumber)=>{
    return new Promise(async (resolve,reject)=>{
      try{
        if(controllerRef.current) controllerRef.current.abort();
        controllerRef.current = new AbortController();
       const promise = await fetch('https://openlibrary.org/search.json?'+new URLSearchParams({
        q:query,
        page:pageNumber
       }),{signal:controllerRef.current.signal});
       const newdata= await promise.json();
       console.log(newdata);
       setData((prevData)=>[...prevData,...newdata.docs]);
       resolve();
      } catch(e){
        console.error(e);
      }
    });
  },[]);

  return (
    <div className="App">
     <input type="text" value={query} onChange={handleInput}/>
     <InfiniteScroll
     query={query}
     renderListItems={renderListItems}
     getData={getData}
     listData={data}
     />
    </div>
  );
}

export default App;
