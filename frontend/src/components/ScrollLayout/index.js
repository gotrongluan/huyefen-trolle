import React, { useEffect, useRef } from 'react';
import withRouter from 'umi/withRouter';
import { Layout } from 'antd';
import Scrollbars from 'react-custom-scrollbars';
import styles from './index.less';

const ScrollLayout = ({ children, location }) => {
    const scrollElRef = useRef(null);
    const { pathname } = location;
    useEffect(() => {
        const element = scrollElRef.current;
        if (element) element.scrollToTop();
    }, [pathname]);
    return (
        <Scrollbars
            className={styles.container}
            ref={scrollElRef}
        >
            <Layout>
                {children}
            </Layout>
        </Scrollbars>
    )
};

export default withRouter(ScrollLayout);