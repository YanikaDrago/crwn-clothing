import React from 'react';
import {
CartItemContainer,
CartItemImg,
ItemDetailsContainer,
CartNameContainer
} from './cart-item.styles';

const CartItem = ({item: {imageUrl, price, name, quantity}}) => (
    <CartItemContainer>
        <CartItemImg src={imageUrl} alt='item' />
        <ItemDetailsContainer>
            <CartNameContainer> {name} </CartNameContainer>
            <span> 
                {quantity} x ${price} 
            </span>
        </ItemDetailsContainer>
    </CartItemContainer>
)

export default CartItem;