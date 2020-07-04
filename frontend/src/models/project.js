import { delay } from '@/helpers/utils';
import sampleProject from '@/assets/fakers/project';
import { uniqueId, map, filter, find } from 'lodash';

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
        },
        *createTask({ payload }, { call, put }) {
            const { title, description, assignee, callback } = payload;
            yield delay(1600);
            const sampleNewTask = {
                id: uniqueId('task_'),
                title,
                description,
                assignee
            };
            yield put({
                type: 'addNewTask',
                payload: sampleNewTask
            });
            if (callback) callback();
        },
        *toNextStage({ payload }, { call, put }) {
            const {
                taskId,
                from,
                to
            } = payload;
            yield delay(1200);           //taskId + to
            yield put({
                type: 'changeStageOfTask',
                payload
            });
        }
    },
    reducers: {
        saveProject(state, { payload: project }) {
            return {
                ...project
            };
        },
        addNewTask(state, { payload: task }) {
            if (!state) return state;
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    todo: [
                        task,
                        ...state.tasks.todo
                    ]
                }
            };
        },
        changeStageOfTask(state, { payload }) {
            const {
                taskId,
                from,
                to
            } = payload;
            let tasksData = { ...state.tasks };
            const task = find(tasksData[from], ['id', taskId]);
            if (!task) return state;
            const newFromTasks = filter(tasksData[from], task => task.id !== taskId);
            const newToTasks = [task, ...tasksData[to]];
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [from]: newFromTasks,
                    [to]: newToTasks
                }
            };
        }
    }
}