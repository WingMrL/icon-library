import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Group.less'

class Group extends React.Component {
    render() {
        let { _id, groupName, style, groupIconUrl, icons} = this.props;
        return (
            <Link to={`/innergroup/${_id}`} className={`group-container`} style={style}>
                <div className={`icon-container`}>
                    <ul className={`ul`}>
                        <li className={`li`}></li>
                        <li className={`li`}></li>
                        <li className={`li`}></li>
                        <li className={`li`}></li>
                        <li className={`li`}></li>
                        <li className={`li`}></li>
                        <li className={`li`}></li>
                        <li className={`li`}></li>
                        <li className={`li`}></li>
                    </ul>
                </div>
                <div className={`group-name-div`}>{groupName}</div>
            </Link>
        );
    }
}

export default Group;