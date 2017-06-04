import React from 'react';

import LayoutMain from '../Layout/LayoutMain';
import HeaderContainer from '../Layout/HeaderContainer';
import ContentContainer from '../Layout/ContentContainer';
import FooterContainer from '../Layout/FooterContainer';

import Logo from '../Header/Logo';
import SearchBar from '../Header/SearchBar';
import Group from '../Content/Group';

import { Button } from 'antd';
import axios from 'axios';

import config from '../../../config/config';


/**
 * @description 初始化group数据库集合
 * 
 */
let initGroup = () => {
    axios.post(`${config.serverHost}/api/addGroup`, {
            groupName: "EasiNote5",
            groupIconUrl: "assets/images/group-logo-EasiNote5.png",
            groupEngName: "EasiNote5",
        }).then(function(res) {
            console.log(res);
        }).catch(function(res) {
            console.warn(res);
        });
        axios.post(`${config.serverHost}/api/addGroup`, {
            groupName: "班级优化大师大板端",
            groupIconUrl: "assets/images/group-logo-班级优化大师大板端.png",
            groupEngName: "CarePad",
        }).then(function(res) {
            console.log(res);
        }).catch(function(res) {
            console.warn(res);
        });
        axios.post(`${config.serverHost}/api/addGroup`, {
            groupName: "班级优化大师手机端",
            groupIconUrl: "assets/images/group-logo-班级优化大师手机端.png",
            groupEngName: "CarePhone",
        }).then(function(res) {
            console.log(res);
        }).catch(function(res) {
            console.warn(res);
        });
        axios.post(`${config.serverHost}/api/addGroup`, {
            groupName: "班级优化大师PC端",
            groupIconUrl: "assets/images/group-logo-班级优化大师PC端.png",
            groupEngName: "CarePC",
        }).then(function(res) {
            console.log(res);
        }).catch(function(res) {
            console.warn(res);
        });
        axios.post(`${config.serverHost}/api/addGroup`, {
            groupName: "视频展台Camera",
            groupIconUrl: "assets/images/group-logo-视频展台Camera.png",
            groupEngName: "Carema",
        }).then(function(res) {
            console.log(res);
        }).catch(function(res) {
            console.warn(res);
        });
        axios.post(`${config.serverHost}/api/addGroup`, {
            groupName: "希沃授课助手Link",
            groupIconUrl: "assets/images/group-logo-希沃授课助手Link.png",
            groupEngName: "SeewoLink",
        }).then(function(res) {
            console.log(res);
        }).catch(function(res) {
            console.warn(res);
        });
        axios.post(`${config.serverHost}/api/addGroup`, {
            groupName: "希沃学院",
            groupIconUrl: "assets/images/group-logo-希沃学院.png",
            groupEngName: "SeewoCollege",
        }).then(function(res) {
            console.log(res);
        }).catch(function(res) {
            console.warn(res);
        });
        axios.post(`${config.serverHost}/api/addGroup`, {
            groupName: "希沃远程教学Net",
            groupIconUrl: "assets/images/group-logo-希沃远程教学Net.png",
            groupEngName: "SeewoNet",
        }).then(function(res) {
            console.log(res);
        }).catch(function(res) {
            console.warn(res);
        });
        axios.post(`${config.serverHost}/api/addGroup`, {
            groupName: "希沃OS定制版",
            groupIconUrl: "assets/images/group-logo-希沃OS定制版.png",
            groupEngName: "SeewoOSCustom",
        }).then(function(res) {
            console.log(res);
        }).catch(function(res) {
            console.warn(res);
        });
        axios.post(`${config.serverHost}/api/addGroup`, {
            groupName: "希沃OS公用版",
            groupIconUrl: "assets/images/group-logo-希沃OS公用版.png",
            groupEngName: "SeewoOSPublic",
        }).then(function(res) {
            console.log(res);
        }).catch(function(res) {
            console.warn(res);
        });
};


/**
 * @description 初始化label数据库集合
 * 
 */
let initLabel = () => {
    axios.post(`${config.serverHost}/api/addLabel`, {
        labelName: '16x16',
        classification: '尺寸'
    }).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
    axios.post(`${config.serverHost}/api/addLabel`, {
        labelName: '24x24',
        classification: '尺寸'
    }).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
    axios.post(`${config.serverHost}/api/addLabel`, {
        labelName: '32x32',
        classification: '尺寸'
    }).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
    axios.post(`${config.serverHost}/api/addLabel`, {
        labelName: '48x48',
        classification: '尺寸'
    }).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
    axios.post(`${config.serverHost}/api/addLabel`, {
        labelName: '64x64',
        classification: '尺寸'
    }).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
    axios.post(`${config.serverHost}/api/addLabel`, {
        labelName: '其他',
        classification: '尺寸'
    }).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
    axios.post(`${config.serverHost}/api/addLabel`, {
        labelName: 'PC',
        classification: '平台'
    }).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
    axios.post(`${config.serverHost}/api/addLabel`, {
        labelName: '移动',
        classification: '平台'
    }).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
    axios.post(`${config.serverHost}/api/addLabel`, {
        labelName: 'OS海内',
        classification: '平台'
    }).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
    axios.post(`${config.serverHost}/api/addLabel`, {
        labelName: 'OS海外',
        classification: '平台'
    }).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
    axios.post(`${config.serverHost}/api/addLabel`, {
        labelName: '外协',
        classification: '平台'
    }).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
};


/**
 * 首页
 * 
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            groups: []
        }
        // this.handleClick = this.handleClick.bind(this);
    }

    
    componentWillMount() {
        let self = this;
        axios.get(`${config.serverHost}/api/getGroups`)
            .then((res) => {
                if(res.status == 200 && res.data.code == 0) {
                    self.setState({
                        groups: res.data.groups
                    })
                }
            }).catch((res) => {

            });
    }
    

    handleClick(e) {
        initGroup();
        initLabel();
    }

    render() {
        const { history } = this.props;
        const groupList = this.state.groups.map((value) => {
            return <Group 
                key={value._id}
                groupName={value.groupName}
                groupEngName={value.groupEngName}
                _id={value._id}
                groupIconUrl={value.groupIconUrl}
                icons={value.icons}
                />
        })
        return (
            <LayoutMain>
                <HeaderContainer>
                    <Logo/>
                    <SearchBar 
                        history={history}
                        />
                </HeaderContainer>
                <ContentContainer>
                    {groupList}
                    {/*<Button 
                        onClick={this.handleClick}
                        > 初始化数据库 </Button>*/}
                </ContentContainer>
                <FooterContainer>
                </FooterContainer>
            </LayoutMain>
        );
    }
}

export default Index;