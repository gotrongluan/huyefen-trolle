import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { Spin } from 'antd';

export default ({ children, fontSize, margin = 2, ...restProps}) => {
    const icon = <BeatLoader loading={true} size={`${fontSize}px`} color="#1DA57A" margin={margin}/>
    return (
        <Spin indicator={icon} {...restProps}>
            {children}
        </Spin>
    );
};