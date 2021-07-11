import React from "react";
import "./Product.css";

const product = (props) => {
  // logic for stars counting
  let stars = [];
  let starsCount = Math.ceil(props.product.rating);

  for (let i = 0; i < starsCount; i++) {
    stars.push(<span key={i} className="fa fa-star checked"></span>);
  }

  let noStars = [];
  let diff = 5 - starsCount;

  for (let j = 0; j < diff; j++) {
    noStars.push(<span key={j + 5} className="fa fa-star"></span>);
  }

  // getting retail price
  let old = null;

  if (props.product.price_old) {
    old = <span>MP cena: {parseInt(props.product.price_old)} RSD</span>;
  }

  //logic for saving price part
  let saving = null;

  if (props.product.saving) {
    saving = (
      <div className="saving">
        Ušteda: <br />
        <span>{parseInt(props.product.saving)} RSD</span>
      </div>
    );
  }

  if (
    !props.product.saving &&
    props.product.shock === 1 &&
    props.product.top === 0
  ) {
    saving = (
      <div className="saving">
        <span>ŠOK CENA</span>
      </div>
    );
  }

  if (
    !props.product.saving &&
    props.product.shock === 1 &&
    props.product.top === 1
  ) {
    saving = (
      <div className="saving">
        <span>TOP ARTIKAL</span>
      </div>
    );
  }

  // checking for additiona information
  let shock = null;

  if (
    props.product.saving &&
    props.product.shock === 1 &&
    props.product.top === 0
  ) {
    shock = <span>Šok cena</span>;
  }

  let top = null;

  if (
    props.product.saving &&
    props.product.shock === 1 &&
    props.product.top === 1
  ) {
    top = <span>Top artikal</span>;
  }

  let specifications = props.product.specifications.map((specification) => {
    return (
      <span key={specification.id}>
        {specification.name}: {specification.value}
      </span>
    );
  });

  console.log(specifications);

  return (
    <div className="product">
      <div className="product_img">
        <img
          alt={props.product.name}
          src={props.product.small_image}
          srcSet={`${props.product.small_image} 490w, ${props.product.image} 768w, ${props.product.big_image} 1280w`}
        />
      </div>
      <div className="product_content">
        {stars}
        {noStars} ({props.product.votes})
        <h3>{props.product.name}</h3>
        <div className="product_specification">
          {specifications}
        </div>
        <div className="product_content_price">
          {old}
          <div className="product_content_price_block">
            <div className="product_content_price_block_left">
              RSD
              <br />
              <span>{parseInt(props.product.price)}</span>
            </div>
            <div className="product_content_price_block_right">{saving}</div>
          </div>
          <div className="product_add">
            {top}
            {shock}
          </div>
        </div>
      </div>
    </div>
  );
};

export default product;
