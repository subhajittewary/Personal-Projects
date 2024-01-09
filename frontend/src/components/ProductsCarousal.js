import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import Loader from './Loader';
import { useGetTopProductsQuery } from '../services/api/productsApi';

const ProductsCarousal = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery();
    console.log("data",products)
    return isLoading ? <Loader /> : error ? <Message>{error}</Message> : (
        <Carousel pause="hover" className='bg-primary mb-4'>
            { products.map((product) => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid />
                            <Carousel.Caption className="carousel-caption">
                                <h2>
                                    {product.name} (${product.price})
                                </h2>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
            )) }

        </Carousel>
    )
}

export default ProductsCarousal