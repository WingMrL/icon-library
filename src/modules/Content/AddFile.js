import React from 'react';

import axios from 'axios';

import './AddFile.less';
import { Upload, message } from 'antd';
import config from '../../../config/config';

import defaultRequest from '../../utils/request';

class AddFile extends React.Component {

    

    constructor(props) {
        super(props);
        // this.uploadCount = -1;
    }

    handleBeforeUpload = (file, fileList) => {
        let self = this;
        this.props.beforeUpload(file, fileList);

        return new Promise((resolve, rejected) => {
            let timer = setInterval(() => {
                if(self.props.uploadFlag) {
                    resolve();
                    clearInterval(timer);
                    timer = null;
                }
            }, 500);
        });
    };

    handleChange = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功！`);
            this.props.removeUploadSuccessFile(info.file.uid, info.file.status);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败！`);
            this.props.removeUploadSuccessFile(info.file.uid, info.file.status);
        }
        
    }

    handleCustomRequest = (obj) => {
        let self = this;

        // // 一次上传可能会同时上传多张图片，这个方法可能被执行多次
        // // uploadCount为-1的时候代表第一次执行，初始化上传数量
        // if(this.uploadCount == -1) {
        //     this.uploadCount = this.props.fileList.length;
        // }
        this.props.fileList.forEach((value) => {
            if(value.uid == obj.file.uid) {

                // if(obj.file.filename.indexOf('.') == 0) { // 文件名为空，不上传
                    
                // } else if (obj.file.labels.length == 0) { // 标签为空，不上传

                // } else { // 上传
                    let file = obj.file;
                    obj.data = {
                        filename: file.filename,
                        width: file.width,
                        height: file.height,
                        labels: [...file.labels],
                        size: file.size,
                        type: file.type,
                        uid: file.uid,
                        groupId: self.props.groupId
                    }
                    // debugger;
                    defaultRequest(obj);
                // }

                // // 计算还剩多少张还没上传，这里只计算是否已经进行上传操作
                // // 不管是否上传成功
                // if(this.uploadCount == 1) { // 最后一张
                //     this.uploadCount = -1;
                //     self.props.setUploadFlag(false);
                // } else {
                //     this.uploadCount --;
                // }
            }
        })
    }

    render() {
        // console.log(this.props.groupId);
        return (
            <Upload
                showUploadList={false}
                name="icon"
                action={`${config.serverHost}/api/uploadIcon`}
                className={`custom-file-upload-container`}
                onChange={this.handleChange}
                beforeUpload={this.handleBeforeUpload}
                multiple
                customRequest={this.handleCustomRequest}
                accept={`.png, .jpg, .svg, .jpeg`}
                >
                <li className={`upload`}>
                </li>
            </Upload>
        );
    }
}

export default AddFile;