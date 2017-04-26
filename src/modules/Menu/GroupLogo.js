import React from 'react';

import './GroupLogo.less';

class GroupLogo extends React.Component {
    render() {
        let {groupName, groupIconUrl} = this.props
        return (
            <div className={`logo-container`}>
                <img src={groupIconUrl} className={`logo-img`}/>
                <span className={`name-span`}>{groupName}</span>
            </div>
        );
    }
}

export default GroupLogo;