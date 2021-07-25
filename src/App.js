import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './App.css';

import HomePage from './pages/homepage/Homepage.component';
import ShopPage from './pages/shop/Shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/Sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/Checkout.component';

import Header from './components/header/Header.component';

// import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import {selectCurrentUser} from './redux/user/user.selectors';
import {checkUserSession} from './redux/user/user.actions';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
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
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);


   // 2 Переносим этот код из componentDidMount в sagas.js - переписываем асинхронный код

     
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);

    //     userRef.onSnapshot(snapShot => {
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data()
    //       });
    //     });
    //     // console.log(this.state); - в этом месте так нельзя писать из-за this.setState - синхронное значение, нужно делать второй параметр (через аноним функцию)
    //   }

    //   setCurrentUser(userAuth);


      // (1 апгрейд в компоненте) Добавили в firebase shop.data - эту часть кода удалили, т.к единоразово делается. См урок в разделе 16
      //                                        |
      //                                        v
      // addCollectionAndDocuments(
      //   'collections', 
      //   collectionArray.map(({title, items}) => ({title, items}))
      // )
    // });




    // const mapDispatchToProps = dispatch => ({  // отправка действий в store, изменение state
//   setCurrentUser: user => dispatch(setCurrentUser(user))
// })