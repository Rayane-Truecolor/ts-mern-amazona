import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductDetailsBySlugQuery } from '../hooks/productHooks';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { convertProductToCartItem, getError } from '../utils';
import { Row, Col, Badge, Button, Card, ListGroup } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useContext } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';


export default function ProductPage() {
  const params = useParams()
  const { slug } = params
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!)

  const { state, dispatch } = useContext(Store)
  const { cart } = state

  const navigate = useNavigate()

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === product!._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    if (product!.countInStock < quantity) {
      toast.warn('Sorry. Product is out of stock')
      return
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...convertProductToCartItem(product!), quantity },
    })
    toast.success('Product added to the cart')
    navigate('/cart')
  }

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error)}</MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">Product Not Found</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Product Page</title>
      </Helmet>
      <Row>
        {/*1éme bloc */}
        <Col md={6}>
          <img className="large" src={product.image} alt={product.name}></img>
        </Col>

        {/*2éme bloc */}
        <Col md={3}>
          <ListGroup variant="flush">
            {/*Nom des produits */}
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            {/*Notation étoile et review des produits */}
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>
            {/*Prix des produits */}
            <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
            {/*Description des produits */}
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/*3éme bloc */}
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant="primary">
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
