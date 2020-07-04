export default {
    id: '1234',
    title: 'Hello world',
    description: 'The KMP algorithm searches for a length-m substring in a length-n string in worst-case O(n+m) time, compared to a worst-case of O(n⋅m) for the naive algorithm, so using KMP may be reasonable if you care about worst-case time complexity',
    createdAt: Date.now(),
    tasks: {
        todo: [{
            id: "task_2",
            title: "Hello world",
            description: "This is description. How are you?",
            assignee: "122"         //Id user
        }],
        inprogress: [],
        testing: [],
        done: []
    }
};