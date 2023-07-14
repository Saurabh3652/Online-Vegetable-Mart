import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress} from '../action/cartActions.js'
import FormContainer from '../components/FormContainer.js';
import CheckoutSteps from '../components/CheckoutSteps.js';
import { Link } from 'react-router-dom';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress ? shippingAddress.address : '');
  const [city, setCity] = useState(shippingAddress ? shippingAddress.city : '');
  const [postalCode, setPostalCode] = useState(shippingAddress ? shippingAddress.postalCode : '');
  const [country, setCountry] = useState(shippingAddress ? shippingAddress.country : '');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    // navigate('/payment'); // Commented out to avoid error since `navigate` is not defined
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='address'
            placeholder='Enter address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='city'
            placeholder='Enter city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label>PostalCode</Form.Label>
          <Form.Control
            type='postalCode'
            placeholder='Enter postalCode'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='country'
            placeholder='Enter country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button variant='primary' type='submit'>
         <Link to='/payment'>Continue</Link>
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
