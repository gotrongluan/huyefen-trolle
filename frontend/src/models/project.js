import { delay } from '@/helpers/utils';
import sampleProject from '@/assets/fakers/project'

export default {
    namespace: 'project',
    state: null,
    effects: {
        *fetch({ payload: projectId }, { call, put }) {
            yield delay(1400);
            yield put({
                type: 'saveProject',
                payload: sampleProject
            })
        }
    },
    reducers: {
        saveProject(state, { payload: project }) {
            return {
                ...project
            };
        }
    }
}