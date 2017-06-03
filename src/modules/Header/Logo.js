import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.css'

/**
 * @description 头部左边的LOGO
 * 
 * @class Logo
 * @extends {React.Component}
 */
class Logo extends React.Component {
    render() {
        return (
            <div className={styles["logo-container"]}>
                <Link  to="/" className={styles["logo"]}></Link>
                <Link  to="/" className={styles["title"]}>图标资源库</Link>
            </div>
        );
    }
}

export default Logo;