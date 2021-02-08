const initialState = []

function loadWorker(state, action) {
    state = action.payload;
    return state;
}

function addWorker(state, action) {
    state.push(action.payload);
    return state;
}

module.exports = {
    initialState,
    loadWorker,
    addWorker
}