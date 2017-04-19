import React from 'react';

import LayoutMain from '../Layout/LayoutMain';
import HeaderContainer from '../Layout/HeaderContainer';
import ContentContainer from '../Layout/ContentContainer';

import Logo from '../Header/Logo';
import SearchBar from '../Header/SearchBar';
import Group from '../Content/Group';

class Index extends React.Component {
    render() {
        return (
            <LayoutMain>
                <HeaderContainer>
                    <Logo/>
                    <SearchBar/>
                </HeaderContainer>
                <ContentContainer>
                    <Group />
                    <Group />
                    <Group />
                    <Group />
                    <Group />
                    <Group />
                    <Group />
                    <Group />
                    <Group />
                    <Group />
                    <Group />
                    <Group />
                    <Group />
                </ContentContainer>
            </LayoutMain>
        );
    }
}

export default Index;