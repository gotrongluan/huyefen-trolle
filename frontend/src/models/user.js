import { delay } from '@/helpers/utils';
import sampleUser from '@/assets/fakers/user';

export default {
    namespace: 'user',
    state: null,
    effects: {
        *fetch({ payload }, { call, put }) {
            const { callback } = payload;
            yield delay(1200);
            yield put({
                type: 'save',
                payload: sampleUser
            });
            if (callback) callback();
        },
    },
    reducers: {
        save(state, { payload }) {
            return { ...payload };
        },
        reset() {
            return null;
        }
    }
}