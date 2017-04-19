import React from 'react';

import './UploadIconPreview.less';
import bg from '../../assets/images/menu/Logo_en5.png';

const iconStyle = {
    backgroundImage: `url(${bg})`
};

class UploadIconPreview extends React.Component {

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
        let style = Object.assign({}, iconStyle, {
            border: this.state.checked ? "1px solid #0d9be4" : "0"
        });
        return (
            <li className={`custom-upload-icon-container`}>
                <div className={`icon-container`} 
                    style={style} 
                    onClick={this.handleCheck}
                    onMouseOver={this.handleMouseToggle}
                    onMouseOut={this.handleMouseToggle}
                    >
                    <a className={`download-link`} onClick={this.downloadLinkOnClick}>
                        <span className={`icon-download`}></span>
                    </a>
                </div>
            </li>
        );
    }
}

export default UploadIconPreview;