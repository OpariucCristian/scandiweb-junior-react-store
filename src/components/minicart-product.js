import React, { Component } from 'react';
import {store} from '../store'


class MinicartProduct extends Component {
    currencyHandler(){
        let currencySign=  this.props.prices.find(item => item.currency === this.props.currency).currency;
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
        if(this.props.quantity >0){
        return (
            <div>
                <div className="minicart-product-container">
            <div className="minicart-product-name-price-container">
                <div className="cart-product-info-container">
                <h4 className="minicart-product-name">{this.props.name}</h4>
                <h4 className="minicart-product-type">{this.props.brand}</h4>
                <h4 className="minicart-product-price">{`${this.currencyHandler()}
                 ${(this.props.prices.find(item => item.currency === this.props.currency).amount * this.props.quantity).toFixed(2)}`}</h4>
                </div>
                <div>
               
                {this.props.attributes.length > 0 ?
           this.props.attributes.map((attribute,aindex)=>{
            return <div  key={aindex}>
             <h4 className="price-size">{attribute.name}</h4>
             <div className="minicart-attribute-buttons-container">
            {attribute.type === 'swatch'?
            attribute.items.map((item,index)=>{
              return <label key={index} >
                <input 
              type="radio" 
              className="minicart-product-size-button" 
              style={{backgroundColor: `${item.value}`}}
              name={attribute.name} />
              <span className="minicart-product-size-button-text"></span>
              </label>
             })
            
            : attribute.items.map((item,index)=>{
              return <div key={index}> 
              
                <input 
              defaultChecked={!!this.props.currentAttributes.find(it => it[1] === item.displayValue && it[0] === attribute.name)}
              type="radio" 
              className="minicart-product-size-button" 
              name={`${item}${aindex}${this.props.name}`}
             />
             
             <label key={index} htmlFor={this.props.name} className="minicart-product-size-button-text">
              <h4 
              
             >{item.value}</h4> </label>
             </div>
             })
            }
             </div></div>
              
               }): null}
                </div>
            </div>
            <div className="minicart-product-amount-pic-container">
                <div className="cart-product-amount-container">
                    <button className="minicart-product-quantity-button"
                     onClick={()=> store.dispatch({type:'INCREASE_QUANTITY',val:this.props.id})}>
                        +
                        </button>
                    <h3 className="minicart-product-quantity">{this.props.quantity}</h3>
                    <button className="minicart-product-quantity-button"
                    onClick={()=> store.dispatch({type:'DECREASE_QUANTITY',val:this.props.id})}>
                        -
                        </button>
                </div>
                <div>
                    <img className="minicart-product-image" src={this.props.gallery[0]} alt="product"/>
                </div>
            </div>
            </div>
            </div>
        );}
        else{
            return null
        }
    }
}

export default MinicartProduct;
