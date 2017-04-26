import React from 'react';

import LayoutMain from '../Layout/LayoutMain';
import HeaderContainer from '../Layout/HeaderContainer';
import ContentContainer from '../Layout/ContentContainer';

import Logo from '../Header/Logo';
import SearchBar from '../Header/SearchBar';
import UploadBtn from '../Header/UploadBtn';
import GroupMenu from '../Menu/Menu';
import GroupLogo from '../Menu/GroupLogo';
import MenuBtnsContainer from '../Menu/MenuBtnsContainer';
import MoreMenu from '../Menu/MoreMenu';
import DownloadBtn from '../Menu/DownloadBtn';
import Split from '../Menu/Split';
import SelectAll from '../Menu/SelectAll';
import InnerGroupIcon from '../Content/InnerGroupIcon';
import axios from 'axios';
import config from '../../../config/config';

class InnerGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            group: {},
        };
    }

    componentWillMount() {
        let self = this;
        let url = `${config.serverHost}/api/getGroup`;
        let data = {
            params: {
                _id: this.props.match.params.groupid
            }
        };
        axios.get(url, data)
            .then((res) => {
                if(res.status == 200 && res.data.code == 0) {
                    self.setState({
                        group: res.data.group
                    })
                }
            }).catch((res) => {
                console.log(res);
            });
    }

    render() {
        // console.log(this.props);
        // console.log(this.state.group);
        let { group } = this.state;
        return (
            <LayoutMain>
                <HeaderContainer >
                    <Logo/>
                    <SearchBar/>
                    <UploadBtn groupId={this.props.match.params.groupid}/>
                </HeaderContainer>
                <ContentContainer >
                    <GroupMenu>
                        <GroupLogo
                            groupName={group.groupName}
                            groupIconUrl={group.groupIconUrl}
                            />
                        <MenuBtnsContainer>
                            <SelectAll />
                            <Split />
                            <DownloadBtn />
                            <MoreMenu />
                        </MenuBtnsContainer>
                    </GroupMenu>
                    <InnerGroupIcon
                        icons={group.icons}
                        ></InnerGroupIcon>
                </ContentContainer>
            </LayoutMain>
        );
    }
}

export default InnerGroup;