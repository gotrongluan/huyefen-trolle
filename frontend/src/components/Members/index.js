import React, { useState } from 'react';
import { map, range, min, chunk } from 'lodash';
import { Modal, Avatar, Row, Col } from 'antd';
import randomColor from 'randomcolor';
import styles from './index.less';

const Members = ({ members, maxVisible = 6 }) => {
    const [allMembersVisible, setAllMembersVisible] = useState(false);
    const length = min([members.length, maxVisible]);
    const hanldeShowAllMembers = () => setAllMembersVisible(true);
    const membersData = chunk(members, 6);
    return (
        <>
            <div className={styles.members}>
                <div className={styles.main}>
                    {map(range(length), i => (
                        <Avatar
                            key={i}
                            className={styles.avatar}
                            style={{ backgroundColor: randomColor(), left: i * -10 }}
                            size={36}
                        >{members[i].name[0]}</Avatar>
                    ))}
                </div>
                {members.length > length && (
                    <div className={styles.extra}>
                        <span onClick={hanldeShowAllMembers}>{`+ ${members.length - length}`}</span>
                    </div>
                )}
            </div>
            <Modal className={styles.allMembersModal} title="Members" visible={allMembersVisible} footer={false} onCancel={() => setAllMembersVisible(false)}>
                {map(membersData, (membersRow, i) => (
                    <Row gutter={16} className={styles.membersRow} key={i}>
                        {map(membersRow, member => (
                            <Col key={member.id} span={4} className={styles.memberCol}>
                                <div >
                                    <Avatar className={styles.avatar} style={{ backgroundColor: randomColor() }} size={48}>{member.name[0]}</Avatar>
                                </div>
                                <div className={styles.name}>
                                    {member.name}
                                </div>
                            </Col>
                        ))}
                    </Row>
                ))}
            </Modal>
        </>
    )
}

export default Members;