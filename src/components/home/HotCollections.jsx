import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HotCollections = ({Slider, sliderSettings}) => {
  const [hotCollection, setHotCollection] = useState([]);
  

  async function fetchHotCollection() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    setHotCollection(data);
  }

  useEffect(() => {
    setTimeout(() => {
      fetchHotCollection();
    }, 300); //set time out to view skeleton loading
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {hotCollection && hotCollection.length > 0 ? (
            <Slider {...sliderSettings}>
              {hotCollection.map((item, index) => {
                return (
                  <div className="nft_coll" key={index}>
                    <div className="nft_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{item.title}</h4>
                      </Link>
                      <span>ERC-{item.code}</span>
                    </div>
                  </div>
                );
              })}
            </Slider>
          ) : (
            <Slider {...sliderSettings}> {new Array(4).fill(0).map((_, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap skeleton-box" style={{width: '100%',height:'174px'}}>
                  </div>
                  <div className="nft_coll_pp skeleton-box" style={{borderRadius: '50%', width: '55px', height: '55px', 'overflow': 'visible'}}>
                    <i className="fa fa-check"></i>
                  </div>
                  <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div className="nft_coll_info skeleton-box" style={{width:'80px'}}>
                    </div>
                    <div className="skeleton-box" style={{width:'40px', marginTop: '8px', marginBottom: '16px'}}></div>
                  </div>
                </div>
            ))}</Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
