import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class error extends Component {
    render() {
        return (
            <div className="thankyou-container" id="error">
                <h4 className="thankyou-text">Page not found</h4>
                <div>
                    <Link to="/">
                        <button id="error-button" className="product-add-to-cart-button">Back home</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default error;
