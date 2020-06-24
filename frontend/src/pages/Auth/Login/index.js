import React from 'react';
import _ from 'lodash';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';
import { Row, Form, Input, Button, Checkbox, Icon, message } from 'antd';
import styles from './index.less';

const Login = ({ dispatch, ...props }) => {
    const { loading, location } = props;
    const handleSubmit = e => {
        e.preventDefault();
        const { form } = props;
        const errors = form.getFieldsError();

        if (_.some(errors, err => err)) return message.error(formatMessage({ id: 'login.invalidinput' }));
        const { phone, password } = form.getFieldsValue();
        if (!phone || phone.trim().length === 0) return message.error(formatMessage({ id: 'login.emptyphone' }));
        if (!password || password.trim().length === 0) return message.error(formatMessage({ id: 'login.emptypassword' }));
        const from = (location.state && location.state.from) || '/';
        dispatch({
            type: 'auth/login',
            from,
            payload: {
                phone, password
            }
        });
    }

    const { getFieldDecorator } = props.form;
    return (
        <Row className={styles.login}>
            <div className={styles.title}>{formatMessage({ id: 'login.title' })}</div>
            <div className={styles.loginForm}>
                <Form onSubmit={handleSubmit} className={styles.form}>
                    <Form.Item>
                        {getFieldDecorator('phone', {
                            rules: [
                                { required: true, message: formatMessage({ id: 'login.phone.rules.required' }) },
                                { len: 10, message: formatMessage({ id: 'login.phone.rules.len' }) },
                                { pattern: /^\d+$/, message: formatMessage({ id: 'login.phone.rules.pattern' }) }
                            ],
                        })(
                            <Input
                                prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder={formatMessage({ id: 'login.phone.placeholder' })}
                                size="large"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: formatMessage({ id: 'login.password.rules.required' }) }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder={formatMessage({ id: 'login.password.placeholder' })}
                                size="large"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>{formatMessage({ id: 'login.rememberme' })}</Checkbox>)}
                        <Link className={styles.forgot} to="/">
                            {formatMessage({ id: 'login.forgotpass' })}
                        </Link>
                        <Button type="primary" htmlType="submit" className={styles.btn} size="large" icon={loading ? "loading" : null}>
                            {formatMessage({ id: 'login.btn' })}
                        </Button>
                        {formatMessage({ id: 'login.or' })} <Link to="/auth/register">{formatMessage({ id: 'login.registernow' })}</Link>
                    </Form.Item>
                </Form>
            </div>
        </Row>
    )
}

export default withRouter(Form.create()(connect(({ loading }) => ({ loading: !!loading.effects['auth/login'] }))(Login)));