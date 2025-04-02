import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Card from "../UI/Card";

const ExploreItems = ({ items, changeFilter}) => {

  const [loadedItems, setLoadedItems] = useState(items);
  const totalItemsLength = items.length;
 
  function loadMore() {

    const nextItems = loadedItems.length + 4;
    setLoadedItems( items.slice(0, nextItems ))

  }


  useEffect(() => {
    setLoadedItems(items.slice(0,8))
  }, [items])


  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => changeFilter(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loadedItems.map((item, index) => {
        if (item)
          return (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Card item={item} />
            </div>
          );
      })}
      <div className="col-md-12 text-center">
        {loadedItems.length + 4 <= totalItemsLength &&
        <Link to="" id="loadmore" className="btn-main lead" onClick={loadMore}>
          Load more
        </Link> 
        }
      </div>
    </>
  );
};

export default ExploreItems;
