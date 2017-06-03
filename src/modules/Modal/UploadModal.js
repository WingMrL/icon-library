import React from 'react';

import './UploadModal.less';
import UploadIconPreview from '../Content/UploadIconPreview';
import AddFile from '../Content/AddFile';
import { Modal, Button, message } from 'antd';
import CheckableTag from '../Content/CheckableTag';
import config from '../../../config/config';
import axios from 'axios';
import ClosableTag from '../Content/ClosableTag';
import { Scrollbars } from 'react-custom-scrollbars';

class UploadModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadFlag: false, //全beforeUpload的promise的resolve等到“全部上传”的时候才执行
            fileList: [],
            selectIndex: -1, //预览图片区，当前选中图片的索引
            nameInputValue: '',
            labels: [],
            selectedLabels: [],
            labelInputEditable: false,
            wrongFileNameFlag: false,  // 是否为文件名称错误，判断是否添加“红色”样式的class
            wrongLabelsFlag: false, // 是否为标签错误，判断是否添加“红色”样式的class
        };
        this.errorUploadCount = 0;
    }

    
    componentWillMount() {
        let self = this;
        axios.get(`${config.serverHost}/api/getLabels`)
            .then((res) => {
                if(res.status == 200 && res.data.code == 0) {
                    self.setState({
                        labels: res.data.labels
                    })
                    // console.log(res.data.labels);
                }
            }).catch((res) => {

            });
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.selectedLabels.length != this.state.selectedLabels.length) {
            const index = this.state.selectIndex;
            if(index > -1) {
                let fileList = [...this.state.fileList];
                fileList[index].labels = [...this.state.selectedLabels];
                this.setState({
                    fileList
                });
            }
        }
        if(prevState.selectIndex != this.state.selectIndex) {
            let index = this.state.selectIndex;
            if(index > -1) {
                let selectedLabels = [...this.state.fileList[index].labels];
                this.setState({
                    selectedLabels
                });
            }
        }
    }
    
    /**
     * @description Modal的关闭事件
     * @memberof UploadModal
     */
    handleCancel = () => {
        this.props.onCancel();
        this.setWrongFileNameFlag(false);
        this.setWrongLabelsFlag(false);
    }

    /**
     * @description 全部上传btn的点击事件
     * @memberof UploadModal
     */
    handleOk = () => {
        let { fileList } = this.state;
        let unNameFileIndex = -1;
        let noLabelsFileIndex = -1;
        for(let i = 0, len = fileList.length; i < len; i ++) {
            if(fileList[i].filename.indexOf('.') == 0) {
                unNameFileIndex = i;
                break;
            }
            if(fileList[i].labels.length == 0) {
                noLabelsFileIndex = i;
                break;
            }
        }
        if(unNameFileIndex != -1) {
            this.setSelectedIndex(unNameFileIndex);
            this.setWrongFileNameFlag(true);
        } else if(noLabelsFileIndex != -1) {
            this.setSelectedIndex(noLabelsFileIndex);
            this.setWrongLabelsFlag(true);
        } else {
            this.setUploadFlag(true);
        }
    }


    /**
     * @description 设置标签是否错误，判断是否添加“红色”样式的class
     * @param {Boolean} flag - true则显示“红色”样式
     * @memberof UploadModal
     */
    setWrongFileNameFlag = (flag) => {
        this.setState({
            wrongFileNameFlag: flag
        });
    }

    /**
     * @description 设置文件名称是否错误，判断是否添加“红色”样式的class
     * @param {Boolean} flag - true则显示“红色”样式
     * @memberof UploadModal
     */
    setWrongLabelsFlag = (flag) => {
        this.setState({
            wrongLabelsFlag: flag
        });
    }

    /**
     * @description 上传的暂停flag
     * @param {Boolean} flag - true为上传,false为暂停
     * @memberof UploadModal
     */
    setUploadFlag = (flag) => {
        this.setState({
            uploadFlag: flag
        });
    }

    setSelectedIndex = (index) => {
        this.setState({
            selectIndex: index,
            nameInputValue: index > -1 ? this.state.fileList[index].filename : ''
        })
    }

    removeUploadSuccessFile = (uid, status) => {
        if(status == 'error') {
            this.errorUploadCount ++;
            return;
        } else {
            //最后一下上传完，把uploadFlag设回false
            if(this.state.fileList.length == this.errorUploadCount + 1) {
                this.setUploadFlag(false);
                this.setWrongFileNameFlag(false);
                this.setWrongLabelsFlag(false);
                this.setSelectedIndex(-1);
                this.props.reflashPage();
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
        let suffix = this.state.nameInputValue.match(config.fileSuffixReg)[0];
        // console.log(this.state.nameInputValue+"-----"+name+"---"+suffix);
        this.setState({
            nameInputValue: name + suffix
        });
    }

    handelNameInputBlur = (e) => {
        let name = e.target.value;
        let suffix = this.state.nameInputValue.match(config.fileSuffixReg)[0];
        // if(name == '') {
        //     message.warning("名称为空则使用原名", 2);
        //     return;
        // } else {
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
        // }
    }

    handleIconPreviewOnDelete = (index) => {
        let fileList = this.state.fileList.slice(0, index).concat(this.state.fileList.slice(index + 1));
        this.setState({fileList});
        if(index == this.state.selectIndex) {
            this.setSelectedIndex(-1);
        }
    }

    // 输入标签时， 按“回车”的事件处理
    handleLabelInputKeyUp = (e) => {
        if(e.key == 'Enter') {
            // console.log(e.target.value);
            // debugger;
            let value = e.target.value;
            this.labelInput.blur();
            this.labelInput.value = '';
            this.setState({
                labelInputEditable: false
            });
            if(value == '' || this.state.selectedLabels.indexOf(value) > -1) {
                return;
            }
            let selectedLabels = [...this.state.selectedLabels, value];
            this.setState({
                selectedLabels
            });
        }
    }

    closableTagOnClose = (e, index) => {
        // console.log(e);
        e.stopPropagation();
        let selectedLabels = [...this.state.selectedLabels.slice(0, index)
                                , ...this.state.selectedLabels.slice(index + 1)];
        // debugger;
        this.setState({
            selectedLabels
        });
        
    }

    handleLabelContainerClick = (e) => {
        // this.labelInput.focus();
        // this.setState({
        //     labelInputEditable: true
        // })
    }

    /**
     * @description 图片名称输入框onFocus
     * @memberof UploadModal
     */
    handlenameInputOnFocus = () => {
        this.setWrongFileNameFlag(false);
    }

    handleCheckableTagChange = (checked, labelName) => {
        const name = labelName.trim();
        let selectedLabels;
        let index = this.state.selectedLabels.indexOf(labelName);
        if(checked) {
            if(index > -1) {
                return;
            }
            selectedLabels = [...this.state.selectedLabels, name];
        } else {
            if(index < 0) {
                return;
            }
            selectedLabels = [...this.state.selectedLabels.slice(0, index)
                                , ...this.state.selectedLabels.slice(index + 1)];
        }
        // debugger;
        this.setState({
            selectedLabels,
            labelInputEditable: false
        });
        this.setWrongLabelsFlag(false);
    }

    render() {
        // console.log(this.state.fileList);
        // console.log(this.props.groupId);
        // console.log(this.state.fileList);
        let { wrongFileNameFlag, wrongLabelsFlag } = this.state;
        
        // 文件名 input
        let nameInputValue = this.state.nameInputValue.replace(config.fileSuffixReg, '');
        let uploadIconPreviewList = this.state.fileList.map((value, index) => {
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

        
        let labelInputTags = this.state.selectedLabels.map((value, index) => {
            return <ClosableTag
                        key={`no.${value}`}
                        onClose={this.closableTagOnClose}
                        index={index}
                        >
                        {value}
                    </ClosableTag>
        }) ;
        // console.log(labelInputTags);

        let sizeLabels = [];
        let platformLabels = [];
        this.state.labels.forEach((value, index) => {
            if(value.classification == '平台') {
                platformLabels.push(<CheckableTag
                        key={`no.${index}`}
                        onChange={this.handleCheckableTagChange}
                        checked={this.state.selectedLabels.indexOf(value.labelName) > -1}
                        >
                        {value.labelName}
                    </CheckableTag>);
            } else if (value.classification == '尺寸') {
                sizeLabels.push(<CheckableTag
                        key={`no.${index}`}
                        onChange={this.handleCheckableTagChange}
                        checked={this.state.selectedLabels.indexOf(value.labelName) > -1}
                        >
                        {value.labelName}
                    </CheckableTag>);
            }
            
        });

        // console.log(this.state.labelInputEditable,this.state.selectedLabels.length == 0);
        let labelInputPlaceHolder = (this.state.labelInputEditable 
                                    || this.state.selectedLabels.length == 0) ? '请根据格式，选择以下标签' : '';

        let  labelContainerStyle = {
            display: this.state.labelInputEditable ? 'none' : 'block'
        };
        return (
            <Modal 
                title="上传文件"
                visible={this.props.visible}
                cancelText="取消"
                okText="全部上传"
                onCancel={this.handleCancel}
                className={`custom-upload-modal-container`}
                footer={[
                    <Button key="upload" type="primary" size="large" onClick={this.handleOk}>
                        全部上传
                    </Button>
                ]}
                >
                
                    <ul className={`select-container`}>
                        <Scrollbars>
                            {uploadIconPreviewList}
                            <AddFile 
                                beforeUpload={this.handleBeforeUpload} 
                                uploadFlag={this.state.uploadFlag}
                                fileList={this.state.fileList}
                                setUploadFlag={this.setUploadFlag}
                                removeUploadSuccessFile={this.removeUploadSuccessFile}
                                groupId={this.props.groupId}
                                />
                        </Scrollbars>
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
                                className={`input ${wrongFileNameFlag ? 'wrong-input' : ''}`} 
                                placeholder="这个文件的名字" 
                                value={nameInputValue} 
                                onChange={this.handleNameInputChange}
                                onBlur={this.handelNameInputBlur}
                                onFocus={this.handlenameInputOnFocus}
                                />
                        </div>
                        <div className={`icon-label-container`}>
                            <div className={`label-text-container`}>
                                <label className={`label-text`}>标签：
                                    <span className={`not-must-input`}>(必填)</span>
                                </label>
                            </div>
                            <input 
                                ref={ref => this.labelInput = ref}
                                type="text" 
                                className={`input  ${wrongLabelsFlag ? 'wrong-input' : ''}`} 
                                placeholder={labelInputPlaceHolder}
                                onKeyUp={this.handleLabelInputKeyUp}
                                />
                            <div 
                                className={`input-label-container`}
                                style={labelContainerStyle}
                                onClick={this.handleLabelContainerClick}
                                >
                                {labelInputTags}
                            </div>
                        </div>
                        <div className={`labels-container`}>
                            <div className={`size-label`}>
                                <span>尺寸：</span>
                                <Scrollbars>
                                    {sizeLabels}
                                </Scrollbars>
                            </div>
                            <div className={`platform-label`}>
                                <span>平台：</span>
                                <Scrollbars>
                                    {platformLabels}
                                </Scrollbars>
                            </div>
                            
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
