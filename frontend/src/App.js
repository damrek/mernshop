import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import UserListScreen from './screens/UserListScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main style={{ paddingRight: '5%', paddingLeft: '5%' }}>
        <Route path="/order/:id" component={OrderScreen} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/shipping" component={ShippingScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/admin/productlist" component={ProductListScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/admin/userlist" component={UserListScreen} />
        <Route path="/" component={HomeScreen} exact />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
