import React from 'react';

import { Button } from 'antd';

import '../../assets/style.less';
import styles from './DownloadBtn.css';

class DownloadBtn extends React.Component {
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
                "marginRight": "16px",
                "backgroundColor": "transparent",
            }} className={styles["btn"]}>
                <span className={"icon-download " + styles["icon"]}></span>
                下载
            </Button>
        );
    }
}

export default DownloadBtn;