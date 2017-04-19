import React from 'react';

import './UploadModal.less';
import UploadIconPreview from '../Content/UploadIconPreview';
import AddFile from '../Content/AddFile';
import { Modal, Button } from 'antd';
import CheckableTag from '../Content/CheckableTag';

class UploadModal extends React.Component {

    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }
    
    handleCancel() {
        this.props.onCancel();
    }

    handleOk() {
        console.log('ok');
    }

    render() {
        console.log(this.props.visible);
        return (
            <Modal 
                title="上传文件"
                visible={this.props.visible}
                cancelText="取消"
                okText="全部上传"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                className={`custom-upload-modal-container`}
                footer={[
                    <Button key="upload" type="primary" size="large" onClick={this.handleOk}>
                        全部上传
                    </Button>
                ]}
                >
                <ul className={`select-container`}>
                    <UploadIconPreview />
                    <UploadIconPreview />
                    <UploadIconPreview />
                    <UploadIconPreview />
                    <UploadIconPreview />
                    <AddFile />
                </ul>
                <span className={`split`}></span>
                <div className={`edit-container`}>
                    <div className={`icon-name-container`}>
                        <label className={`label-text`}>名称：</label>
                        <input type="text" className={`input`} placeholder="这个文件的名字"/>
                    </div>
                    <div className={`icon-label-container`}>
                        <div className={`label-text-container`}>
                            <label className={`label-text`}>标签：
                                <span className={`not-must-input`}>(非必填)</span>
                            </label>
                            
                        </div>
                        <input type="text" className={`input`} placeholder="选择以下标签，或手动输入按回车确定"/>
                        <div className={`input-label-container`}>
                            
                        </div>
                    </div>
                    <div className={`labels-container`}>
                        <CheckableTag> Camera </CheckableTag>
                        <CheckableTag> SeewoOS </CheckableTag>
                        <CheckableTag> EasiNote5 </CheckableTag>
                        <CheckableTag> 希沃信鸽 </CheckableTag>
                        <CheckableTag> 汽车电子 </CheckableTag>
                        <CheckableTag> 军队项目 </CheckableTag>
                        <CheckableTag> Note </CheckableTag>
                        <CheckableTag> 军队项目 </CheckableTag>
                        <CheckableTag> 希沃信鸽 </CheckableTag>
                        <CheckableTag> VR </CheckableTag>
                        <CheckableTag> TV </CheckableTag>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default UploadModal;
