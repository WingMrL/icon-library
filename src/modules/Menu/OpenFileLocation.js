import React from 'react';

import { Button } from 'antd';

import '../../assets/style.less';
import styles from './OpenFileLocation.css';

class OpenFileLocation extends React.Component {
    render() {
        return (
            <Button style={{
                "fontSize": "14px",
                "height": "18px",
                "lineHeight": "18px",
                "padding": "0",
                "fontWeight": "400",
                "boxSizing": "border-box",
                "border": "0",
                "marginRight": "28px",
                "backgroundColor": "transparent",
            }} className={styles["btn"]}>
                <span className={"icon-location " + styles["icon"]}></span>
                打开文件位置
            </Button>
        );
    }
}

export default OpenFileLocation;