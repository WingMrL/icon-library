import React from 'react';

import styles from './InnerGroupIcon.css';
import NormalIcon from './NormalIcon';

class InnerGroupIcon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
             
        };
    }

    render() {
        let { icons } = this.props;
        
        let normalIconList;
        if(icons) {
            normalIconList = icons.map((value) => {
                return <NormalIcon 
                            key={value._id}
                            height={value.height}
                            width={value.width}
                            iconUrl={value.iconUrl}
                            labels={value.labels}
                            fileName={value.fileName}
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

export default InnerGroupIcon;