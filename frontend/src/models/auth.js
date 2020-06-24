import { delay } from '@/helpers/utils';
import storage from '@/helpers/storage';
import router from 'umi/router';
import sampleUser from '@/assets/fakers/user';

export default {
    namespace: 'auth',
    state: null,
    effects: {
        *register({ payload }, { call, put }) {
            
        },
        *login({ from, payload }, { call, put }) {
            const { phone, password } = payload;
            yield delay(1600);
            const sampleToken = 'sample-token';
            storage.setToken(sampleToken);
            yield put({
                type: 'user/save',
                payload: sampleUser
            });
            //set FCM token
            router.replace(from);
        },
        *logout(_, { put }) {
            storage.setToken(null);
            router.push('/auth/login');
            yield put({ type: 'user/reset' });
        }
    }
}