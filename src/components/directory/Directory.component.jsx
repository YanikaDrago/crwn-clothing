import React from "react";
import "./directory.styles.scss";
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {selectDirectorySections} from '../../redux/directory/directory.selectors';

import MenuItem from "../menu-item/Menu-item.component";

const Directory = ({ sections }) => (
    <div className='directory-menu'>
      {sections.map(({ id, ...otherSectionProps }) => (  //вместо каждого свойства отдельно, кроме id - он будет key
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  );

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);