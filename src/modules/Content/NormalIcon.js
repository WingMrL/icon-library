import React from 'react';

import { Checkbox } from 'antd';

import './NormalIcon.less';
import bg from '../../assets/images/menu/Logo_en5.png';
import Labels from './Labels';

const iconStyle = {
    backgroundImage: `url(${bg})`
};

class NormalIcon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            mouseEnter: false,
        };

        this.handleCheck = this.handleCheck.bind(this);
        this.handleMouseToggle = this.handleMouseToggle.bind(this);
        this.downloadLinkOnClick = this.downloadLinkOnClick.bind(this);
    }

    handleCheck(e) {
        this.setState((prevState) => {
            return {
                checked: !prevState.checked
            }
        })
    }

    handleMouseToggle(e) {
        this.setState((prevState) => {
            return {
                mouseEnter: !prevState.mouseEnter
            }
        });
    }

    downloadLinkOnClick(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('开始下载....');
    }

    render() {
        const checkedClass = this.state.checked ? 'custom-ant-checkbox-checked' : '';
        let style = Object.assign({}, iconStyle, {
            border: this.state.checked ? "1px solid #0d9be4" : "0"
        });
        return (
            <li className={`custom-normal-icon-container`}>
                <div className={`icon-container`} 
                    style={style} 
                    onClick={this.handleCheck}
                    onMouseOver={this.handleMouseToggle}
                    onMouseOut={this.handleMouseToggle}
                    id="icon-container-div"
                    >
                    <Checkbox 
                        className={`custom-ant-checkbox ${checkedClass}`}
                        checked={this.state.checked}
                        style={{
                            display: (this.state.checked || this.state.mouseEnter) ? "block" : "none"
                        }}
                        />
                    <a className={`download-link`} onClick={this.downloadLinkOnClick}>
                        <span className={`icon-download`}></span>
                    </a>
                </div>
                <div className={`icon-title`}>下载</div>
                <Labels />
            </li>
        );
    }
}

export default NormalIcon;