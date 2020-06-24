import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import Redirect from 'umi/redirect';
import withRouter from 'umi/withRouter';
import PageLoading from '@/components/PageLoading';
import storage from '@/helpers/storage';

const Authenticated = ({ dispatch, children, location, ...props }) => {
    const [status, setStatus] = useState('pending');
    const { user } = props;
    useEffect(() => {
        if (user)
            setStatus('authenticated');
        else {
            const token = storage.getToken();
            if (token)
                dispatch({
                    type: 'user/fetch',
                    payload: {
                        callback: () => setStatus('authenticated')
                    }
                });
            else setStatus('not-authenticated');
        }
    }, []);
    if (status === 'pending') return <PageLoading />;
    if (status === 'not-authenticated')
        return (
            <Redirect 
                to={{
                    pathname: '/auth/login',
                    state: {
                        from: location.pathname
                    }
                }}
            />
        )
    return (<div>{children}</div>);
};

export default withRouter(connect(
    ({ user }) => ({
        user: user
    })
)(Authenticated));