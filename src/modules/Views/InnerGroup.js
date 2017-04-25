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

class InnerGroup extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        // console.log(this.props);
        return (
            <LayoutMain>
                <HeaderContainer >
                    <Logo/>
                    <SearchBar/>
                    <UploadBtn groupId={this.props.match.params.groupid}/>
                </HeaderContainer>
                <ContentContainer >
                    <GroupMenu>
                        <GroupLogo/>
                        <MenuBtnsContainer>
                            <SelectAll />
                            <Split />
                            <DownloadBtn />
                            <MoreMenu />
                        </MenuBtnsContainer>
                    </GroupMenu>
                    <InnerGroupIcon></InnerGroupIcon>
                </ContentContainer>
            </LayoutMain>
        );
    }
}

export default InnerGroup;