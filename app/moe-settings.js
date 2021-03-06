/*
 *  This file is part of Moeditor.
 *
 *  Copyright (c) 2016 Menci <huanghaorui301@gmail.com>
 *
 *  Moeditor is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Moeditor is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Moeditor. If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

const {BrowserWindow, ipcMain} = require('electron');

var settingsWindow;

function showSettingsWindow() {
    var conf = {
        icon: Const.path + "/icons/Moeditor.ico",
        autoHideMenuBar: true,
        width: 600 * moeApp.config.get('scale-factor'),
        height: parseInt(315 * moeApp.config.get('scale-factor')),
        webPreferences: {
            zoomFactor: moeApp.config.get('scale-factor')
        },
        resizable: false,
        show: false
    };

    if (process.platform == 'darwin') conf.titleBarStyle = 'hidden';
    else conf.frame = false;

    settingsWindow = new BrowserWindow(conf);
    settingsWindow.loadURL('file://' + Const.path + '/views/settings/settings.html');
    if (moeApp.flag.debug | moeApp.config.get('debug')) settingsWindow.webContents.openDevTools();
    settingsWindow.webContents.on('dom-ready', function() {
        settingsWindow.show();
    });
    settingsWindow.webContents.on('close', function() {
        settingsWindow = undefined;
    })
}

ipcMain.on('show-settings-window', showSettingsWindow);

module.exports = showSettingsWindow;
