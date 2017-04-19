import React from 'react';

import './CheckableTag.less';

import { Tag } from 'antd';
const AntdCheckbleTag = Tag.CheckableTag;

class CheckableTag extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({
            checked
        })
    }

    render() {
        return <AntdCheckbleTag 
                    {...this.props} 
                    checked={this.state.checked} 
                    onChange={this.handleChange}
                    />;
    }
}

export default CheckableTag;