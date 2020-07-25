import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useQuery } from "react-query";
import axios from "axios";

import Sidebar from "../layout/Sidebar";

import "./PostList.css";

function PostList() {
  const { data: posts } = useQuery("/post/all", () =>
    axios.get("/api/post/all")
  );
  const { data: tags } = useQuery("/tag/all");
  // console.log("RENDER");

  return (
    <div className="container">
      <Sidebar />
      <article className="post-container">
        {!!tags && (
          <div className="tags-cloud">
            {tags.data.map((tag) => (
              <Link
                key={tag._id}
                to={`/tag/${tag.slug}`}
                className={`bg-${tag.slug}`}
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}
        <ul className="post-list">
          {!!posts &&
            posts.data.map((post) => (
              <li key={post.cuid} className="post-item">
                <Link to={`/post/${post.slug}-${post.cuid}`}>
                  <h3 className="title">{post.title}</h3>
                  <p className="subtitle">{post.subtitle}</p>
                </Link>
                <div className="date-tag">
                  <Moment format="MMM DD YYYY">{post.dateAdded}</Moment>
                  <div className="tag">
                    <Link
                      className={`button-tag bg-${post.tag.slug}`}
                      to={`/tag/${post.tag.slug}`}
                    >
                      {post.tag.name}
                    </Link>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </article>
    </div>
  );
}

export default PostList;
