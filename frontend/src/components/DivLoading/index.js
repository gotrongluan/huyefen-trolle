import { Spin, Icon } from 'antd';

export default ({ fontSize="44px", padding = 100, width = "100%" }) => {
    return (
        <div style={{ padding: `${padding}px 0`, width, textAlign: 'center' }}>
            <Spin indicator={<Icon type="loading" style={{ fontSize }}/>} spinning/>
        </div>
    )
};