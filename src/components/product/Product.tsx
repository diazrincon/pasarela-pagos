import React from "react";
import './Product.css';
import {Button, Card} from "react-bootstrap";
import {ProductDetails} from "../shop/Shop";

type ProductProps = {
    productDetails: ProductDetails;
    handlePurchase: (productDetails: ProductDetails) => void;
}

const defaultImageURL = 'https://www.flaticon.es/svg/vstatic/svg/2250/2250401.svg?token=exp=1616347331~hmac=75badb7895a4c7c65d7bfea99786281e';

const Product = ({productDetails, handlePurchase}: ProductProps) => {

    const {imageURL, price, name, description} = productDetails;
    return (
        <Card className={'product'} style={{width: '18rem'}}>
            <Card.Img className={'product__image'} src={imageURL} />
            <Card.Header><h6 className={'product__price'}>${price}</h6></Card.Header>
            <Card.Body>
                <Card.Title className={'product__title'}>{name}</Card.Title>
                <Card.Text className={'product__description'}>{description}</Card.Text>
                <Button variant={'primary'} onClick={() => handlePurchase(productDetails)}>Comprar</Button>
            </Card.Body>
        </Card>
    )
}
export default Product;
