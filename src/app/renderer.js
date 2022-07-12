const information = document.getElementById('info')
// information.innerText = `Dadadada Electron (v${app.electron()})`

const func = async () => {
    const response = await window.app.ping()
    information.innerText = response;
}

func()