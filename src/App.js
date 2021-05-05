import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/Homepage.component';
import ShopPage from './pages/shop/Shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/Sign-in-and-sign-up.component';
import Header from './components/header/Header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
      
        userRef.onSnapshot(sanpShot =>{         
          setCurrentUser ({
            id: sanpShot.id,
            ...sanpShot.data()
          })
        });
        // console.log(this.state); - в этом месте так нельзя писать из-за this.setState - синхронное значение, нужно делать второй параметр (через аноним функцию)
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({  // отправка действий в store, изменение state
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);