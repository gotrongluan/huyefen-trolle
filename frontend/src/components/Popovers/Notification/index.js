import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { connect } from 'dva';
import router from 'umi/router';
import { Popover, List, Badge, Avatar, Icon, Empty, Spin as Loading } from 'antd';
import UserAvatar from '@/components/Avatar';
import { Scrollbars } from 'react-custom-scrollbars';
import Spin from '@/elements/spins/secondary';
import { fromNow, truncate } from '@/helpers/utils';
import styles from './index.less';

const Notifications = ({ dispatch, ...props }) => {
    const scrollEleRef = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        return () => dispatch({
            type: 'notifications/reset'
        });
    }, []);
    const getContent = () => {
        const {
            notifications,
            loading,
            initLoading,
            maskLoading
        } = props;

        const content = (notifications === null || _.isEmpty(notifications)) ? (
            <div className={styles.empty}>
                <div className={styles.inlineDiv}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No notification"/>
                </div>
            </div>
        ) : (
            <Scrollbars ref={scrollEleRef} autoHeight autoHeightMax={474} onScroll={handleScroll} className={styles.scrollEle}>
                <List
                    dataSource={notifications}
                    rowKey={item => item._id}
                    renderItem={item => (
                        <div className={styles.notiItem} onClick={() => handleViewNotify(item)}>
                            <List.Item style={{ background: (item.seen ? 'inherit' : 'rgba(29, 165, 122, 0.05)')}}>
                                <List.Item.Meta
                                    avatar={(
                                        <UserAvatar
                                            size={36}
                                            src={item.user.avatar}
                                            text={item.user.name}
                                            alt="user-avatar"
                                            borderWidth={0}
                                        />
                                    )}
                                    title={<span>{truncate(item.content, 92)}</span>}
                                    description={<span style={{ fontSize: 13, color: 'gray'}}>{ fromNow(item.createdAt) }</span>}
                                />
                            </List.Item>
                        </div>
                    )}
                />
                {loading && (
                    <div className={styles.oldLoading}>
                        <Loading indicator={<Icon type="loading" style={{ fontSize: 18 }} spin />} />
                    </div>
                )}
            </Scrollbars>
        );
        return (
            <Spin
                spinning={maskLoading || initLoading || notifications === null}
                fontSize={8}
                isCenter
            >
                <div>{content}</div>
                <div className={styles.viewAll} onClick={handleViewAll}>View all</div>
            </Spin>
        );
    }

    const handleVisibleChange = visible => {
        const { notifications, initLoading } = props;
        setVisible(visible);
        if (visible && !notifications && !initLoading) {
            dispatch({
                type: 'notifications/fetch'
            });
        }
        else if (!visible) {
            if (scrollEleRef.current) scrollEleRef.current.scrollToTop();
        }
    };

    const handleScroll = e => {
        const { initLoading, loading, hasMore } = props;
        const element = e.srcElement;
        if (element.scrollTop === element.scrollHeight - 474) {
            if (!initLoading && !loading && hasMore)
                dispatch({
                    type: 'notifications/more'
                });
        }
    }

    const handleViewAll = () => {
        handleVisibleChange(false);
        router.push('/notifications');
    };

    const handleViewNotify = item => {
        //switch(item.type)...
        if (!item.seen)
            dispatch({
                type: 'notifications/read',
                payload: item._id
            });
    };

    const { unseen } = props;
    let count = 0;
    if (unseen > 0)
        count = <Avatar style={{ background: 'tomato', fontSize: '11px' }} size={16}>{unseen > 99 ? '99+' : unseen}</Avatar>;
    const trigger = (
        <span className={styles.trigger}>
            <Badge
                count={count}
                style={{ boxShadow: 'none' }}
                className={styles.badge}
                overflowCount={9}
            >
                <Icon type="bell" style={{ fontSize: 20 }} theme="filled" />
            </Badge>
        </span>
    );
    const content = getContent();
    if (!content)
        return trigger;
    return (
        <Popover
            placement="bottomRight"
            content={content}
            popupClassName={styles.popover}
            trigger="click"
            arrowPointAtCenter
            popupAlign={{ offset: [20, 10] }}
            onVisibleChange={handleVisibleChange}
            visible={visible}
        >
            {trigger}
        </Popover>
    );
};

export default connect(
    ({ notifications, loading, user }) => ({
        loading: !!loading.effects['notifications/more'],
        initLoading: !!loading.effects['notifications/fetch'],
        // hasMore: notifications.hasMore,
        // notifications: notifications.list,
        // unseen: user.noOfUsNotification
    })
)(Notifications);