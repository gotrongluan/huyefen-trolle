import React, { useEffect } from 'react';
import { Layout } from 'antd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollLayout from '@/components/ScrollLayout';
import styles from './index.less';

const { Content } = Layout;

const BasicLayout = ({ children }) => {
    return (
        <Layout className={styles.basicLayout}>
            <Header className={styles.header} />
            <ScrollLayout>
                <Content style={{ background: 'white' }}>
                    {children}
                </Content>
                <Footer />
            </ScrollLayout>
        </Layout>
    )
};

export default BasicLayout;