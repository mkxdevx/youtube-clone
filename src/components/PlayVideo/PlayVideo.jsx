import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY, valueConverter } from "../../data";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";

const PlayVideo = () => {
  const { videoId } = useParams();
  const characterLimit = 310;

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const [desIsExpanded, setDesIsExpanded] = useState(false);
  const [commentIsExpanded, setCommentIsExpanded] = useState(false);

  async function fetchVideoData() {
    // fetching videos data
    const videoDetails = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`,
    );
    const { items } = videoDetails.data;
    setApiData(items[0]);
  }

  async function fetchOtherData() {
    // fetching channel data
    const channelDetails = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData && apiData.snippet.channelId}&key=${API_KEY}`,
    );
    const { items } = channelDetails.data;
    if (items && items.length > 0) {
      setChannelData(items[0]);
    }

    const commentDetails = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`,
    );

    setCommentData(commentDetails.data.items);
  }

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  return (
    <div className="play-video">
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3>{apiData && apiData.snippet.title}</h3>
      <div className="play-video-info">
        <p>
          {apiData && valueConverter(apiData.statistics.viewCount)} views &bull;
          {apiData && moment(apiData.snippet.publishedAt).fromNow()}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData && valueConverter(apiData.statistics.likeCount)}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" /> Share
          </span>
          <span>
            <img src={save} alt="" /> Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData && channelData.snippet.thumbnails.default.url}
          alt=""
        />
        <div>
          <p>{apiData && apiData.snippet.channelTitle}</p>
          <span>
            {channelData &&
              valueConverter(channelData.statistics.subscriberCount)}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>
          {apiData &&
            (desIsExpanded
              ? `${apiData.snippet.description}`
              : `${apiData.snippet.description.slice(0, characterLimit)}`)}
        </p>
        <div className="center">
          <button
            className={`toggle-button ${characterLimit >= (apiData && apiData.snippet.description.length) && "hide-button"}`}
            onClick={() => setDesIsExpanded(!desIsExpanded)}
          >
            {desIsExpanded ? "Hide" : "Show More"}
          </button>
        </div>
        <hr />
        <h4>
          {apiData &&
            (+apiData.statistics.commentCount !== 1
              ? valueConverter(apiData.statistics.commentCount) + " comments"
              : apiData.statistics.commentCount + " comment")}
        </h4>
        {commentIsExpanded
          ? commentData.map((item, index) => (
              <div className="comment" key={index}>
                <img
                  src={
                    item.snippet.topLevelComment.snippet
                      .authorProfileImageUrl || { user_profile }
                  }
                  alt=""
                />
                <div>
                  <h3>
                    {item.snippet.topLevelComment.snippet.authorDisplayName}
                    <span>
                      {moment(item.snippet.topLevelComment.updatedAt).fromNow()}
                    </span>
                  </h3>
                  <p>{item.snippet.topLevelComment.snippet.textOriginal}</p>
                  <div className="comment-action">
                    <img src={like} alt="" />
                    <span>
                      {valueConverter(
                        item.snippet.topLevelComment.snippet.likeCount,
                      )}
                    </span>
                    <img src={dislike} alt="" />
                  </div>
                </div>
              </div>
            ))
          : commentData.slice(0, 2).map((item, index) => (
              <div className="comment" key={index}>
                <img
                  src={
                    item.snippet.topLevelComment.snippet
                      .authorProfileImageUrl || { user_profile }
                  }
                  alt=""
                />
                <div>
                  <h3>
                    {item.snippet.topLevelComment.snippet.authorDisplayName}
                    <span>
                      {moment(item.snippet.topLevelComment.updatedAt).fromNow()}
                    </span>
                  </h3>
                  <p>{item.snippet.topLevelComment.snippet.textOriginal}</p>
                  <div className="comment-action">
                    <img src={like} alt="" />
                    <span>
                      {valueConverter(
                        item.snippet.topLevelComment.snippet.likeCount,
                      )}
                    </span>
                    <img src={dislike} alt="" />
                  </div>
                </div>
              </div>
            ))}
        <div className="comment-btn">
          <button onClick={() => setCommentIsExpanded(!commentIsExpanded)}>
            {commentIsExpanded ? "Hide" : "Show More"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
