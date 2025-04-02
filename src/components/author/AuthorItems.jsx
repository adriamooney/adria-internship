import React from "react";
import { Link } from "react-router-dom";

import Card from "../UI/Card";

const AuthorItems = ({item, author}) => {
  return (

          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <Card item={item} author={author}/>
          </div>
       
  );
};

export default AuthorItems;
