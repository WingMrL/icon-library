import React from 'react';

import { Modal, Input } from 'antd';
import './RenameModal.less';

class RenameModal extends React.Component {

    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }
    
    handleCancel() {
        this.props.onCancel();
    }

    handleOk() {
        this.props.onOk();
    }

    render() {
        return (
            <Modal 
                title="重命名"
                visible={this.props.visible}
                cancelText="取消"
                okText="确认"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                className={`custom-rename-modal-container`}
                >
                <Input 
                    size="large"
                    className={`input-name`}
                    />
                <p className={`confirm`}>请输入文件名</p>
            </Modal>
        );
    }
}

export default RenameModal;
