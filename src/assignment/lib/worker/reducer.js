const initialState = []

function loadWorker(state, action) {
    state = action.payload;
    return state;
}

function addWorker(state, action) {
    state.push(action.payload);
    return state;
}

function removeWorker(state, action) {
    const worker = state.find((w) => w.id === action.payload);
    const i = state.indexOf(worker);
    state.splice(i, 1);
    return state;
}

module.exports = {
    initialState,
    loadWorker,
    addWorker,
    removeWorker,
}