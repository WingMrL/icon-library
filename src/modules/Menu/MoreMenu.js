import React from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
import './MoreMenu.less';
import DeleteConfirmModal from '../Modal/DeleteConfirmModal';
import RenameModal from '../Modal/RenameModal';
import { connect } from 'react-redux';
import axios from 'axios';
import config from '../../../config/config';

class MoreMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deleteModalVisible: false,
            renameModalVisible: false
        };
    }

    handleClick = (e) => {
        if(e.key === "1") {
            console.log('hahaha');
            this.setState({
                renameModalVisible: true
            });
        }
        if(e.key === "2") {
            this.setState({
                deleteModalVisible: true
            });
        }
    }

    onRenameModalCancel = () => {
        this.setState({
            renameModalVisible: false
        });
    }

    onrenameModalOk = () => {
        console.log(this.props.selectedIcons);
        this.setState({
            renameModalVisible: false
        });
    }

    onDeleteModalOk = () => {
        // 删除
        let { selectedIcons } = this.props;
        let iconsId = selectedIcons.map(val => val.id);
        let data = {
            iconsId
        };
        axios.post(`${config.serverHost}/api/deleteIcons`, data)
            .then((res) => {
                console.log(res);
            });
        this.setState({
            deleteModalVisible: false
        });
    }

    onDeleteModalCancel = () => {
        this.setState({
            deleteModalVisible: false
        });
    }

    render = () => {
        let { selectedIcons } = this.props;
        const iconsLen = selectedIcons.length;
        let renameDisableFlag = iconsLen == 1 ? false : true;
        let deleteDisableFlag = iconsLen > 0 ? false : true;
        return (
            <div>
                <Menu
                    mode="horizontal"
                    style={{ width: 80, height: 32, zIndex: 123}}
                    onClick={this.handleClick}
                >
                    <SubMenu key="sub1" 
                        title={
                            <span><Icon type="bars" /><span>更多</span></span>
                        }>
                        <Menu.Item disabled={renameDisableFlag} key="1">重命名</Menu.Item>
                        <Menu.Item disabled={deleteDisableFlag} key="2">删除</Menu.Item>
                    </SubMenu>
                </Menu>
                <DeleteConfirmModal 
                    visible={this.state.deleteModalVisible}
                    onCancel={this.onDeleteModalCancel}
                    onOk={this.onDeleteModalOk}
                    />
                <RenameModal
                    visible={this.state.renameModalVisible}
                    onCancel={this.onRenameModalCancel}
                    onOk={this.onrenameModalOk}
                    />
            </div>
        );
    }
}

const mapStateToProp = (state, ownProps) => {
    let { selectedIcons } = state;
    return {
        selectedIcons
    };
};

MoreMenu = connect(mapStateToProp)(MoreMenu);

export default MoreMenu;