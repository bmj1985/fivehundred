const electron = require('electron');
const url = require('url');
const path = require('path');
const {app, BrowserWindow, Menu, ipcMain} = electron;

// env switch
//process.env.NODE_ENV = 'production';

let mainWindow;

//Listen for app to be ready
app.on('ready', function(){

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

    mainWindow = new BrowserWindow({
        width: 1000,
        height: 780
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.on('closed',function(){
        app.quit();
    })
});

//menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Game',
                accelerator: 'CmdOrCtrl + N',
                click(){
                    mainWindow.loadURL(url.format({
                        pathname: path.join(__dirname, 'mainWindow.html'),
                        protocol: 'file:',
                        slashes: true
                    }));
                }
            },
            {
                role: 'quit'
            }
        ]
    }
];

if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({
        label: app.getName(),
        submenu: [
            {
                role: 'about'
            }
        ]
    });
}


if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Dev Tool',
        submenu: [
            {
                label: 'Toggle Dev Tool',
                accelerator: 'CmdOrCtrl + I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();

                }
            },
            {
                role: 'reload'
            }
        ]
    })
}
