import React, { Component } from 'react';
import Product from '../components/product';
import {gql} from "apollo-boost"
import { graphql } from 'react-apollo';
import {store} from '../store'

class ProductList extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentCategory: "all"
        }
        store.subscribe(()=>{
            this.setState({currentCategory: store.getState().category})
        })
    }
    displayItems(){
        let data = this.props.data;
        if(data.loading){
            return(<div>Loading...</div>)
        } else{
            
            return(
                
                data.category.products.map((item,index)=>{
                  if(item.category === this.state.currentCategory || this.state.currentCategory === "all"){
                    return( <Product key={index} inStock={item.inStock} id={item.id} img={item.gallery[0]} name={item.name} 
                    price={item.prices} currency={this.props.currency}/>)}
                })
            )
        }
    }
    render() {
        return (
         
            <div id="page-container">
                <div id="title-container">
                <h4 id="category-name">{this.state.currentCategory}</h4>
                </div>
                <div id="products-container">
                {this.displayItems()}
                </div>
            </div>
         
        );
    }
}
const getProductsQuery = gql`
{
    category{
        name
      products{
        id
        name
        inStock
        category
        gallery
        description
        prices{
          currency
          amount
        }
      }
    }
  }
`


export default graphql(getProductsQuery)(ProductList);
