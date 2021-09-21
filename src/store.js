import {createStore} from "redux"

const initialState = {
    currentId: "ps-5",
    category: "all",
    currency: "USD",
    cart: [],
    total: [],
    totalAmount: 0
}
function reducer(state = initialState, action){
    const newState = {...state}
    
    if(action.type === 'UPDATE_ID'){
        newState.currentId = action.val
   
    }
    if(action.type === 'UPDATE_CATEGORY'){
        newState.category = action.val
   
    }
    if(action.type === 'UPDATE_CURRENCY'){
        newState.currency = action.val
   
    }
    if(action.type === 'UPDATE_CART'){
        let ids = [newState.cart.map((item)=>{return item[0]})]
        if(ids[0].includes(action.val[0])){
            newState.cart.forEach((item)=>{
                if(item[0] === action.val[0]){
                    item[1].quantity += 1
                }
            })
        }else{
            newState.cart.push(action.val)
        }
    }
    if(action.type === 'INCREASE_QUANTITY'){
        newState.cart.forEach((item)=>{
            if(item[0] === action.val){
                item[1].quantity += 1
            }
        })
    }
    if(action.type === 'DECREASE_QUANTITY'){
        newState.cart.forEach((item)=>{
            if(item[0] === action.val){
                item[1].quantity -= 1
            }
        })
    }
    if(action.type === 'UPDATE_TOTAL'){
        let ids = [newState.total.map((item)=>{return item[0]})]
        if(ids[0].includes(action.val[0])){
            newState.total.forEach((item)=>{
                if(item[0] === action.val[0]){
                    item[1] = action.val[1]
                }
            })
        }else{
            newState.total.push(action.val)
        }
        
    }
    if(action.type === 'UPDATE_TOTAL_AMOUNT'){
        newState.totalAmount = action.val
   
    }
   
    return newState
}

export const store = createStore(reducer)

