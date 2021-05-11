import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/Custom-button.component';
import CartItem from '../cart-item/Cart-item.component';
import {selectCartItems} from '../../redux/cart/cart.selectors';

import './cart-dropdown.styles.scss'


const CartDropdown = ({cartItems}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {cartItems.map(cartItem => (
                <CartItem key={cartItem.id} item={cartItem} />
            ))}
        </div>
        <CustomButton> GO TO CHECKOUT </CustomButton>
    </div>
)

const mapStateToProps = state => ({ // используем селектор, до этого - ({cart: {cartItems}}) - аргумент cart - состояние, деструктуризировили его
    cartItems: selectCartItems(state);
})

export default connect(mapStateToProps)(CartDropdown);