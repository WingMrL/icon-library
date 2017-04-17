import React from 'react';
import styles from './SearchResult.less';
import { Layout } from 'antd';
const { Header, Content } = Layout;

import Logo from '../Header/Logo';
import SearchBar from '../Header/SearchBar';
import UploadBtn from '../Header/UploadBtn';
// import GroupMenu from '../Menu/Menu';
// import GroupLogo from '../Menu/GroupLogo';
// import MenuBtnsContainer from '../Menu/MenuBtnsContainer';
// import MoreMenu from '../Menu/MoreMenu';
// import DownloadBtn from '../Menu/DownloadBtn';
// import Split from '../Menu/Split';
// import SelectAll from '../Menu/SelectAll';
// import InnerGroupIcon from '../Content/InnerGroupIcon';



class SearchResult extends React.Component {
    render() {
        return (
            <div>
                <Layout>
                    <Header className={`custom-result-ant-layout-header`}>
                        <div className={`custom-result-header-container`}>
                            <Logo/>
                            <SearchBar/>
                            <UploadBtn />
                        </div>
                    </Header>
                    <Content className={`custom-result-ant-layout-content`}>
                        <div className={`custom-result-content-container`}>
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
                        </div>
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default SearchResult;