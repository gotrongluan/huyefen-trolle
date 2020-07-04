import { delay } from '@/helpers/utils';
import sampleMembers from '@/assets/fakers/members';

export default {
    namespace: 'members',
    state: null,
    effects: {
        *fetch(action, { call, put }) {
            yield delay(1800);
            yield put({
                type: 'saveMembers',
                payload: sampleMembers
            });
        }
    },
    reducers: {
        saveMembers(state, { payload: members }) {
            return [...members];
        }
    }
}