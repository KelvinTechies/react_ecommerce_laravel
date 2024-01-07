import React from "react";
import { NavLink } from "react-router-dom";

function Category({ name, slug, id, img }) {
  return (
    <div className="product-category " data-animation-name="fadeInUpShorter">
      <NavLink to={`collections/${slug}`}>
        <figure>
          <div className="imgbx">
            <img
              src={`http://localhost:8000/${img}`}
              alt="category"
              width="100%"
              height="100%"
            />
          </div>
        </figure>
        <div className="category-content">
          <h3>{name} </h3>
          <span>
            <mark className="count">3</mark> products
          </span>
        </div>
      </NavLink>
    </div>
  );
}

export default Category;
