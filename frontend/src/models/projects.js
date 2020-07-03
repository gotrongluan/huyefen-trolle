import { delay } from '@/helpers/utils';
import sampleProjects from '@/assets/fakers/projects';
import { uniqueId } from 'lodash';
import router from 'umi/router';

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
            const { sortBy } = yield select(state => state.projects);
            //yield call(fetch List projects)
            //use sortBy, page = 1, pageSize = 5
            yield delay(1500);
            const data = {
                list: sampleProjects,
                total: sampleProjects.length
            };
            yield put({
                type: 'saveProjects',
                payload: data
            });
        },
        *create({ payload }, { call, put }) {
            const { title, description } = payload;
            yield delay(1500);
            const sampleNewProject = ((title, desc) => ({
                id: uniqueId('proj_'),
                createdAt: Date.now(),
                title,
                description: desc
            }))(title, description)
            router.push(`/projects/${sampleNewProject.id}`);
        }
    },
    reducers: {
        saveProjects(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
        changePage(state, { payload: page }) {
            return {
                ...state,
                page
            };
        }
    }
}