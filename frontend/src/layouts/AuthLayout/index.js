import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import router from 'umi/router';
import { Row } from 'antd';
import background from '@/assets/images/background-login.svg';
import styles from './index.less';

const AuthLayout = ({ children }) => {
    return (
        <Row className={styles.authLayout} style={{ background: `url(${background})` }}>
            <Row className={styles.inlineDiv}>
                <div className={styles.title}>
                    <div className={styles.huyefen} onClick={() => router.push('/')}>HuYeFen</div>
                    <div className={styles.slogan}>
                        {formatMessage({ id: 'authLayout.slogan1' })}
                    </div>
                    <div className={styles.slogan}>
                        {formatMessage({ id: 'authLayout.slogan2' })}
                    </div>
                </div>
                <div className={styles.child}>
                    {children}
                </div>
            </Row>
        </Row>
    )
};

export default AuthLayout;