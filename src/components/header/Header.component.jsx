import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from "../cart-icon/Cart-icon.component";
import CartDropdown from '../cart-dropdown/Cart-dropdown.component';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from './header.styles';

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>

    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>

    <OptionsContainer>

      <OptionLink to='/shop'>
        SHOP
      </OptionLink>

      <OptionLink to='/shop'>
        CONTACT
      </OptionLink>

      {currentUser ? (
        <OptionLink as='div' onClick={() => auth.signOut()}> {/*  as='div'- отобразит элемент link как div */}
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to='/signin'>
          SIGN IN
        </OptionLink>
      )}

      <CartIcon />

    </OptionsContainer>
    {
      hidden ? null : <CartDropdown />
    }

  </HeaderContainer>
);

//извлечение данных из store / можно назвать функцию по-другому, но обычно все называют так
const mapStateToProps = createStructuredSelector ({  //просто селектор - state => // до селектора было - ({user: {currentUser}, cart: {hidden}})деструктуризированы из state, получаем их значения
  currentUser: selectCurrentUser,       //до селектора был просто - currentUser-  всмето - currentUser: state.user.currentUser
  hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);