import React from 'react';
import { Button } from 'antd';
import UploadModal from '../Modal/UploadModal';

class UploadBtn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uplodaModalVisible: false
        };

        this.onClick = this.onClick.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onClick() {
        this.setState({
            uplodaModalVisible: true
        });
    }

    onCancel() {
        this.setState({
            uplodaModalVisible: false
        });
    }

    render() {
        return (
            <div style={{
                marginLeft: 220
            }}>
                <Button 
                    type="primary"
                    style={{
                        width: 120,
                        height: 48,
                        fontSize: 18,
                        borderRadius: 100,
                        fontWeight: 300,
                    }}
                    onClick={this.onClick}
                >
                    上传
                </Button>
                <UploadModal 
                    visible={this.state.uplodaModalVisible}
                    onCancel={this.onCancel}
                    />
            </div>
        );
    }
}

export default UploadBtn;