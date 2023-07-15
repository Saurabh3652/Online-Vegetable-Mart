import {Container} from 'react-bootstrap'
import React from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screen/HomeScreen.js'
import{BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Vegetable_screen from './screen/Vegetable_screen.js';
import CartScreen from './screen/CartScreen.js';
import LoginScreen from './screen/LoginScreen.js';
import RegisterScreen from './screen/RegisterScreen.js';
import ProfileScreen from './screen/ProfileScreen.js';
import ShippingScreen from './screen/ShippingScreen.js';
import PaymentScreen from './screen/PaymentScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import OrderScreen from './screen/OrderScreen';
import UserListScreen from './screen/UserListScreen';
function App() {
  return (
    <Router>
      <Header/>
        <main className='py-3'>
          <Container>
            <Routes>
            <Route path='/login' element={<LoginScreen/>}/>
            <Route path='/shipping' element={<ShippingScreen/>}/>
            <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
            <Route path='/orders/:id' element={<OrderScreen/>}/>
            <Route path='/payment' element={<PaymentScreen/>}/>
            <Route path='/register' element={<RegisterScreen/>}/>
            <Route path='/profile' element={<ProfileScreen/>}/>
            <Route path='/veg/:id' element={<Vegetable_screen/>}/>
            <Route path='/cart/:id?' element={<CartScreen/>}/>
            <Route path='/admin/userList' element={<UserListScreen/>}/>
            <Route exact path='/' element={<HomeScreen/>}  />
            </Routes>
          </Container>
        </main>
      <Footer/>
    </Router>
  );
}

export default App;
