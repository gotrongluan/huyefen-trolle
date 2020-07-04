import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import _ from 'lodash';
import { Col, Row, Icon, Modal, Badge, Button, Form, Input, AutoComplete, Spin } from 'antd';
import Task from '@/components/Task';
import DivLoading from '@/components/DivLoading';
import Members from '@/components/Members';
import styles from './index.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = AutoComplete;

const listImages = [
    'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/220067/pexels-photo-220067.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/413195/pexels-photo-413195.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/255441/pexels-photo-255441.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
];

const Stage = ({ title, tasks, goToNextStage }) => {
    return (
        <Col className={styles.stage} span={6}>
            <div className={styles.wrapper}>
                <div className={styles.wrapper2}>
                    <div className={styles.title}>
                        {title}
                    </div>
                    <div className={styles.tasksInStage}>
                        {_.map(tasks, task => (
                            <Task key={task.id} task={task} handleGoToNextStage={goToNextStage} />
                        ))}
                    </div>
                </div>
            </div>
        </Col>
    );
};

const Project = ({ dispatch, match, ...props }) => {
    const {
        project,
        loading,
        members,
        memberLoading,
        createTaskLoading,
        nextStageLoading
    } = props;
    const projectId = match.params.id;
    const [imageIndex] = useState(Math.floor(Math.random() * 6) + 1);
    const [descriptionVisible, setDescriptonVisible] = useState(false);
    const [newTaskVisible, setNewTaskVisible] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [assigneeOptions, setAssigneeOptions] = useState([]);
    const [newTaskAssignee, setNewTaskAssginee] = useState(null);

    useEffect(() => {
        dispatch({
            type: 'project/fetch',
            payload: projectId
        });
        if (!members) {
            dispatch({
                type: 'members/fetch'
            });
        }
        return () => dispatch({
            type: 'project/reset'
        });
    }, [projectId]);
    
    useEffect(() => {
        if (members) {
            setAssigneeOptions(members);
        }
    }, [members]);

    const handleCreateNewTask = () => {
        dispatch({
            type: 'project/createTask',
            payload: {
                title: newTaskTitle,
                description: newTaskDescription,
                assignee: newTaskAssignee,
                callback: () => {
                    setNewTaskAssginee(null);
                    setNewTaskTitle('');
                    setNewTaskDescription('');
                    setNewTaskVisible(false);
                }
            }
        });
    };

    const handleAssign = value => {
        setNewTaskAssginee(value);
    };

    const handleSearchMember = value => {
        setAssigneeOptions(_.filter(members, member => {
            const upperCaseName = _.upperCase(member.name);
            const upperCaseValue = _.upperCase(value);
            return upperCaseName.includes(upperCaseValue);
        }));
    };

    const renderMemberOption = member => (
        <Option key={member.id} value={member.id}>
            {member.name}
        </Option>
    );

    const addNewTaskDisabled = _.isEmpty(newTaskTitle) || _.isEmpty(newTaskDescription) || !newTaskAssignee;
    let projectTaskKeys = null;
    if (project)
        projectTaskKeys = _.keys(project.tasks);
    return (
        <div className={styles.project}>
            <Row className={styles.header}>
                {!project || loading ? (
                    <DivLoading fontSize="24px" padding={30} />
                ) : (
                    <>
                        <Col className={styles.textInfo} span={16}>
                            <div className={styles.title}>
                                <span className={styles.icon}>
                                    <Icon type="project" theme="filled" />
                                </span>
                                <span className={styles.text}>{project.title}</span>
                            </div>
                            <div className={styles.extra}>
                                <span className={styles.time}>
                                    {`Created date: ${moment(project.createdAt).format("DD-MM-YYYY")}`}
                                </span>
                                <span className={styles.descriptionLink} onClick={() => setDescriptonVisible(true)}>
                                    Description
                                </span>
                            </div>
                        </Col>
                        <Col className={styles.members} span={8}>
                            {members && (
                                <>
                                    <div className={styles.title}>
                                        <span>Members</span>
                                        <span className={styles.badge}>
                                            <Badge count={members.length} />
                                        </span>
                                    </div>
                                    <div>
                                        <Members maxVisible={4} members={members} />
                                    </div>
                                </>
                            )}
                        </Col>
                    </>
                )}
            </Row>
            <Row className={styles.tasks}>
                {!project || loading ? (
                    <div className={styles.loading}>
                        <DivLoading  />
                    </div>
                ) : (
                    <Row className={styles.list} gutter={8} style={{ background: `url(${listImages[imageIndex - 1]})`}}>
                        {_.map(projectTaskKeys, (key, i) => (
                            <Stage
                                key={key}
                                title={key}
                                tasks={project.tasks[key]}
                                goToNextStage={(i === _.size(projectTaskKeys) - 1) ? null : taskId => {
                                    dispatch({
                                        type: 'project/toNextStage',
                                        payload: {
                                            taskId,
                                            from: key,
                                            to: projectTaskKeys[i + 1]
                                        }
                                    });
                                }}
                            />
                        ))}
                    </Row>
                )}
            </Row>
            <div disabled={!project || loading} className={styles.addTaskBtn} type="primary" size="large" onClick={() => setNewTaskVisible(true)}>
                <Icon type="plus" />
            </div>
            {project && (
                <Modal
                    className={styles.descModal}
                    visible={descriptionVisible}
                    footer={false}
                    title="Description"
                    onCancel={() => setDescriptonVisible(false)}
                >
                    {project.description}
                </Modal>
            )}
            <Modal
                className={styles.newTaskModal}
                visible={newTaskVisible}
                maskClosable={false}
                onOk={handleCreateNewTask}
                onCancel={() => setNewTaskVisible(false)}
                title="Create new task"
                okButtonProps={{
                    disabled: addNewTaskDisabled
                }}
                confirmLoading={createTaskLoading}
            >
                <Form>
                    <FormItem label="Title" required>
                        <Input
                            value={newTaskTitle}
                            placeholder="Task title"
                            onChange={e => setNewTaskTitle(e.target.value)}
                        />
                    </FormItem>
                    <FormItem label="Description" required>
                        <TextArea
                            autoSize={{
                                minRows: 6,
                                maxRows: 6
                            }}
                            placeholder="Task description"
                            value={newTaskDescription}
                            onChange={e => setNewTaskDescription(e.target.value)}
                        />
                    </FormItem>
                    <FormItem label="Assignee">
                        <AutoComplete
                            style={{
                                width: 250
                            }}
                            onSelect={handleAssign}
                            onSearch={handleSearchMember}
                            placeholder="Assign to member"
                            dataSource={assigneeOptions.map(renderMemberOption)}
                            disabled={!members || memberLoading}
                        />
                    </FormItem>
                </Form>
            </Modal>
            <Modal
                visible={nextStageLoading}
                bodyStyle={{
                    textAlign: 'center'
                }}
                width={160}
                title={null}
                footer={false}
                className={styles.loadingModal}
                centered
                closable={false}
            >
                <Spin tip="Changing..." />
            </Modal>
        </div>
    )
};

export default connect(({ loading, project, members }) => ({
    project,
    members,
    loading: !!loading.effects['project/fetch'],
    memberLoading: !!loading.effects['members/fetch'],
    createTaskLoading: !!loading.effects['project/createTask'],
    nextStageLoading: !!loading.effects['project/toNextStage']
}))(Project);