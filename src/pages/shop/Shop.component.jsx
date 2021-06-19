import React from 'react';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/Collection-overview.component';
import CollectionPage from '../collection/Collection.component';
import WithSpinner from '../../components/with-spinner/With-spinner.component';

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';
import { responsesAreSame } from 'workbox-broadcast-update';

const CollectionsOverviewWithSpiner = WithSpinner(CollectionsOverview);
const CollectionPagewithSpiner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  //упрощеная версия constructor() super()
  state = {
    loading: true
  };
  
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const {updateCollections} = this.props;
    const collectionRef = firestore.collection('collections');

    collectionRef.get().then(snapshot => {  // вместо onSnapshot(async ...)
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({loading: false});
    });
  }

  render (){
    const { match } = this.props;
    const {loading} = this.state;
    return (
      <div className='shop-page'>
        <Route 
          exact 
          path={`${match.path}`} 
          render={(props) => <CollectionsOverviewWithSpiner isLoading={loading} {...props} />} />
        <Route 
          path={`${match.path}/:collectionId`} 
          render={(props) => <CollectionPagewithSpiner isLoading={loading} {...props} />} />
      </div>
    );
  }
} 

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);