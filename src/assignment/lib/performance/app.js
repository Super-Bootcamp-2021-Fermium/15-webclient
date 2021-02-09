require('./app.css');
const { store$ } = require('./store');
const {
    getAllTasksAsync,
    getAllWorkerAsync,
    getDoneTaskAsync,
    getCancelledTaskAsync,
} = require('./performance-client');

// view
const infoSelesai=document.getElementById('selesai');
const infoBatal=document.getElementById('batal');
const infoBelumSelesai=document.getElementById('belum-selesai');
const infoJumlahPekerja=document.getElementById('jumlah-pekerja');

// presentation layer
store$.subscribe(() => {
    const state = store$.getState();
    render(state);
});
const state = store$.getState();
render(state);

store$.dispatch(getAllTasksAsync());
store$.dispatch(getAllWorkerAsync());
store$.dispatch(getDoneTaskAsync());
store$.dispatch(getCancelledTaskAsync());

function render(state) {
    const info = state[0];
    infoSelesai.innerText = info.done;
    console.log('state : ', state)
    infoBatal.innerText = info.cancelled;
    infoBelumSelesai.innerText = info.task;
    infoJumlahPekerja.innerText = info.worker;
}