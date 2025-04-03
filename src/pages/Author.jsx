import React, { useState, useEffect } from "react";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import SkeletonCard from "../components/UI/SkeletonCard";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState([]);
  const [followers, setFollowers] = useState(null);
  const [authorFollowed, setAuthorFollowed] = useState(false);

  async function fetchAuthor() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthor(data);
    setFollowers(data.followers);
  }

  function toggleFollowAuthor() {
    if (authorFollowed === true) {
      setAuthorFollowed(false);
      setFollowers(followers - 1);
    } else {
      setAuthorFollowed(true);
      setFollowers(followers + 1);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fetchAuthor();
    }, 300);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{
            background: `url(${
              author.nftCollection && author.nftCollection[0].nftImage
            }) top`,
          }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {author.authorImage ? (
                        <img src={author.authorImage} alt="" />
                      ) : (
                        <Skeleton
                          width="140px"
                          height="140px"
                          borderRadius="50%"
                        />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          { author.authorName || <Skeleton width="160px" height="24px" /> }
                          <span className="profile_username">
                            {author.tag ? (
                              `@'${author.tag}`
                            ) : (
                              <Skeleton width="100px" height="18px" />
                            )}
                          </span>
                          {author.address ? (
                            <>
                              <span id="wallet" className="profile_wallet">
                                ${author.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </>
                          ) : (
                            <Skeleton width="160px" height="18px" />
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {followers ? (
                        <>
                          <div className="profile_follower">
                            {followers} followers
                          </div>

                          <Link
                            to="#"
                            className="btn-main"
                            onClick={toggleFollowAuthor}
                          >
                            {authorFollowed ? "Unfollow" : "Follow"}
                          </Link>
                        </>
                      ) : (
                        <Skeleton
                          width="130px"
                          height="42px"
                          borderRadius="8px"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <div className="de_tab_content">
                    <div className="tab-1">
                      <div className="row">
                        {author.nftCollection
                          ? author.nftCollection.map((item) => {
                              return (
                                <AuthorItems
                                  item={item}
                                  key={item.id}
                                  author={author}
                                />
                              );
                            })
                          : new Array(4).fill(0).map((_, index) => (
                              <div
                                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                                key={index}
                              >
                                <SkeletonCard />
                              </div>
                            ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
