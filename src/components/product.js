import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {store} from '../store'



class Product extends Component {
currencyHandler(){
   let currencySign=  this.props.price.find(item => item.currency === this.props.currency).currency;
   switch(currencySign){
    case "USD":
        return "$"
    case "GBP":
        return "£"
    case "AUD":
        return "AU$"       
    case "JPY":
        return "¥"
    case "RUB":
        return "₽"           
   }
}
    
    render() {
        return (
            <div  className={`${!this.props.inStock && "product-no-stock"} product`} onClick={()=> store.dispatch({type:'UPDATE_ID',val:this.props.id})}>
                <Link  className="link"  to={this.props.id}>
                <div className="image-container">
                <img className="product-img" src={this.props.img} alt="item"  />
                <h3 className={`${!this.props.inStock? "product-no-stock-text" : "product-no-stock-text-hide" }`}>OUT OF STOCK</h3>
                </div>
                <h3 className="product-title">{this.props.name}</h3>
                
                
                <h3 className="product-price">{`${this.currencyHandler()} ${this.props.price.find(item => item.currency === this.props.currency).amount}`}</h3>
                </Link>
            </div>
            
        );
    }
}


  export default Product;


