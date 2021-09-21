import React, { Component } from 'react';
import MinicartProduct from './minicart-product';
import {store} from '../store'
import {Link} from 'react-router-dom'


class MiniCart extends Component {
    constructor(props){
        super(props)
        this.state = {
            cartInfo: store.getState().cart,
            total: []
        }

        store.subscribe(()=>{
            this.setState({cartInfo: store.getState().cart})
            
        })
        
    }
    getTotal(){
        if(this.state.cartInfo.length > 0){
        let currentTotal = this.state.cartInfo.map((item)=>{
           return item[1].prices.find(price => price.currency === this.props.currency).amount * item[1].quantity
         })
         return currentTotal.reduce(function (acc, curr){
           
             return acc + curr

         })}else{
             return 0
         }
     }
     getTotalItems(){
        if(this.state.cartInfo.length > 0){
        let currentTotalItems = this.state.cartInfo.map((item)=>{
           return item[1].quantity
         })
         return currentTotalItems.reduce(function (acc, curr){
           
            return acc + curr
            
        })
        }else{
            return 0
        }
     }
    render() {
        return (
            
            <div className="minicart-container" id={!this.props.isOpen? "minicart-container-hide" : ""}>
                <div className="minicart-bag-item-number-container">
                <h3 className="minicart-items-info">My bag,</h3>
                <h3 className="minicart-items-amount">{this.getTotalItems() > 1 ? `${this.getTotalItems()} items`: `${this.getTotalItems()} item`}</h3></div>
              
                <div>
                {this.state.cartInfo.map((item,index)=>{
                    const {name,category,gallery,attributes,prices,quantity,brand,currentAttributes} = item[1];
                    return <MinicartProduct
                    key={index}
                    name={name} 
                    id={item[0]}
                    category={category} 
                    brand={brand}
                    gallery={gallery}
                    currentAttributes={currentAttributes}
                    attributes={attributes}
                    prices={prices}
                    quantity={quantity}
                    currency={this.props.currency}
                     key={index}/>
                })}
                </div>
                <div>
                    <h3 className="minicart-items-info">Total</h3>
                    <h3 className="minicart-items-info">{this.props.currency} {this.getTotal().toFixed(2)}</h3>
                </div>
                <div className="minicart-button-container">
                    <div className="minicart-button-justify">
                    <div className="minicart-view-bag-button-container">
                        <Link className="link" to="/cart">
                    <button className="minicart-view-bag-button">
                        <h3 className="minicart-button-text"> VIEW BAG</h3>  
                    </button>
                        </Link>
                    </div>
                    <div className="minicart-check-out-button-container">
                    <Link className="link" to="/thankyou">
                    <button className="minicart-add-to-cart-button">
                        <h3 className="minicart-button-text">CHECK OUT</h3>
                    </button>
                    </Link>
                    </div>
                    </div>
                </div>

            </div>
            
        );
    }
}

export default MiniCart;
