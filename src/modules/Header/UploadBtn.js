import React from 'react';
import { Button } from 'antd';

class UploadBtn extends React.Component {
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
                    }}
                >
                    上传
                </Button>
            </div>
        );
    }
}

export default UploadBtn;