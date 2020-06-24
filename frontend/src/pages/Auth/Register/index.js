import React, { useEffect } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import { Row, Col, Form, Input, Button, Select, DatePicker, message } from 'antd';
import styles from './index.less';

const { Option } = Select;

const Register = ({ dispatch, ...props }) => {
    const { loading } = props;
    const handleSubmit = e => {
        e.preventDefault();
        const {
            form,
        } = props;
        const errors = form.getFieldsError();

        if (_.some(errors, err => err)) return message.error(formatMessage({ id: 'register.invalidinput' }));
        const { name, phone, email, password, gender, birthday } = form.getFieldsValue();
        if (!phone || phone.trim().length === 0) return message.error(formatMessage({ id: 'register.emptyphone' }));
        if (!password || password.trim().length === 0) return message.error(formatMessage({ id: 'register.emptypassword' }));
        if (!name || name.trim().length === 0) return message.error(formatMessage({ id: 'register.emptyname' }));
        if (!email || email.trim().length === 0) return message.error(formatMessage({ id: 'register.emptyemail' }));
        const info = {
            name, password, phone, gender, email,
            birthday: birthday.format("YYYY-MM-DD")
        };
        dispatch({
            type: 'auth/register',
            payload: info
        });
    }
    const { getFieldDecorator } = props.form;
    return (
        <Row className={styles.register}>
            <div className={styles.title}>Register</div>
            <div className={styles.registerForm}>
                <Form onSubmit={handleSubmit} className={styles.form}>
                    <Form.Item>
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: formatMessage({ id: 'register.name.rules.required' }) },
                            ],
                        })(
                            <Input
                                placeholder={formatMessage({ id: 'register.name.placeholder' })}
                                size="large"
                            />,
                        )}
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item>
                                {getFieldDecorator('gender', {
                                    initialValue: 'male'
                                })(
                                    <Select placeholder={formatMessage({ id: 'register.gender.placeholder' })} size="large">
                                        <Option value="male" >{formatMessage({ id: 'register.gender.male' })}</Option>
                                        <Option value="female">{formatMessage({ id: 'register.gender.female' })}</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item>
                                {getFieldDecorator('birthday', {
                                    initialValue: moment()
                                })(
                                    <DatePicker placeholder={formatMessage({ id: 'register.birthday.placeholder' })} size="large"/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: formatMessage({ id: 'register.password.rules.required' }) },
                                { min: 6, message: formatMessage({ id: 'register.password.rules.min' })}
                            ],
                        })(
                            <Input
                                type="password"
                                placeholder={formatMessage({ id: 'register.password.placeholder' })}
                                size="large"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [
                                { required: true, message: formatMessage({ id: 'register.email.rules.required' }) },
                                { pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: formatMessage({ id: 'register.email.rules.pattern' })}
                            ]
                        })(
                            <Input
                                placeholder={formatMessage({ id: 'register.email.placeholder' })}
                                size="large"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('phone', {
                            rules: [
                                { required: true, message: formatMessage({ id: 'register.phone.rules.required' }) },
                                { len: 10, message: formatMessage({ id: 'register.phone.rules.len' }) },
                                { pattern: /^\d+$/, message: formatMessage({ id: 'register.phone.rules.pattern' }) }
                            ],
                        })(
                            <Input
                                addonBefore={
                                    <Select defaultValue={84}>
                                        <Option value={84} style={{ paddingRight: 5 }}>+84</Option>
                                    </Select>
                                }
                                placeholder={formatMessage({ id: 'register.phone.placeholder' })}
                                size="large"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className={styles.btn} size="large" icon={loading ? "loading" : null}>
                            {formatMessage({ id: 'register.btn' })}
                        </Button>
                        {formatMessage({ id: 'register.or' })} <Link to="/auth/login">{formatMessage({ id: 'register.already' })}</Link>
                    </Form.Item>
                </Form>
            </div>
        </Row>
    );
}

export default Form.create()(
    connect(
        ({ loading }) => ({
            loading: !!loading.effects['auth/register']
        })
    )(Register)
);