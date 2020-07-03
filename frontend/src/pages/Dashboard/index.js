import React, { useEffect } from 'react';
import { connect } from 'dva';
import { upperCase, size } from 'lodash';
import Link from 'umi/link';
import moment from 'moment';
import randomColor from 'randomcolor';
import { List, Avatar, message, Button, Input, Select, Row, Col } from 'antd';
import DivLoading from '@/components/DivLoading';
import styles from './index.less';

const { Option } = Select;
const { Search } = Input;

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
        if (!projects) {
            dispatch({
                type: 'projects/fetch'
            });
        }
    }, []);

    const handleChangePage = page => {
        dispatch({
            type: 'projects/changePage',
            payload: page
        });
    }

    const name = user ? user.name : '...';

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
                    <div className={styles.projects}>
                        <Row className={styles.actions}>
                            <Col className={styles.search} span={16}>
                                <Search
                                    style={{
                                        width: '70%'
                                    }}
                                    enterButton
                                    placeholder="Find project"
                                />
                            </Col>
                            <Col className={styles.sortBy} span={8}>
                                <Select placeholder="Sort projects" defaultValue="newest" style={{ width: 120 }}>
                                    <Option value="newest">Newest</Option>
                                    <Option value="oldest">Oldest</Option>
                                    <Option value="a-z">A to Z</Option>
                                    <Option value="z-a">Z to A</Option>
                                </Select>
                            </Col>
                        </Row>
                        <List
                            itemLayout="horizontal"
                            dataSource={projects}
                            pagination={size(projects) > 8 ? {
                                current: currentPage,
                                total: totalProject,
                                pageSize: 8,
                                onChange: handleChangePage
                            } : false}
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
                    </div>
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