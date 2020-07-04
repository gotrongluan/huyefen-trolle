import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { upperCase, size, filter, map, range, isEmpty } from 'lodash';
import router from 'umi/router';
import Link from 'umi/link';
import moment from 'moment';
import randomColor from 'randomcolor';
import { List, Avatar, AutoComplete, Button, Input, Select, Row, Col, Modal, Form } from 'antd';
import DivLoading from '@/components/DivLoading';
import styles from './index.less';

const { Option } = Select;
const { Search, TextArea } = Input;
const { Option : AutoCompleteOption } = AutoComplete;
const FormItem = Form.Item;

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

    const [searchOptions, setSearchOptions] = useState([{ value: '1' }, { value: '2' }]);
    const [randomColors, setRandomColors] = useState(map(range(8), i => randomColor()));
    const [newProjectModalVisible, setNewProjectModalVisible] = useState(false);
    const [newProjectTitle, setNewProjectTitle] = useState('');
    const [newProjectDesc, setNewProjectDesc] = useState('');
    useEffect(() => {
        if (!projects) {
            dispatch({
                type: 'projects/fetch'
            });
        }
    }, []);

    useEffect(() => {
        if (projects) {
            setSearchOptions(map(projects, mapProjectToSearchOption));
        }
    }, [projects]);

    const handleChangePage = page => {
        setRandomColors(map(range(8),  i => randomColor()));
        dispatch({
            type: 'projects/changePage',
            payload: page
        });
    };

    const handleSearchProjects = value => {
        setSearchOptions(map(
            filter(projects, project => {
                const upperCaseTitle = upperCase(project.title);
                const upperCaseDescription = upperCase(project.description);
                const upperCaseValue = upperCase(value);
                return upperCaseTitle.includes(upperCaseValue) || upperCaseDescription.includes(upperCaseValue);
            }),
            mapProjectToSearchOption
        ));
    };

    const handleCreateNewProject = () => {
        dispatch({
            type: 'projects/create',
            payload: {
                title: newProjectTitle,
                description: newProjectDesc
            }
        });
        setNewProjectDesc('');
        setNewProjectTitle('');
        setNewProjectModalVisible(false);
    };

    const createProjectDisabled = isEmpty(newProjectDesc) || isEmpty(newProjectTitle);


    const mapProjectToSearchOption = project => ({
        key: project.id,
        value: project.id,
        label: project.title
    });

    const renderOption = option => (
        <AutoCompleteOption key={option.key} value={option.value}>
            <div>{option.label}</div>
        </AutoCompleteOption>
    )

    const name = user ? user.name : '...';

    return (
        <div className={styles.home}>
            <div className={styles.welcome}>
                {`Welcome, ${name}`}
            </div>
            <div className={styles.createNewProject}>
                <Button icon="plus" type="primary" onClick={() => setNewProjectModalVisible(true)}>
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
                                <AutoComplete
                                    dataSource={map(searchOptions, renderOption)}
                                    onSearch={handleSearchProjects}
                                    onSelect={projectId => router.push(`/projects/${projectId}`)}
                                    style={{
                                        width: '70%'
                                    }}
                                >
                                    <Search
                                        style={{ width: '100%' }}
                                        enterButton
                                        placeholder="Find project"
                                    />
                                </AutoComplete>
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
                            renderItem={(item, i) => (
                                <List.Item key={item.id} className={styles.projectItem} extra={(
                                    <span>{`Created date: ${moment(item.createdAt).format("DD-MM-YYYY")}`}</span>
                                )}>
                                    <Link to={`/projects/${item.id}`}>
                                        <List.Item.Meta
                                            title={<b>{item.title}</b>}
                                            description={item.description}
                                            avatar={<Avatar style={{ backgroundColor: randomColors[i % 8] }}>{item.avatar || upperCase(item.title[0])}</Avatar>}
                                        />
                                    </Link>
                                </List.Item>
                            )}
                        />
                    </div>
                )}
            </div>
            <Modal
                className={styles.newProjectModal}
                title="New Project"
                visible={newProjectModalVisible}
                onCancel={() => setNewProjectModalVisible(false)}
                onOk={handleCreateNewProject}
                okButtonProps={{
                    disabled: createProjectDisabled
                }}
            >
                <Form>
                    <FormItem label="Title">
                        <Input
                            placeholder="Project title"
                            value={newProjectTitle}
                            onChange={e => setNewProjectTitle(e.target.value)}
                        />
                    </FormItem>
                    <FormItem label="Description">
                        <TextArea
                            placeholder="Project description"
                            autoSize={{
                                minRows: 6,
                                maxRows: 6
                            }}
                            value={newProjectDesc}
                            onChange={e => setNewProjectDesc(e.target.value)}
                        />
                    </FormItem>
                </Form>
            </Modal>
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