import React, {useState} from "react";
import './PurchaseForm.css';
import {Button, Col, Form, Modal} from "react-bootstrap";
import {ClientDetails, TransactionDetails, PurchaseDetails, ProductDetails} from "../shop/Shop";

type PurchaseFormProps = {
    productDetails: ProductDetails;
    clientDetails: ClientDetails;
    purchaseDetails: PurchaseDetails;
    transactionDetails: TransactionDetails
    showStatus?: boolean;
    handleClose: () => void;
}

const PurchaseForm = ({showStatus, handleClose, productDetails, clientDetails, purchaseDetails, transactionDetails}: PurchaseFormProps) => {

    const upayURL = 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu';

    return (
        <Modal show={showStatus} onHide={handleClose} backdrop="static" keyboard={false} className={'purchase-form'}>
            <Modal.Header>
                Comprar
            </Modal.Header>
            <Modal.Body>
                <Form id='upay-form' method='post' action={upayURL}>
                    <Form.Group controlId="merchantId">
                        <Form.Label>Identificador del comercio</Form.Label>
                        <Form.Control readOnly type="number" placeholder="Ingrese el identificador del comercio" value={purchaseDetails.merchantId}/>
                        <Form.Text className="text-muted">
                            Es el número identificador del comercio en el sistema de PayU, este número lo encontrarás en el correo de creación de la cuenta.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="referenceCode">
                        <Form.Label>Código de referencia</Form.Label>
                        <Form.Control readOnly value={purchaseDetails.referenceCode} type="text" placeholder="Ingrese el código de referencia" />
                        <Form.Text className="text-muted">
                            Es la referencia de la venta o pedido. Deber ser único por cada transacción que se envía al sistema. Normalmente es una forma de que identifiques las peticiones que se envían a la pasarela de pagos.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control readOnly value={transactionDetails.description} type="text" placeholder="Ingrese la descripción de la venta" />
                        <Form.Text className="text-muted">
                            Es la descripción de la venta.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="amount">
                        <Form.Label>Valor</Form.Label>
                        <Form.Control readOnly value={transactionDetails.amount} type="number" placeholder="Ingrese un valor númerico" />
                        <Form.Text className="text-muted">
                            Es el monto total de la transacción. Puede contener dos dígitos decimales. Ej. 10000.00 ó 10000.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="tax">
                        <Form.Label>Impuesto</Form.Label>
                        <Form.Control readOnly value={transactionDetails.tax} type="number" placeholder="Ingrese un valor numérico" />
                        <Form.Text className="text-muted">
                            Es el valor del IVA (Impuesto al Valor Agregado solo valido para Colombia) de la transacción, si se envía el IVA nulo el sistema aplicará el 19% automáticamente. Puede contener dos dígitos decimales. Ej: 19000.00. En caso de no tener IVA debe enviarse en 0.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="taxReturnBase">
                        <Form.Label>Base de retorno del impuesto</Form.Label>
                        <Form.Control readOnly value={transactionDetails.taxReturnBase} type="number" placeholder="Ingrese un valor numérico" />
                        <Form.Text className="text-muted">
                            Es el valor base sobre el cual se calcula el IVA (solo valido para Colombia). En caso de que no tenga IVA debe enviarse en 0.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="signature">
                        <Form.Label>Firma digital</Form.Label>
                        <Form.Control readOnly value={purchaseDetails.signature} type="text" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            Es la firma digital creada para cada uno de las transacciones.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="accountId">
                        <Form.Label>Identificador de la cuenta</Form.Label>
                        <Form.Control readOnly value={purchaseDetails.accountId} type="number" placeholder="Ingrese el identificador de la cuenta" />
                        <Form.Text className="text-muted">
                            Identificador de la cuenta del usuario para cada país que tenga asociado el comercio, al enviarla se despliegan solo los medios de pago pertenecientes a dicho país.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="currency">
                        <Form.Label>Moneda</Form.Label>
                        <Form.Control as="select" defaultValue="COP">
                            <option value='ARS'>Peso Argentino</option>
                            <option value='BRL'>Real Brasileño</option>
                            <option value='CLP'>Peso Chileno</option>
                            <option value='COP'>Peso Colombiano</option>
                            <option value='MXN'>Peso Mexicano</option>
                            <option value='PEN'>Nuevo Sol Peruano</option>
                            <option value='USD'>Dólar Americano</option>
                        </Form.Control>
                        <Form.Text className="text-muted">
                            La moneda respectiva en la que se realiza el pago. El proceso de conciliación se hace en pesos a la tasa representativa del día.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="buyerFullName">
                        <Form.Label>Nombre completo</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese su nombre completo" />
                        <Form.Text className="text-muted">
                            Nombre completo del comprador.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="buyerEmail">
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control type="email" placeholder="Ingrese un correo electrónico" />
                        <Form.Text className="text-muted">
                            Campo que contiene el correo electrónico del comprador para notificarle el resultado de la transacción por correo electrónico. Se recomienda hacer una validación si se toma este dato en un formulario.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="shippingAddress">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese una dirección" />
                        <Form.Text className="text-muted">
                            La dirección de entrega de la mercancía.
                        </Form.Text>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="shippingCity">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese el nombre de la ciudad" />
                            <Form.Text className="text-muted">
                                La Ciudad de entrega de la mercancía.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} controlId="shippingCountry">
                            <Form.Label>País</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese el ISO del país" />
                            <Form.Text className="text-muted">
                                El código ISO del país de entrega de la mercancía.
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="telephone">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese un número de teléfono" />
                        <Form.Text className="text-muted">
                            El teléfono de residencia del comprador.
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" form='upay-form' type={'submit'}>Confirmar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PurchaseForm;
