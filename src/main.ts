import {app, BrowserWindow} from 'electron';


let mainWindow;

function init() {
	let mw = mainWindow = new BrowserWindow();
	// mw.webContents.openDevTools();

	mainWindow.loadURL(`file://${__dirname}/../pages/index.html`);
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

app.on('ready', init);

app.on('window-all-closed', () => {
	if (process.platform != 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		init();
	}
});