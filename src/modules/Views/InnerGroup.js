import React from 'react';
import { connect } from 'react-redux';

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
import { addAllIconsToIcons, removeAllIconsFromIcons} from '../../actions/icons';
import { addIconToSelectedIcons } from '../../actions/selectedIcons';

class InnerGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            group: {},
        };
    }

    componentWillMount() {
        this.reflashPage();
    }

    highlightTargetIcon = () => {
        let _id = '';
        window.location.search.slice(1).split('&').forEach((value) => {
            if(value.indexOf('_id=') == 0) {
                _id = value.replace(/_id=/, '');
            }
        });
        if(_id !== '') {
            let icon;
            this.props.icons.forEach((v) => {
                if(v._id === _id) {
                    icon = Object.assign({}, v);
                }
            });
            if(icon) {
                this.props.dispatch(addIconToSelectedIcons(icon));
            }
        }
    }

    reflashPage = () => {
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
                        group: {
                            _id: res.data.group._id,
                            meta: res.data.group.meta,
                            groupName: res.data.group.groupName,
                            groupIconUrl: res.data.group.groupIconUrl,
                            groupEngName: res.data.group.groupEngName
                        }
                    })
                    self.props.dispatch(addAllIconsToIcons(res.data.group.icons));
                    self.highlightTargetIcon();
                }
            }).catch((res) => {
                console.log(res);
            });
    }

    componentWillUnmount() {
        this.props.dispatch(removeAllIconsFromIcons());
    }

    render() {
        let { group } = this.state;
        return (
            <LayoutMain>
                <HeaderContainer >
                    <Logo/>
                    <SearchBar/>
                    <UploadBtn 
                        groupId={this.props.match.params.groupid}
                        reflashPage={this.reflashPage}
                        />
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
                            <MoreMenu reflashPage={this.reflashPage}/>
                        </MenuBtnsContainer>
                    </GroupMenu>
                    <InnerGroupIcon></InnerGroupIcon>
                </ContentContainer>
            </LayoutMain>
        );
    }
}

const mapStateToProps = (state, ownPropr) => {
    return {
        icons: state.icons
    };
}

InnerGroup = connect(mapStateToProps)(InnerGroup);

export default InnerGroup;