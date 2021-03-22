import React, {useState} from "react";
import './Shop.css'

import products from './products.json';
import Product from "../product/Product";
import {Container} from "react-bootstrap";
import PurchaseForm from "../purchaseForm/PurchaseForm";

interface TransactionDetails {
    description: string;
    amount: number;
    tax: number;
    taxReturnBase: number;
}

interface PurchaseDetails {
    merchantId: number;
    referenceCode: string;
    signature: string;
    accountId: number;
    currency: 'ARS' | 'BRL' | 'CLP' | 'COP' | 'MXN' | 'PEN' | 'USD';
}

interface ClientDetails {
    buyerFullName: string;
    buyerEmail: string;
    shippingAddress: string;
    shippingCity: string;
    shippingCountry: string;
    telephone: string;
}

interface ProductDetails {
    uid: string;
    name: string;
    description: string;
    price: number;
    imageURL: string;
}

const Shop = () => {

    const purchaseDetails: PurchaseDetails = {
        merchantId: 508029,
        referenceCode: 'TestPayU',
        signature: 'signature',
        accountId: 512321,
        currency: 'COP'
    }

    const clientDetails: ClientDetails = {
        buyerFullName: 'José Manuel Díaz Rincón',
        buyerEmail: 'mail@diazrincon.dev',
        shippingAddress: 'Carrera 3B # 38 - 44',
        shippingCity: 'Tunja',
        shippingCountry: 'CO',
        telephone: '3144068227'
    }

    const defaultTransaction: TransactionDetails = {
        amount: 0, description: "", tax: 0, taxReturnBase: 0
    }

    const defaultProduct: ProductDetails = {
        description: "", imageURL: "", name: "", price: 0, uid: ""
    }

    const [client, setClient] = useState<ClientDetails>(clientDetails);
    const [purchase, setPurchase] = useState<PurchaseDetails>(purchaseDetails);
    const [transaction, setTransaction] = useState<TransactionDetails>(defaultTransaction);
    const [selectedProduct, setSelectedProduct] = useState<ProductDetails>(defaultProduct);

    const [formShow, setFormShow] = useState(false);

    const handlePurchase = (product: ProductDetails) => {
        setSelectedProduct(product)
        setTransaction({
            amount: 1, description: product.description, tax: 0, taxReturnBase: 0
        })
        const apiKey = '4Vj8eK4rloUd272L48hsrarnUA';
        //ApiKey~merchantId~referenceCode~amount~currency
        const md5Sign = `${apiKey}~${purchase.merchantId}~${purchase.referenceCode}~${transaction.amount}~${purchase.currency}`;
        fetch(`https://api.hashify.net/hash/md5/hex?value=${md5Sign}`)
            .then(response => response.json())
            .then(data => {
                const aux = purchase;
                aux.signature = data.Digest;
                console.log(aux.signature)
                setPurchase(aux)
                setFormShow(true)
            })
    };
    const handleClose = () => setFormShow(false);

    return (<Container className={'shop'}>
        <Container fluid className={'shop__products'}>
            {products.map(
                (product) =>
                    <Product handlePurchase={handlePurchase} productDetails={product}/>
            )}
        </Container>
        <PurchaseForm handleClose={handleClose} showStatus={formShow} clientDetails={client} purchaseDetails={purchase}
                      productDetails={selectedProduct} transactionDetails={transaction}/>
    </Container>);
}

export default Shop;

export type {ClientDetails, TransactionDetails, PurchaseDetails, ProductDetails};
