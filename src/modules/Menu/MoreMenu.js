import React from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
import './MoreMenu.less';

class MoreMenu extends React.Component {

    handleClick = (e) => {
        console.log('click ', e);
    }

    render() {
        return (
            <Menu
                mode="horizontal"
                style={{ width: 80, height: 32, zIndex: 12345}}
                onClick={this.handleClick}
            >
                <SubMenu key="sub1" 
                    title={
                        <span><Icon type="bars" /><span>更 多</span></span>
                    }>
                    <Menu.Item key="1">重命名</Menu.Item>
                    <Menu.Item key="2">删除</Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}

export default MoreMenu;