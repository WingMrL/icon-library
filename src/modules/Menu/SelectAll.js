import React from 'react';

import { Checkbox } from 'antd';

import './SelectAll.less';

class SelectAll extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checkFlag: false,
        };

        this.handleCheckboxChecked = this.handleCheckboxChecked.bind(this);
    }

    handleCheckboxChecked(e) {
        this.setState({
            checkFlag: e.target.checked
        });

    }

    render() {
        const checkTitle = this.state.checkFlag ? '取消全选' : '全选';
        return (
            <div className={`select-all-checkbox-container`}>
                {checkTitle}
                <Checkbox onChange={this.handleCheckboxChecked} className={`s-a-checkbox select-all-checkbox`}/>
            </div>
        );
    }
}

export default SelectAll;
