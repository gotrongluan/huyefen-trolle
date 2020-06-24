import React from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { Layout, Row, Col, Popover, Divider, Input } from 'antd';
import UserAvatar from '@/components/Avatar';
import Notifications from '@/components/Popovers/Notification';
import Messages from '@/components/Popovers/Message';
import logo from '@/assets/images/main_logo.png';
import styles from './index.less';

const { Header: AntHeader } = Layout;
const { Search } = Input;

const Header = ({ user, dispatch }) => {
    const handleLogout = () => {
        dispatch({
            type: 'auth/logout'
        });
    };
    return (
        <AntHeader theme="light" className={styles.header}>
            <div className={styles.leftContent}>
                <div className={styles.logo}>
                    <Link to="/"><img src={logo} alt="Logo" /></Link>
                </div>
                <div className={styles.search}>
                    <Search
                        placeholder="Search everything here..."
                        size="large"
                        
                    />
                </div>
            </div>
            <div className={styles.rightContent}>
                {user ? (
                    <React.Fragment>
                        <div className={styles.account}>
                            <Popover
                                placement="bottomRight"
                                trigger="click"
                                popupAlign={{ offset: [-8, -13] }}
                                popupClassName={styles.accountPopover}
                                content={(
                                    <div>
                                        <Row className={styles.info}>
                                            <Col span={4}>
                                                <UserAvatar
                                                    borderWidth={0}
                                                    alt="user-avatar"
                                                    size={39}
                                                    text={user.name}
                                                    src={user.avatar}
                                                />
                                            </Col>
                                            <Col span={20} style={{ paddingLeft: '4px' }}>
                                                <div className={styles.name}><b>{user.name}</b></div>
                                                <div className={styles.mail}>{user.email || 'noreply@gmail.com'}</div>
                                            </Col>
                                        </Row>
                                        <div className={styles.item}>
                                            <span className={styles.text}>Account settings</span>
                                        </div>
                                        <div className={styles.item}>
                                            <span className={styles.text}>Change password</span>
                                        </div>
                                        <Divider className={styles.divider} />
                                        <div className={styles.item} onClick={handleLogout}>
                                            <span className={styles.text}>Sign out</span>
                                        </div>
                                    </div>
                                )}
                            >
                                <div className={styles.accountText}>
                                    <UserAvatar
                                        borderWidth={0}
                                        alt="user-avatar"
                                        size={32}
                                        text={user.name}
                                        src={user.avatar}
                                    />
                                </div>
                            </Popover>
                        </div>
                        <div className={styles.notifications}>
                            <Notifications />
                        </div>
                        <div className={styles.messages}>
                            <Messages />
                        </div>
                    </React.Fragment>
                ) : null}
            </div>
        </AntHeader>
    )
};

export default connect(
    ({ user }) => ({
        user
    })
)(Header);