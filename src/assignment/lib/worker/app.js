require('./app.css');
const { store$ } = require('./store');
const { loadWorkerAsync, addWorkerAsync } = require('./worker-client');

let formData = new FormData();

function showModal() {
    const modal = document.getElementById('myModal');
    const span = document.getElementsByClassName('close')[0];
    const btn = document.getElementById('add');

    btn.onclick = function () {
        modal.style.display = 'block';
    };

    span.onclick = function () {
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

function formHandle() {
    const form = document.querySelector('#form-add')
    const photo = document.getElementsByName("photo")[0]

    photo.onchange = chooseFile
    form.onsubmit = submit
}

function chooseFile(event) {
    let file = event.target.files[0]
    formData.append('photo', file)
}

function submit(event) {
    event.preventDefault()
    const modal = document.getElementById('myModal');
    const name = document.getElementsByName("name")[0]
    const alamat = document.getElementsByName("alamat")[0]
    const email = document.getElementsByName("email")[0]
    const telepon = document.getElementsByName("telp")[0]
    const biografi = document.getElementsByName("bio")[0]
    const photo = document.getElementsByName("photo")[0]

    formData.append('name', name.value)
    formData.append('alamat', alamat.value)
    formData.append('email', email.value)
    formData.append('telepon', telepon.value)
    formData.append('biografi', biografi.value)

    store$.dispatch(addWorkerAsync(formData));
    name.value = ''
    alamat.value = ''
    email.value = ''
    telepon.value = ''
    biografi.value = ''
    photo.value = null

    modal.style.display = 'none';
}

function render(state) {
    const table = document.querySelector('#table');

    for (let i = 0; i < state.length; i++) {
        const row = document.createElement('tr');

        const name = document.createElement('td');
        name.innerText = state[i].name;

        const alamat = document.createElement('td');
        alamat.innerText = state[i].alamat;

        const email = document.createElement('td');
        email.innerText = state[i].email;

        const telepon = document.createElement('td');
        telepon.innerText = state[i].telepon;

        const act = document.createElement('td');
        act.className = 'act';

        const btnDtl = document.createElement('button');
        const btnDel = document.createElement('button');

        btnDtl.innerText = 'Detail';
        btnDtl.id = `detail-${state[i].id}`;
        btnDtl.className = 'btnDtl';

        btnDel.innerText = 'Hapus';
        btnDel.id = `del-${state[i].id}`;
        btnDel.className = 'btnDel';

        act.append(btnDtl);
        act.append(btnDel);

        row.append(name);
        row.append(alamat);
        row.append(email);
        row.append(telepon);
        row.append(act);
        table.append(row);
    }
}

function main() {
    showModal();
    formHandle()
    store$.subscribe(() => {
        const state = store$.getState();
        render(state);
    });

    const state = store$.getState();
    render(state);
    store$.dispatch(loadWorkerAsync);
}

main()
