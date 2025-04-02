import React, { useEffect, useState } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";
import axios from 'axios';
import SkeletonCard from "../components/UI/SkeletonCard";

const Explore = () => {

  const [exploreItems, setExploreItems] = useState([]);

  async function fetchExporeItems(filter) {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
    );
    setExploreItems(data);
    console.log(exploreItems);
  }

  function changeFilter(filter) {
    fetchExporeItems(filter)
  }

  useEffect(() => {
    setTimeout(() => {
    //window.scrollTo(0, 0);
    fetchExporeItems('');
  }, 500); //set time out to view skeleton loading
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section">
          <div className="container">
            <div className="row">

             {exploreItems && exploreItems.length > 0 ? <ExploreItems changeFilter={changeFilter} items={exploreItems} /> : new Array(8)
                  .fill(0)
                  .map((_, index) => <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}><SkeletonCard /></div>)}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
