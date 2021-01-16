/*eslint-env node */

import { contextBridge, ipcRenderer } from 'electron';

//Sample apis.
contextBridge.exposeInMainWorld('api', {
  alert: async (title: string, message: string) => {
    await ipcRenderer.invoke('alert', { title, message });
    return;
  },
});
