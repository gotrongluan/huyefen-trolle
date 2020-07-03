import React, { useEffect } from 'react';
import { connect } from 'dva';
import { upperCase } from 'lodash';
import Link from 'umi/link';
import moment from 'moment';
import randomColor from 'randomcolor';
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
                            <List.Item key={item.id} className={styles.projectItem} extra={(
                                <span>{`Created date: ${moment(item.createdAt).format("DD-MM-YYYY")}`}</span>
                            )}>
                                <Link to={`/projects/${item.id}`}>
                                    <List.Item.Meta
                                        title={<b>{item.title}</b>}
                                        description={item.description}
                                        avatar={<Avatar style={{ backgroundColor: randomColor() }}>{item.avatar || upperCase(item.title[0])}</Avatar>}
                                    />
                                </Link>
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