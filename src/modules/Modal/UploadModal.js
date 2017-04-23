import React from 'react';

import './UploadModal.less';
import UploadIconPreview from '../Content/UploadIconPreview';
import AddFile from '../Content/AddFile';
import { Modal, Button, message } from 'antd';
import CheckableTag from '../Content/CheckableTag';

class UploadModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadFlag: false, //全beforeUpload的promise的resolve等到“全部上传”的时候才执行
            fileList: [],
            selectIndex: -1,
            nameInputValue: '',
        };
        this.errorUploadCount = 0;
    }
    
    handleCancel = () => {
        this.props.onCancel();
    }

    handleOk = () => {
        console.log('ok');
        this.setState({
            uploadFlag: true
        });
    }

    setUploadFlag = (flag) => {
        this.setState({
            uploadFlag: false
        });
    }

    setSelectedIndex = (index) => {
        this.setState({
            selectIndex: index,
            nameInputValue: this.state.fileList[index].filename
        })
    }

    removeUploadSuccessFile = (uid, status) => {
        if(status == 'error') {
            this.errorUploadCount ++;
            return;
        } else {
            //最后一下上传完，把uploadFlag设回false
            if(this.state.fileList.length == this.errorUploadCount + 1) {
                this.setUploadFlag();
                
            }
        }

        let targetIndex = -1;
        this.state.fileList.forEach((value, index) => {
            if(value.uid == uid) {
                targetIndex = index;
            }
        });
        if(targetIndex != -1) {
            this.handleIconPreviewOnDelete(targetIndex);
        }
    }

    handleBeforeUpload = (file, fileList) => {
        let self = this;
        var reader = new FileReader();
        
        reader.onload = function(evt){
            // console.log(evt.target.result);
            file.base64Data = evt.target.result;
            // let fileList = [...self.state.fileList, file];
            let img = new Image();
            
            img.onload = function() {
                file.width = this.width;
                file.height = this.height;
                file.labels = [];
                file.filename = file.name;
                
                self.setState((prevState) => {
                    return {
                        fileList: [...prevState.fileList, file]
                    }
                });
            }
            img.src = evt.target.result;
        }
        reader.readAsDataURL(file);
    }

    handleNameInputChange = (e) => {
        let name = e.target.value;
        let suffix = this.state.nameInputValue.match(/\.(png|jpg|svg|jpeg)$/i)[0];
        // console.log(this.state.nameInputValue+"-----"+name+"---"+suffix);
        this.setState({
            nameInputValue: name + suffix
        });
    }

    handelNameInputBlur = (e) => {
        let name = e.target.value;
        let suffix = this.state.nameInputValue.match(/\.(png|jpg|svg|jpeg)$/i)[0];
        if(name == '') {
            message.warning("名称为空则使用原名", 2);
            return;
        } else {
            let index = this.state.selectIndex;
            let fileList = [...this.state.fileList];
            // let file = Object.assign({}, this.state.fileList[index]);
            // console.log(file);
            // console.log(this.state.fileList[index]);
            fileList[index].filename = name + suffix;
            // let fileList = this.state.fileList.slice(0, index).concat(file, this.state.fileList.slice(index + 1));
            this.setState({
                fileList
            })
        }
    }

    handleIconPreviewOnDelete = (index) => {
        let fileList = this.state.fileList.slice(0, index).concat(this.state.fileList.slice(index + 1));
        this.setState({fileList});
        if(index == this.state.selectIndex) {
            this.setSelectedIndex(-1);
        }
    }

    render() {
        console.log(this.state.fileList);

        // 文件名 input
        let nameInputValue = this.state.nameInputValue.replace(/\.(png|jpg|svg|jpeg)$/i, '');
        const uploadIconPreviewList = this.state.fileList.map((value, index) => {
                return <UploadIconPreview 
                            key={value.uid} 
                            index={index}
                            base64Data={value.base64Data} 
                            name={value.name} 
                            width={value.width}
                            height={value.height}
                            onDelete={this.handleIconPreviewOnDelete}
                            selectIndex={this.state.selectIndex}
                            setSelectedIndex={this.setSelectedIndex}
                            />
            });        
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
                    {uploadIconPreviewList}
                    <AddFile 
                        beforeUpload={this.handleBeforeUpload} 
                        uploadFlag={this.state.uploadFlag}
                        fileList={this.state.fileList}
                        setUploadFlag={this.setUploadFlag}
                        removeUploadSuccessFile={this.removeUploadSuccessFile}
                        />
                </ul>
                <span className={`split`}></span>
                {
                    this.state.selectIndex > -1 
                    ?
                    <div className={`edit-container`}>
                        <div className={`icon-name-container`}>
                            <label className={`label-text`}>名称：</label>
                            <input 
                                type="text" 
                                className={`input`} 
                                placeholder="这个文件的名字" 
                                value={nameInputValue} 
                                onChange={this.handleNameInputChange}
                                onBlur={this.handelNameInputBlur}
                                />
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
                    :
                    null
                }
            </Modal>
        );
    }
}

export default UploadModal;
