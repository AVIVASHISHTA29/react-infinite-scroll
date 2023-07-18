import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Posts.css"; // Import the CSS file

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    console.log("Page", page);
    console.log("posts", posts);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
      .then((res) => {
        console.log("res", res.data);
        if (res.data.length === 0) {
          setHasMore(false);
          return;
        }
        setPosts((prevPosts) => [...prevPosts, ...res.data]);
        setPage((prevPage) => prevPage + 1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="posts-container">
      {/* Apply the container style */}
      <InfiniteScroll
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
      </InfiniteScroll>
    </div>
  );
};

export default Posts;
