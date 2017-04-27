import React from 'react';

import LayoutMain from '../Layout/LayoutMain';
import HeaderContainer from '../Layout/HeaderContainer';
import ContentContainer from '../Layout/ContentContainer';

import Logo from '../Header/Logo';
import SearchBar from '../Header/SearchBar';
import GroupMenu from '../Menu/Menu';
import ResultTitle from '../Menu/ResultTitle';
import MenuBtnsContainer from '../Menu/MenuBtnsContainer';
import MoreMenu from '../Menu/MoreMenu';
import DownloadBtn from '../Menu/DownloadBtn';
import OpenFileLocation from '../Menu/OpenFileLocation';
import Split from '../Menu/Split';
import SelectAll from '../Menu/SelectAll';
import InnerGroupIcon from '../Content/InnerGroupIcon';
import Group from '../Content/Group';
import FileNotFound from '../Content/FileNotFound';

class SearchResult extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fileNotFound: false,
            searchName: '',
        };
    }

    componentWillMount() {
        let searchName = '';
        window.location.search.slice(1).split('&').forEach((value) => {
            if(value.indexOf('search=') == 0) {
                searchName = value.replace(/search=/, '');
            }
        });
        console.log(searchName);
        this.setState({
            searchName
        });
    }

    render() {
        return (
            <LayoutMain>
                <HeaderContainer >
                    <Logo/>
                    <SearchBar/>
                </HeaderContainer>
                <ContentContainer >
                    { this.state.fileNotFound ?
                    <FileNotFound /> :
                    <div>
                        <GroupMenu>
                            <ResultTitle/>
                            <MenuBtnsContainer>
                                <SelectAll />
                                <Split />
                                <OpenFileLocation />
                                <DownloadBtn />
                                <MoreMenu />
                            </MenuBtnsContainer>
                        </GroupMenu>
                        <div className={`group-container`}>
                            <Group style={{
                                marginTop: 20
                            }}/>
                        </div>
                        <InnerGroupIcon></InnerGroupIcon>
                    </div>}
                </ContentContainer>
            </LayoutMain>
        );
    }
}

export default SearchResult;