import React, { useState } from 'react';
import { connect } from 'dva';
import { Avatar, Tooltip, Icon } from 'antd';
import { find } from 'lodash';
import randomColor from 'randomcolor';
import styles from './index.less';

const Task = ({ task, handleGoToNextStage, members }) => {
    const [color] = useState(randomColor());
    return (
        <div className={styles.task}>
            <div className={styles.title}>
                {task.title}
            </div>
            <div className={styles.description}>
                {task.description}
            </div>
            <div className={styles.avatar}>
                <Avatar size={24} style={{ backgroundColor: color }}>
                    {!members ? '?' : (find(members, ['id', task.assignee]) || { name: '?' }).name[0]}
                </Avatar>
            </div>
            {handleGoToNextStage && (
                <div className={styles.next}>
                    <Tooltip title="Go to next stage">
                        <span className={styles.btn} onClick={() => handleGoToNextStage(task.id)}>
                            <Icon type="arrow-right" />
                        </span>
                    </Tooltip>
                </div>
            )}
        </div>
    )
};

export default connect(({ members }) => ({
    members
}))(Task);