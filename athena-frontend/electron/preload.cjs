const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronAPI",{
    startExam : (_name,urn)=>ipcRenderer.invoke('startExam',_name,urn),
    getTotalMCQ : ()=>ipcRenderer.invoke('get-mcq-number')
})