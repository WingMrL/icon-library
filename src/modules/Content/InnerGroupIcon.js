import React from 'react';
import { connect } from 'react-redux';

import styles from './InnerGroupIcon.css';
import NormalIcon from './NormalIcon';

class InnerGroupIcon extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let { icons } = this.props;
        
        let normalIconList;
        if(icons) {
            normalIconList = icons.map((value) => {
                return <NormalIcon 
                            key={value._id}
                            icon={value}
                            />
            });
        }
        return (
            <ul className={styles["icon-container"]}>
                {normalIconList}
            </ul>
        );
    }
}

const matStateToProps = (state, ownProps) => ({
    icons: state.icons
});

InnerGroupIcon = connect(matStateToProps)(InnerGroupIcon);

export default InnerGroupIcon;