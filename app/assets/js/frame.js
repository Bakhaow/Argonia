const $ = require('jquery');
const { ipcRenderer } = require('electron');
const version = document.getElementById('version');
const base = document.getElementById('base');

ipcRenderer.send('app_version');
ipcRenderer.on('app_version', (event, arg) => {
  ipcRenderer.removeAllListeners('app_version');
  version.innerText = arg.version;
});

ipcRenderer.on('update_available', () => {
  ipcRenderer.removeAllListeners('update_available');
  message.innerText = 'Une mise à jour est disponible ... Téléchargement en cours';
  notification.classList.remove('hidden');
});
ipcRenderer.on('update_downloaded', () => {
  ipcRenderer.removeAllListeners('update_downloaded');
  message.innerText = 'Mise à jour téléchargée ... ';
  restartButton.classList.remove('hidden');
  notification.classList.remove('hidden');
});

function closeNotification() {
  closeLauncher();
}
function restartApp() {
  ipcRenderer.send('restart_app');
}

$(function() {
    frameEvent();
})

function frameEvent() {
    $("#frame-button-close").click(function() {
        closeLauncher();
    });

    $("#frame-button-restoredown").click(function() {
        const window = remote.getCurrentWindow();
        if(window.isMaximized()) {
            window.unmaximize();
        }
        else {
            window.maximize();
        }
        document.activeElement.blur();
    });

    $("#frame-button-minimize").click(function() {
        const window = remote.getCurrentWindow();
        window.minimize();
        document.activeElement.blur();
    });
}

function closeLauncher() {
    const window = remote.getCurrentWindow();
    window.close();
}
