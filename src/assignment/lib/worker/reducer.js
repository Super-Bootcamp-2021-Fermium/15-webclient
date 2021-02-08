const initialState = []

function loadWorker(state, action) {
    state = action.payload;
    return state;
}

module.exports = {
    initialState,
    loadWorker
}