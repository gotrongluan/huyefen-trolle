import React from 'react';
import { formatMessage, getLocale, setLocale } from 'umi-plugin-react/locale';
import { Select } from 'antd';
import logo from '@/assets/images/footer_logo.png';
import styles from './index.less';

const { Option } = Select;

const Footer = () => {
    const handleChangeLocale = locale => setLocale(locale);

    return (
        <div className={styles.footer}>
            <div className={styles.brand}>
                <div className={styles.copyright}>
                    <img alt="logo" src={logo} />
                    <span className={styles.text}>
                        © 2020 HuYeFen Trolle Inc. All rights reserved.
                    </span>
                </div>
                <div className={styles.locale}>
                    <Select value={getLocale()} onChange={handleChangeLocale} style={{ width: 150, maxWidth: '100%' }}>
                        <Option value="en-US">{formatMessage({ id: 'locale.english' })}</Option>
                        <Option value="vi-VN">{formatMessage({ id: 'locale.vietnamese' })}</Option>
                    </Select>
                </div>
            </div>
            <div className={styles.colorBar} />
        </div>
    )
};

export default Footer;