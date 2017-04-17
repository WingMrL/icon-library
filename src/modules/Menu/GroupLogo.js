import React from 'react';

import logo_en5 from '../../assets/images/menu/Logo_en5.png';
import styles from './GroupLogo.css';

class GroupLogo extends React.Component {
    render() {
        return (
            <div className={styles['logo-container']}>
                <img src={logo_en5} className={styles['logo-img']}/>
                <span className={styles['name-span']}>EasiNote5</span>
            </div>
        );
    }
}

export default GroupLogo;