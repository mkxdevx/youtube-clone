import React, { useEffect, useState } from "react";
import "./Feed.css";
import { Link } from "react-router-dom";
import { API_KEY, valueConverter } from "../../data";
import axios from "axios";
import moment from "moment";

const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  async function fetchData() {
    const videoList = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`,
    );
    const { items } = videoList.data;
    setData(items);
  }

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {data &&
        data.map((item, index) => {
          return (
            <Link
              to={`video/${item.snippet.categoryId}/${item.id}`}
              className="card"
              key={index}
            >
              <img src={item.snippet.thumbnails.medium.url} alt="" />
              <h2>
                {item.snippet.title}
              </h2>
              <h3>{item.snippet.channelTitle}</h3>
              <p>{valueConverter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
            </Link>
          );
        })}
    </div>
  );
};

export default Feed;
