import React, { Component } from 'react';
import Navbar from './components/navbar';
import ProductList from './pages/product-list';
import ProductPage from './pages/product-page';
import CartPage from './pages/cart-page';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {store} from "./store"
import ThankYou from './pages/thank-you';
import Error from './pages/error';





class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currency : store.getState().currency,
        localId : store.getState().currentId
    }
    store.subscribe(()=>{
  this.setState({localId: store.getState().currentId, currency: store.getState().currency})
})


}

  render() {
    return (
      <>
      
      <Router>
        
      <Navbar currency={this.state.currency}/>
      <Switch>
      <Route exact path="/">
      <ProductList data={this.props.data} currency={this.state.currency}/>
      </Route>
      <Route path={`/${this.state.localId}`}>
        <ProductPage id={this.state.localId} currency={this.state.currency}/>
      </Route>
      <Route path="/cart">
        <CartPage currency={this.state.currency}/>
      </Route>
      <Route path="/thankyou">
        <ThankYou/>
      </Route>
      <Route path="*">
      <Error/>
      </Route>
      </Switch>
      </Router>
      </>
    );
  }
}

 
export default App;
