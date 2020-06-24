import React from 'react';
import Spin from '@/elements/spins/primary';
import logo from '@/assets/images/main_logo.png';
import styles from './index.less';

export default () => {
    return (
        <div className={styles.pageLoading}>
            <div className={styles.spinContainer}>
                <div className={styles.brand}>
                    <img alt="Logo" src={logo} />
                </div>
                <Spin fontSize={20} margin={4} />
            </div>
        </div>
    )
};