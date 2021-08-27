import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

// import HomePage from './pages/homepage/Homepage.component';
// import ShopPage from './pages/shop/Shop.component';
// import SignInAndSignUpPage from './pages/sign-in-and-sign-up/Sign-in-and-sign-up.component';
// import CheckoutPage from './pages/checkout/Checkout.component';
import Header from './components/header/Header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { GlobalStyle } from './global.styles';

// import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import {selectCurrentUser} from './redux/user/user.selectors';
import {checkUserSession} from './redux/user/user.actions';

const HomePage = lazy(() => import('./pages/homepage/Homepage.component')); // отложенная загрузка, только когда будет переход на маршрут
const ShopPage = lazy(() => import('./pages/shop/Shop.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/Sign-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/Checkout.component'));

const App = ({checkUserSession, currentUser}) => {

  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}> {/*компонент ожидания, может отображать асинхронные компоненты - lazy*/}
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route
              exact
              path='/signin'
              render={() =>
                currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />  
              }
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
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


    //  Преобразовываем классовый компонент в функциональный - хуки
    // componentDidMount() {
    //   const { checkUserSession } = this.props;
    //   checkUserSession();
    // }



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