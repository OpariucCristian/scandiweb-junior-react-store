import React, { Component } from 'react';
import {store} from '../store'

class CartProduct extends Component {
    constructor(props){
        super(props)
        this.state = { 
            currentPicture: 0
        }   
        
    }
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
     handleNextPicture(){
        this.state.currentPicture === this.props.gallery.length -1 ?this.setState({currentPicture: this.state.currentPicture = 0})
        :this.setState({currentPicture: this.state.currentPicture +=1})
     }
     handlePreviousPicture(){
         this.state.currentPicture === 0 ? this.setState({currentPicture: this.state.currentPicture = this.props.gallery.length -1})
        :this.setState({currentPicture: this.state.currentPicture -=1})
     }
   
    render() {
        
        if(this.props.quantity >0){
        return (
            <div className="product-contaier">
            
            <hr className="solid"/>
            <div className="cart-product-container">
            <div className="cart-product-name-price-container">
                <div className="cart-product-info-container">
                <h4 className="cart-product-name">{this.props.name}</h4>
                <h4 className="cart-product-type">{this.props.brand}</h4>
                <h4 className="cart-product-price">{`${this.currencyHandler()}
                 ${(this.props.prices.find(item => item.currency === this.props.currency).amount * this.props.quantity).toFixed(2)}`}</h4>
                </div>
                <div className="cart-attributes-buttons-container">
            
                {this.props.attributes.length > 0 ?
           this.props.attributes.map((attribute,aindex)=>{
            return <div className="cart-attributes-container" key={aindex}>
             <h4 className="price-size">{attribute.name}</h4>
             <div className="cart-attribute-buttons-container">
            {attribute.type === 'swatch'?
            attribute.items.map((item,index)=>{
              return <label key={index} >
                <input 
              type="radio" 
              className="cart-product-size-button" 
              style={{backgroundColor: `${item.value}`}}
              name={attribute.name} />
              <span className="cart-product-size-button-text"></span>
              </label>
             })
            : attribute.items.map((item,index)=>{
              return <div key={index}> 
              
                <input 
              defaultChecked={!!this.props.currentAttributes.find(it => it[1] === item.displayValue && it[0] === attribute.name)}
              type="radio" 
              className="cart-product-size-button" 
              name={`${item}${aindex}`}
             />
             
             <label key={index} htmlFor={this.props.name} className="cart-product-size-button-text">
              <h4 
              className="cart-product-attribute-text"
             >{item.value}</h4> </label>
             </div>
             })
            }
             </div></div>
              
               }): null}

                </div>
            </div>
            <div className="cart-product-amount-pic-container">
                <div className="cart-product-amount-container">
                    <button className="product-quantity-button"
                     onClick={()=> store.dispatch({type:'INCREASE_QUANTITY',val:this.props.id})}>
                        +
                        </button>
                    <h3 className="cart-product-quantity">{this.props.quantity}</h3>
                    <button className="product-quantity-button"
                    onClick={()=> store.dispatch({type:'DECREASE_QUANTITY',val:this.props.id})}>
                        -
                        </button>
                </div>
                <div className="cart-product-image-container">
                    <div className="cart-product-previous-img" onClick={()=>this.handlePreviousPicture()} >
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13L1 7L7 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    </div>

                    <img className="cart-product-image" src={this.props.gallery[this.state.currentPicture]} alt="product"/>
                    <div className="cart-product-next-img" onClick={()=>this.handleNextPicture()}>
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 13L7 7L1 1" stroke="black" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round"/>
                    </svg></div>

                </div>
            </div>
            </div>
            </div>
        );
    }else{
        return null
    }
    }
}

export default CartProduct;
