import React from 'react';

import { Checkbox, Tooltip } from 'antd';

import './NormalIcon.less';
import bg from '../../assets/images/menu/Logo_en5.png';
import Labels from './Labels';
import config from '../../../config/config';

class NormalIcon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            mouseEnter: false,
        };
    }

    handleCheck = (e) => {
        this.setState((prevState) => {
            return {
                checked: !prevState.checked
            }
        })
    }

    handleMouseToggle = (e) => {
        this.setState((prevState) => {
            return {
                mouseEnter: !prevState.mouseEnter
            }
        });
    }

    downloadLinkOnClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('开始下载....');
    }

    render() {
        let { height, width, iconUrl, labels, fileName } = this.props;
        fileName = fileName.replace(/-timestamp\d+/, '').replace(config.fileSuffixReg, '');
        let shortName = fileName;
        if(shortName.length > 7) {
            shortName = shortName.slice(0, 7) + '...';
        }
        const checkedClass = this.state.checked ? 'custom-ant-checkbox-checked' : '';
        let iconContainerStyle = {
            backgroundImage: `url(${config.serverHost}/${iconUrl})`,
            border: this.state.checked ? "1px solid #0d9be4" : "0",
        };
        if(width > 120 || height > 120) {
            iconContainerStyle.backgroundSize = "contain";
        }
        return (
            <li className={`custom-normal-icon-container`}>
                <div className={`icon-container`} 
                    style={iconContainerStyle} 
                    onClick={this.handleCheck}
                    onMouseOver={this.handleMouseToggle}
                    onMouseOut={this.handleMouseToggle}
                    >
                    <Checkbox 
                        className={`custom-ant-checkbox ${checkedClass}`}
                        checked={this.state.checked}
                        style={{
                            display: (this.state.checked || this.state.mouseEnter) ? "block" : "none"
                        }}
                        />
                    <a 
                        className={`download-link`} 
                        onClick={this.downloadLinkOnClick}
                        style={{
                            display: this.state.mouseEnter ? "block" : "none"
                        }}
                        >
                        <span className={`icon-download`}></span>
                    </a>
                </div>
                <div className={`icon-title`}>
                    <Tooltip 
                        title={fileName}
                        placement="bottomLeft"
                        overlayClassName={`custom-ant-overlay-hint-name`}
                        >
                        {shortName}
                    </Tooltip>
                </div>
                <Labels labels={labels}/>
            </li>
        );
    }
}

export default NormalIcon;