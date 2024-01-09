import React from "react";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import LazyLoad from "react-lazy-load";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Products({ name, slug, id, img, selling_price, original_price, qty }) {
  return (
    <>
      {/* <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={150}
        slidesPerView={5}
        navigation
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      > */}
      {/* <SwiperSlide> */}
      <div
        className="product-default "
        data-animation-name="fadeInRightShorter"
      >
        <figure>
          <NavLink to={`product_detail/${id}`}>
            <div className="imgbx">
              {/* <img
                  loading="lazy"
                  
                  alt="product"
                /> */}
              <LazyLoadImage
                effect="blur"
                src={`http://localhost:8000/${img}`}
                key={img}
                placeholderSrc="assets/images/products/product-1-2.jpg"
              />
            </div>
            <img src={`http://localhost:8000/${img}`} alt="product" />
          </NavLink>
          <div className="label-group">
            <div className="product-label label-sale">-20%</div>
          </div>
        </figure>
        <div className="product-details">
          <div className="category-list">
            <NavLink to="category.html" className="product-category">
              Category
            </NavLink>
          </div>
          <h3 className="product-title">
            <NavLink to="">{name}</NavLink>
          </h3>
          <div className="ratings-container">
            <div className="product-ratings">
              <span className="ratings" style={{ width: "80%" }} />
              <span className="tooltiptext tooltip-top" />
            </div>
          </div>
          <div className="price-box">
            <del className="old-price">${original_price} </del>
            <span className="product-price">${selling_price} </span>
          </div>
          <div className="product-action">
            <NavLink
              to="wishlist.html"
              className="btn-icon-wish"
              title="wishlist"
            >
              <i className="icon-heart" />
            </NavLink>
            <NavLink to="" className="btn-icon btn-add-cart">
              <i className="fa fa-arrow-right" />
              <span>SELECT OPTIONS</span>
            </NavLink>
            <NavLink
              to="ajax/product-quick-view.html"
              className="btn-quickview"
              title="Quick View"
            >
              <i className="fas fa-external-link-alt" />
            </NavLink>
          </div>
        </div>
      </div>
      {/* </SwiperSlide> */}
      {/* </Swiper> */}
    </>
  );
}

export default Products;
