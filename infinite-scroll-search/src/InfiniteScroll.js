import React,{ useCallback, useEffect, useRef, useState } from "react"

const InfiniteScroll = ({
    renderListItems: renderListItem,
    getData,
    listData,
    query
})=>{
  const pageNumber = useRef(1);
  const observer = useRef(null);
  const [loading,setLoading]  = useState(false);

  const fetchData = useCallback(()=>{
    setLoading(true);
    getData(query,pageNumber.current).catch(e=>console.error(e)).finally(()=>setLoading(false));
  },[query]);

  const lastElementObserver = useCallback((node)=>{
    if(loading) return;
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries)=>{
        if(entries[0].isIntersecting){
            pageNumber.current+=1;
            fetchData();
        }
    });
    if(node) observer.current.observe(node);
  });

  const renderList = useCallback(()=>{
    return listData.map((item,index)=>{
        if(index===listData.length-1){
            return renderListItem(item,index,lastElementObserver);
        }
        return renderListItem(item,index,null);
    })
  });

  useEffect(()=>{
    fetchData();
    return ()=>{
        if(observer.current) observer.current.disconnect();
    }
  },[fetchData])

  return (<>
    {renderList()}
    {loading && "Loading..."}
    </>);
};

export default InfiniteScroll;