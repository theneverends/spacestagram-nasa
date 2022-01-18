import "./App.css";
import React, { useState } from "react";
import { useEffect } from "react";

function App() {
  const [value, setValue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [like, setLike] = useState("like1");
  const [page, setPage] = useState(0);
  const [likeList, setLikeList] = useState([]);

  //listener to like button
  const likeListener = (item) => {
    if (like === "like1") {
      setLike("like2");
      const temp = likeList;
      temp.push(item);
      setLikeList(temp);
      localStorage.setItem(item.url, item);
    } else {
      setLike("like1");
      const temp = likeList;
      temp.pop(item);
      setLikeList(temp);
      localStorage.removeItem(item.url);
    }
  };

  //
  const flipPage = (x) => {
      setPage(x + page);
      setLike("like1");
  };

  //render at the beginning
  useEffect(() => {
    setIsLoading(true);
    
    async function fetchData() {
      const response = await fetch("https://api.nasa.gov/planetary/apod?api_key=UzSgl1dG6wqfUUp3oSeinvDyZQDL0g58fyRRKQiN&count=10");
      const json = await response.json();
      let map = JSON.parse(JSON.stringify(json));
      setValue(map);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  

  //Map through the list
  const List = (array) => {
    return (
      <div className="container">
        <h4>{array.list[page].title}</h4>
        <h6>on {array.list[page].date}</h6>
        <div className="imgContainer">
          <img align="left" src={array.list[page].hdurl} alt="Loading... Please wait"/>
          <div className="top-right">
            <button className={like} onClick={() => likeListener(array.list[page])}>
              <i className="fas fa-heart"></i>
            </button>
          </div>
          <div className="prev" >
            <button onClick={() => page > 0 ? flipPage(-1) : undefined }>&#10094;</button>
          </div>
          <div className="next">
          <button onClick={() => page < array.list.length - 1 ? flipPage(1) : undefined}>&#10095;</button>
          </div>
        </div>  
        <p>
          {array.list[page].explanation}
        </p>
      </div>
    );
  };

  return (
    <div className="all">
      <div className="nav">
        <a href="./">Spacestagram</a>
        <a href="#collection">My Collection</a>
      </div>
      <h3>Spacestagram</h3>
      { isLoading ? <p>Loading ...</p> : <List list={value} />}
    </div>
  );
}

export default App;
