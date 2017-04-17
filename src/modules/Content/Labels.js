import React from 'react';

import { Tag } from 'antd';
import './Labels.less';

class Labels extends React.Component {
    render() {
        
        return (
            <div className={`icon-label-container`} title={"hahaha"}>
                <Tag>Camera</Tag>
                <Tag>SeewoOS</Tag>
            </div>
        );
    }
}

export default Labels;