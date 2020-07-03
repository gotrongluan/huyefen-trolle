import React, { useEffect } from 'react';
import { connect } from 'dva';
import { List, Avatar, message, Button } from 'antd';
import DivLoading from '@/components/DivLoading';
import styles from './index.less';

//props
const Dashboard = (props) => {
    //JSX
    const {
        projects,
        totalProject,
        sortBy,
        currentPage,
        dispatch,
        user,
        fetchLoading
    } = props;

    useEffect(() => {
        dispatch({
            type: 'projects/fetch'
        });
        message.success('mounted!');
        return () => {
            message.success('Unmounted!!!!!!');

        }
    }, [dispatch]);

    let name = null;
    if (!user) {
        name = '...';
    }
    else if (user) {
        name = user.name;
    }
    return (
        <div className={styles.home}>
            <div className={styles.welcome}>
                {`Welcome, ${name}`}
            </div>
            <div className={styles.createNewProject}>
                <Button icon="plus" type="primary">
                    New project
                </Button>
            </div>
            <div className={styles.projectsList}>
                {!user || fetchLoading || !projects ? (
                    <DivLoading />
                ) : (
                    <List
                        itemLayout="horizontal"
                        dataSource={projects}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    title={item.title}
                                    description={item.description}
                                    //avatar={<Avatar>{item.title[0].upperCase()}</Avatar>}
                                />
                            </List.Item>
                        )}
                    />
                )}
            </div>
        </div>
    )
};

export default connect(
    ({ projects, user, loading }) => ({
        fetchLoading: !!loading.effects['projects/fetch'],
        user: user,
        projects: projects.list,
        totalProject: projects.total,
        currentPage: projects.page,
        sortBy: projects.sortBy
    })          //mapStateToProps
)(Dashboard);