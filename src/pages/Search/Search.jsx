import React, { useEffect, useState } from "react";
import "./Search.css";
import thumbnail1 from "../../assets/thumbnail1.png";
import { Link, useOutletContext, useSearchParams } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../../data";
import moment from "moment";
import { decodeHTMLEntities } from "../../data";

const Search = () => {
  const { sidebar } = useOutletContext();
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const searchQuery = searchParams.get("q");

  async function fetchSearchData() {
    if (!searchQuery) {
      return;
    }

    const resultsData = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&key=${API_KEY}`,
    );
    const { items } = resultsData.data;
    setResults(items);
  }

  useEffect(() => {
    fetchSearchData();
  }, [searchQuery]);

  return (
    <div className={`search-results ${sidebar || "large-search-results"}`}>
      {results &&
        results.map((item, index) => {
          const videoId = item.id.videoId;
          const categoryId = item.snippet.categoryId || "0";
          if (!videoId) {
            return;
          }
          return (
            <Link to={`/video/${categoryId}/${videoId}`} key={index}>
              {" "}
              <div className="video-card">
                <img
                  src={item.snippet.thumbnails.medium.url || thumbnail1}
                  alt=""
                />
                <div className="video-description">
                  <h2>{decodeHTMLEntities(item.snippet.title)}</h2>
                  <p>{moment(item.snippet.publishedAt).fromNow()}</p>
                  <h3>{item.snippet.channelTitle}</h3>
                  <p>{item.snippet.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default Search;
