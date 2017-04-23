import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Group.css'

class Group extends React.Component {
    render() {
        return (
            <Link to="/innergroup" className={styles["group-container"]} style={this.props.style}>
                {/*<div className={styles["group-container"]}>*/}
                    <div className={styles["icon-container"]}>
                        <ul className={styles["ul"]}>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div className={styles["group-name-div"]}>{this.props.groupName}</div>
                {/*</div>*/}
            </Link>
        );
    }
}

export default Group;