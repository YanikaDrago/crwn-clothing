import React from 'react';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {withRouter} from 'react-router-dom'

import CartItem from '../cart-item/Cart-item.component';
import {selectCartItems} from '../../redux/cart/cart.selectors';
import {toggleCartHidden} from '../../redux/cart/cart.actions';

import {
    CartDropdownContainer,
    CartDropdownButton,
    EmptyMessageContainer,
    CartItemsContainer
} from './cart-dropdown.styles';


const CartDropdown = ({ cartItems, history, dispatch }) => (   //dispatch передается как props без написания mapDispatchToProps, если не передается второй аргумент для connect
    <CartDropdownContainer>
    <CartItemsContainer>
      {cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
      )}
    </CartItemsContainer>
    <CartDropdownButton
      onClick={() => {
        history.push('/checkout');
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CartDropdownButton>
  </CartDropdownContainer>
);


const mapStateToProps = createStructuredSelector({ // state => при использовании селектора, до этого - ({cart: {cartItems}}) - аргумент cart - состояние, деструктуризировили его
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));