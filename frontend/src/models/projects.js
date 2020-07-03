import { delay } from '@/helpers/utils';
import sampleProjects from '@/assets/fakers/projects';

export default {
    namespace: 'projects',
    state: {
        list: null,
        total: null,
        page: 1,
        sortBy: 'newest'
    },
    effects: {
        *fetch({ payload }, { call, put, select }) {
            const { page, sortBy } = yield select(state => state.projects);
            //yield call(fetch List projects)
            //use sortBy, page = 1, pageSize = 5
            yield delay(1500);
            const data = {
                list: sampleProjects,
                total: 100
            };
            yield put({
                type: 'sampleSave',
                payload: data
            });
        }
    },
    reducers: {
        sampleSave(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        }
    }
}