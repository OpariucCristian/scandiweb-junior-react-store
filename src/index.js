import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { ApolloProvider} from "react-apollo"
import  {ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache()
});


ReactDOM.render(
  
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
    <App />
    </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  
  document.getElementById('root')
);