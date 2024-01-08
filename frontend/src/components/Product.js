import React from "react";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Rating from "../components/Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <LinkContainer
        to={`/product/${product._id}`}
        style={{ cursor: "pointer" }}
      >
        <Card.Img src={product.image?product.image:''} variant="top" className="img-resize"/>
      </LinkContainer>

      <Card.Body>
        <LinkContainer
          to={`/product/${product._id}`}
          style={{ cursor: "pointer" }}
        >
          <Card.Title as="div" className="wrap-text">
            <strong>{product.name}</strong>
          </Card.Title>
        </LinkContainer>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
