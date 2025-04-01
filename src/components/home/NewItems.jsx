import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const NewItems = ({ Slider }) => {
  const [newItems, setNewItems] = useState([]);
  const newItemsSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
    centerMode: false,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  function formatTime(time) {

    const timeLeftMs = time - Date.now();

    if(timeLeftMs <= 0) {
      return 'EXPIRED';
    }

    const totalSeconds = Math.floor(timeLeftMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
  
    return `${hours}h ${minutes}m ${seconds}s`;
  
  }

  async function fetchNewItems() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );
    setNewItems(data);
  }

  function updateDate(newItems) {
    if(newItems.length > 0) {
    setNewItems(newItems.map(item => {
      if(item.expiryDate) {
        return {
          ...item,
          formattedDate: formatTime(item.expiryDate)
        }
      }
      else {
        return item;
      }
      }))
    }

  }

  useEffect(() => {
    setTimeout(() => {
      fetchNewItems();
    }, 5000); //set time out to view skeleton loading
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateDate(newItems); //one second interval with updated time for countdown timer
    }, 1000);
    return () => clearInterval(intervalId);
  }, [newItems]);


  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {newItems && newItems.length > 0 ? (  <Slider {...newItemsSettings}>
            {newItems.map((item, index) => {
              return (
              <div className="nft__item" key={index}>
                
                  <div className="author_list_pp">
                    <Link
                      to="/author"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                    >
                      <img className="lazy" src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  {item.formattedDate && <div className="de_countdown">{item.formattedDate}</div>}
  
                  <div className="nft__item_wrap">
                    {/* <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div> */}
  
                    <Link to="/item-details">
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">{item.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                
              </div>
              );
            })}
          </Slider> ) : ( <Slider {...newItemsSettings}>
          {new Array(4).fill(0).map((_, index) => (
        
              <div className="nft__item" key={index}>
                <div className="author_list_pp">
                    <div className="lazy skeleton-box" style={{width: '55px',height:'55px',borderRadius: '50%'}}></div>
                    <i className="fa fa-check"></i>
                </div>
                <div className="nft__item_wrap skeleton-box" style={{width: '100%',height:'174px', marginBottom: '12px'}}>
                </div>
                <div className="nft__item_info">
                    <h4 className="skeleton-box" style={{width: '80%'}}></h4>
                  <div className="nft__item_price skeleton-box" style={{width: '50%'}}></div>
                </div>
              </div>

          ))}
          </Slider>)}
        
        </div>
      </div>
    </section>
  );
};

export default NewItems;
