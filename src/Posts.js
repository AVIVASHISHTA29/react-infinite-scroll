import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Posts.css"; // Import the CSS file
import { Pagination } from "@mui/material";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [needToFetch, setNeedToFetch] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (needToFetch) {
      const getData = setTimeout(() => {
        loadPosts();
        setNeedToFetch(false);
      }, 1000);
      return () => clearTimeout(getData);
    }
  }, [needToFetch]);

  const loadPosts = (value) => {
    setLoading(true);
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?_page=${
          value ? value : page
        }&_limit=10`
      )
      .then((res) => {
        console.log("res", res.data);
        if (res.data.length === 0) {
          setHasMore(false);
          return;
        }
        setPosts(res.data);
        // setPage((prevPage) => prevPage + 1);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  //   window.addEventListener("scroll", () => {
  //     console.log(
  //       "Scroll Y",
  //       window.scrollY,
  //       window.innerHeight,
  //       window.scrollY + window.innerHeight,
  //       document.documentElement.scrollHeight
  //     ); //scrolled from top
  //     //visible part of screen
  //     if (
  //       window.scrollY + window.innerHeight + 500 >=
  //       document.documentElement.scrollHeight
  //     ) {
  //       setNeedToFetch(true);
  //       //   loadPosts();
  //       //   console.log("Fetching More Posts");
  //     }
  //   });

  return (
    <div className="posts-container">
      {/* Apply the container style */}
      {/* <InfiniteScroll
        dataLength={posts.length}
        next={loadPosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>You have seen it all</b>
          </p>
        }
      >
        {posts.map((post, index) => (
          <div className="post" key={post.id}>
            <h2>
              {index + 1}.{post.title}
            </h2>
            <p>{post.body}</p>
          </div>
        ))}
      </InfiniteScroll> */}
      {posts.map((post, index) => (
        <div className="post" key={index}>
          <h2>
            {(page - 1) * 10 + index + 1}.{post.title}
          </h2>
          <p>{post.body}</p>
        </div>
      ))}
      {loading && <h4 style={{ textAlign: "center" }}>Loading...</h4>}
      <Pagination
        count={10}
        page={page}
        onChange={(e, value) => {
          console.log("Pagee>>>", value);
          loadPosts(value);
          setPage(value);
        }}
      />
    </div>
  );
};

export default Posts;

// [{},{},{},{},{}]
// page1 = (1-1)*10->1-1)*10+10
// page2 = (2-1)*10->(page-1)*10)+10
// page3 = 20->30
//
//
//
// page10 = 90->100
