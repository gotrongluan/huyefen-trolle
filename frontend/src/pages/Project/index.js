import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import _ from 'lodash';
import { Col, Row, Icon, Modal, Badge, Button, Form, Input, AutoComplete } from 'antd';
import DivLoading from '@/components/DivLoading';
import Members from '@/components/Members';
import styles from './index.less';

const FormItem = Form.Item;
const { TextArea } = Input;

const Stage = ({ title, tasks, }) => {
    return (
        <Col className={styles.stage} span={6}>
            <div className={styles.wrapper}>
                <div className={styles.wrapper2}>
                    <div className={styles.title}>
                        {title}
                    </div>
                    <div className={styles.tasksInStage}>

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
        memberLoading
    } = props;
    const projectId = match.params.id;
    const [descriptionVisible, setDescriptonVisible] = useState(false);
    const [newTaskVisible, setNewTaskVisible] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');

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

    const handleCreateNewTask = () => {

    };

    const addNewTaskDisabled = _.isEmpty(newTaskTitle) || _.isEmpty(newTaskDescription);

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
                    <Row className={styles.list} gutter={8}>
                        {_.map(_.keys(project.tasks), key => (
                            <Stage key={key} title={key} tasks={project.tasks[key]} />
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
                        
                    </FormItem>
                </Form>
            </Modal>
        </div>
    )
};

export default connect(({ loading, project, members }) => ({
    project,
    members,
    loading: loading.effects['project/fetch'],
    memberLoading: loading.effects['members/fetch']
}))(Project);