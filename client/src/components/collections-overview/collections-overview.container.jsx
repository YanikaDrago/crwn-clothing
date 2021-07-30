import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux'; 

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/With-spinner.component';
import CollectionsOverview from './Collection-overview.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

const CollectionsOverviewContainer = compose( // вызывает все как функцию, читается справа налево
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;