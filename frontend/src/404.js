import React from 'react';
import router from 'umi/router';
import { Result, Button } from 'antd';
import styles from './404.less';

const Page404 = () => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                Oops!
            </div>
            <div className={styles.children}>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                />
            </div>
        </div>
    )
};

export default Page404;