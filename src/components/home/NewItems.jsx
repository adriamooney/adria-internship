import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../UI/Card";
import SkeletonCard from "../UI/SkeletonCard";

const NewItems = ({ Slider, sliderSettings }) => {
  const [newItems, setNewItems] = useState([]);

  async function fetchNewItems() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );
    setNewItems(data);
  }

  useEffect(() => {
    setTimeout(() => {
      fetchNewItems();
    }, 300); //set time out to view skeleton loading
  }, []);

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
          <Slider {...sliderSettings}>
            {newItems && newItems.length > 0
              ? newItems.map((item) => {
                  return <Card item={item} key={item.id}/>;
                })
              : new Array(4)
                  .fill(0)
                  .map((_, index) => <SkeletonCard key={index}/>)}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
