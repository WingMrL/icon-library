import React from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
import './MoreMenu.less';
import DeleteConfirmModal from '../Modal/DeleteConfirmModal';

class MoreMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deleteModalVisible: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.onOk = this.onOk.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    handleClick = (e) => {
        if(e.key === "2") {
            this.setState({
                deleteModalVisible: true
            });
        }
    }

    onOk() {
        this.setState({
            deleteModalVisible: false
        });
    }

    onCancel() {
        this.setState({
            deleteModalVisible: false
        });
    }

    render() {
        return (
            <div>
                <Menu
                    mode="horizontal"
                    style={{ width: 80, height: 32, zIndex: 12345}}
                    onClick={this.handleClick}
                >
                    <SubMenu key="sub1" 
                        title={
                            <span><Icon type="bars" /><span>更多</span></span>
                        }>
                        <Menu.Item key="1">重命名</Menu.Item>
                        <Menu.Item key="2">删除</Menu.Item>
                    </SubMenu>
                </Menu>
                <DeleteConfirmModal 
                    visible={this.state.deleteModalVisible}
                    onCancel={this.onCancel}
                    onOk={this.onOk}
                    />
            </div>
        );
    }
}

export default MoreMenu;