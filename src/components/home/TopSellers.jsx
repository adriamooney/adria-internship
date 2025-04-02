import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {

  const [topSellers, setTopSellers] = useState([]);

  async function fetchTopSellers() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
    );
    setTopSellers(data);
  }

  useEffect(() => {
    fetchTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {topSellers && topSellers.length > 0 ? (topSellers.map((item, index) => {
                return (
                  <li key={index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={item.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${item.authorId}`}>{item.authorName}</Link>
                    <span>{item.price} ETH</span>
                  </div>
                </li>
                )
              })) : ( new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <div className="pp-author skeleton-box"  style={{width: '55px',height:'55px',borderRadius: '50%'}}></div>
                      <i className="fa fa-check"></i>
                  </div>
                  <div className="author_list_info">
                    <div className="skeleton-box" style={{width: '100px',height:'20px', marginBottom: '8px', display: 'block'}}></div>
                    <div className="skeleton-box" style={{width: '45px',height:'20px'}}></div>
                  </div>
                </li>
              )))}
             
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
