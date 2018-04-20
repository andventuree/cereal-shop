import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart, addProductToCart, minusFromCart, deleteProductFromCart } from '../store';

class Cart extends Component {
  componentDidMount() {
    this.props.loadCart();
  }

  render() {
    const { cart, cartProducts } = this.props;
    console.log(cartProducts);
    if (!cartProducts) {
      return <div />;
    } else if (cartProducts.length < 1) {
      return <p>Your cart is empty.</p>
    } else {
      return (
        <div>
          { cartProducts.map(product => (
              <div key={product.id}>
                <img src={product.imgUrl} alt={product.name}/>
                <span>{product.name}</span>
                <span>{'Price: $' + product.price}</span>
                <span>{'Quantity: ' + cart[product.id]}</span>
                <span>{'Subtotal: ' + product.price * cart[product.id]}</span>
              </div>
            ))

          }
        </div>
      );
    }
  }
}

const mapState = ({ cart, product }) => {
  const cartProducts = product.allProducts.filter(pt => cart.hasOwnProperty(pt.id));
  return { cart, cartProducts };
};

const mapDispatch = dispatch => {
  return {
    loadCart() {
      dispatch(fetchCart());
    }
  };
};

export default connect(mapState, mapDispatch)(Cart);