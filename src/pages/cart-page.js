import React, { Component } from 'react';
import CartProduct from '../components/cart-product';
import {store} from '../store'

class CartPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            cartInfo: store.getState().cart
        }

        store.subscribe(()=>{
            this.setState({cartInfo: store.getState().cart})
            console.log('state',this.state.cartInfo)
        })
    }
    
    
    render() {
        
        return (
            
            <div id="cart-container">
                
                <div id="cart-content-container">
                <h4 id="cart-text">CART</h4>
                {this.state.cartInfo.map((item,index)=>{
                    
                    
                    const {name,category,gallery,attributes,currentAttributes,prices,quantity,brand} = item[1];
                    return <CartProduct
                    key={index}
                    name={name} 
                    id={item[0]}
                    category={category} 
                    gallery={gallery}
                    brand={brand}
                    attributes={attributes}
                    currentAttributes={currentAttributes}
                    attributes={attributes}
                    prices={prices}
                    quantity={quantity}
                    currency={this.props.currency}
                     key={index}/>
                })}
              
                </div>
            </div>
        );
    }
}

export default CartPage;
