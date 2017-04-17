import React from 'react';

import styles from './InnerGroupIcon.css';
import NormalIcon from './NormalIcon';

class InnerGroupIcon extends React.Component {
    render() {
        return (
            <ul className={styles["icon-container"]}>
                <NormalIcon/>
                <NormalIcon/>
                <NormalIcon/>
                <NormalIcon/>
                <NormalIcon/>
                <NormalIcon/>
                <NormalIcon/>
                <NormalIcon/>
                <NormalIcon/>
                <NormalIcon/>
            </ul>
        );
    }
}

export default InnerGroupIcon;