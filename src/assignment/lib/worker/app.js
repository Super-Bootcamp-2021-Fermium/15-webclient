require('./app.css')
const { store$ } = require('./store');
const { loadWorkerAsync } = require('./worker-client');

store$.subscribe(() => {
    const state = store$.getState();
    render(state);
});

const state = store$.getState();
render(state);
console.log(state)
store$.dispatch(loadWorkerAsync);
  
function render(state) {
    
}