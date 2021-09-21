import React, { Component } from 'react'
import {gql} from "graphql-tag"
import { Query } from 'react-apollo';
import {store} from '../store'
 
export class ProductPage extends Component {
  constructor(props){
    super(props)
    this.state = {
        bigImage : 0,
        currentAttribute: [],
    }
    
}
currencyHandler(currencySign){
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
            <div id="product-page-container">
                 <Query 
      query={
        gql`
  {
      product(id:"${this.props.id}"){
        id
        name
        inStock
        gallery
        description
        category
        attributes{
          id
          name
          type
          items{
            displayValue
            value
            id
          }
        }
        prices{
          currency
          amount
        }
        brand
        
      }
    }
  ` }>
     {({loading,error,data})=>{
       
       if (loading) return <p>Loading...</p>;
       if(error) return <p>Error</p>;
       const {product} = data;
       
       
       return <div id="product-content-container">
       
       <div id="small-image-container">
         {product.gallery.map((item,index)=>{
           return <img key={index} onClick={()=>this.setState({bigImage:index})} className="small-image"
           src={item} alt="product"/>
         })}
         </div>
           <div >
             <img src={product.gallery[this.state.bigImage]} className="big-image"/>
           </div>
       <div id="product-info" className="test">
           <div>
           <h3 id="product-name">{product.name}</h3>
           <h3 id="product-type">{product.brand}</h3>
           </div>
          
          
           {product.attributes.length > 0 ?
           product.attributes.map((attribute,aindex)=>{
            return <div  key={aindex}>
             <h4 className="price-size">{attribute.name}</h4>
             <div className="button-container">
            {attribute.type === 'swatch'?
            attribute.items.map((item,index)=>{
              return <label key={index} >
                <input 
              type="radio" 
              className="product-size-button" 
              style={{backgroundColor: `${item.value}`}}
              name={`${item}${aindex}${product.name}`} />
              <span className="product-size-button-text"></span>
              </label>
             })
            
            : attribute.items.map((item,index)=>{
              return <div key={index}> 
                <input 
              onClick={()=>this.state.currentAttribute.find(item => item[0] === attribute.name )
                ?(this.state.currentAttribute.find(item => item[0] === attribute.name)[1] = item.displayValue, console.log(this.state.currentAttribute))
                :this.setState({currentAttribute:[...this.state.currentAttribute,[attribute.name,item.displayValue]]})}
              type="radio" 
              className="product-size-button" 
              name={`${item}${aindex}${product.name}`}
             />
             
             <label key={index} htmlFor={product.name} className="product-size-button-text-container">
            
              <h4 className="product-size-button-text"
             >{item.displayValue}</h4> </label>
             </div>
             })
            }
             </div></div>
              
               }): null}
           
           <h4>PRICE:</h4>
           <h3 className="price-size" id="price">
             {`${this.currencyHandler(product.prices.find(item => item.currency === this.props.currency).currency)}
             ${product.prices.find(item => item.currency === this.props.currency).amount}`}
             </h3>

             {product.inStock? 
             <button onClick={()=> store.dispatch({type:'UPDATE_CART',val:[product.id,{
               name: product.name,
               category: product.category,
               attributes: product.attributes || null,
               currentAttributes: this.state.currentAttribute,
               prices: product.prices,
               description: product.description,
               gallery: product.gallery,
               brand: product.brand,
               quantity: 1
             }]})} className="product-add-to-cart-button">
               <h4 id="product-add-to-cart-text">ADD TO CART</h4>
           </button> 
           : 
           <button className="product-add-to-cart-button" id="product-add-to-cart-button-no-stock">
             <h4 id="product-add-to-cart-text">OUT OF STOCK</h4>
             </button>}
           
           
           <p id="product-description">{product.description}</p>
       </div>
     
     </div>}
       
     } 
          </Query>
                
              
            </div>
        )
    }
    
}




  export default ProductPage;
  