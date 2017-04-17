import React from 'react';
import styles from './Index.css';
import { Layout } from 'antd';
const { Header, Content } = Layout;

import Logo from '../Header/Logo';
import SearchBar from '../Header/SearchBar';
import Group from '../Content/Group'

class Index extends React.Component {
    render() {
        return (
            <div>
                <Layout>
                    <Header className={styles["custom-ant-layout-header"]}>
                        <div className={styles["header-container"]}>
                            <Logo/>
                            <SearchBar/>
                        </div>
                    </Header>
                    <Content className={styles["custom-ant-layout-content"]}>
                        <div className={styles["content-container"]}>
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
                        </div>
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default Index;