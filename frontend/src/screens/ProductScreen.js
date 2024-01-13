import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Image,
  Form
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductDetailsByIdQuery, useCreateReviewMutation } from "../services/api/productsApi";
const ProductScreen = ({ history, match }) => {
  const { isLoading: loading, error, data: product, refetch } = useGetProductDetailsByIdQuery(match.params.id);
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();
  const [qty, setQty] = useState(1);
  const [reviewData, setReviewData] = useState({ rating: 0, comment: "" });
  const userLogin = useSelector((state) => state.userSlice.userLogin)
  const { userInfo } = userLogin;

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        ...reviewData, productId: product._id
      }).unwrap();
      refetch();
      swal("Success", "Review added successfully!", "success");
      setReviewData({ rating: 0, comment: "" });
    } catch (err) {
      err?.data?.message && swal("Error", err.data.message, "error");
    }
  }

  const { comment, rating } = reviewData;
  return (
    <>
      {loading ? (
        <h1>
          <Loader />
        </h1>
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          {" "}
          <Link className="btn btn-light my-3" to="/">
            Go Back
          </Link>
          {product && (
            <>
              <Row>
                <Col md={6}>
                  <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <a href="#review">  <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      /></a>
                    </ListGroup.Item>
                    <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                    <ListGroup.Item>
                      Description: {product.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={3}>
                  <Card>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Price :</Col>
                          <Col>
                            <strong> ${product.price}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Status :</Col>
                          <Col>
                            <strong>
                              {" "}
                              {product.countInStock > 0
                                ? "In Stock"
                                : "Out Of Stock"}
                            </strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>Qty</Col>
                            <Col>
                              <Form.Control
                                as="select"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}
                      <ListGroup.Item>
                        <Button
                          className="btn-block"
                          type="button"
                          disabled={product.countInStock === 0}
                          onClick={addToCartHandler}
                        >
                          Add To Cart
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
              <Row className="review" id="review">
                <Col md={6}>
                  <h2>Reviews</h2>
                  {product.reviews.length === 0 && <Message>No Reviews</Message>}
                  <ListGroup variant="flush">
                    {product.reviews.map((review) => {
                      return <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{review.comment}</p>
                        <p>{review.createdAt.substring(0, 10)}</p>
                      </ListGroup.Item>
                    })}
                  </ListGroup>
                </Col>
                <Col>
                <ListGroup.Item>
                    <h4>Leave a review if you liked the product.</h4>
                    {loadingProductReview && <Loader />}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating" className="my-2">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control as="select" value={rating} onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}>
                            <option value="">Select</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair </option>
                            <option value="3">3 - Good </option>
                            <option value="4">4 - Very Good </option>
                            <option value="5">5 - Excellent </option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment" className="my-2">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control as="textarea" value={comment} onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}>
                          </Form.Control>
                        </Form.Group>
                        <Button disabled={loadingProductReview} type="submit" variant="primary" >Submit</Button>

                      </Form>) : (<Message>
                        Please <Link to="/login">Sign in</Link> to write a review.
                      </Message>)}
                  </ListGroup.Item>
                </Col>
              </Row>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProductScreen;
