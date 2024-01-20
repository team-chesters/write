var CallBackAsyncQueue = [];

class AtronHelper {

    isShown = false;

    constructor() {
        
    }

    static flushQueue() {
        CallBackAsyncQueue = [];
    }

    static procQueue(resp) {
        let etime = resp.payload?.etime ?? 0;
        let q_idx = CallBackAsyncQueue.findIndex(el => etime == el.etime && el.name == resp.name);
        if (q_idx >= 0) {
            CallBackAsyncQueue[q_idx].callback({
                name: resp.payload?.name ?? "",
                payload: resp.payload?.return ?? null,
                etime: etime,
            });
            CallBackAsyncQueue.splice(q_idx,1);
            return true;
        }

        return false;
    }

    static RegisterName(name) {
        if (!this.isElectron()) {
            return;
        }

        astilectron.invoke("registerWinName", {
            win_name: name
        });
    }

    static SendToOther(name, payload, ...wins) {
        if (!this.isElectron()) {
            return;
        }

        if (wins.length == 0) {
            astilectron.invoke("sendToOtherAllWins", {
                name: name,
                payload: payload
            });
        }

        for (let win of wins) {
            astilectron.invoke("sendToOtherWins", {
                name: name,
                payload: payload,
                win: win
            });
        }
    }

    static QueryToGo(name, payload, callback = null) {
        if (!this.isElectron()) {
            if (typeof callback == 'function') {
                if (typeof MockUpData != 'undefined' && hasKey(MockUpData, name)) {
                    console.log(name,payload);
                    setTimeout(() => {
                        callback({
                            name: name + ".callback",
                            payload: _.cloneDeep(MockUpData[name].resp),
                            etime: new Date().getUnix()
                        });
                    },100);
                } else {
                    callback({
                        name: '',
                        payload: null,
                    });
                }
            }

            return;
        }

        let etime = new Date().getTime();

        let wrap_payload = {
            etime: etime,
            payload: payload,
        };

        this.SendToGo(name, wrap_payload);

        if (typeof callback == 'function') {
            CallBackAsyncQueue.push({
                name: name + ".CallBackAsync",
                callback: callback,
                etime: etime,
            });

            let now_ms = new Date().getTime();
            CallBackAsyncQueue = CallBackAsyncQueue.filter(el => (now_ms - el.etime) < 10000);
        }
    }

    static isElectron() {
        // Renderer process
        if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
            return true;
        }

        // Main process
        if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
            return true;
        }

        // Detect the user agent when the `nodeIntegration` option is set to true
        if (
            typeof navigator === 'object' &&
            typeof navigator.userAgent === 'string' &&
            navigator.userAgent.indexOf('Electron') >= 0
        ) {
            return true;
        }

        return false;
    }

    static SendToGo(name, payload) {
        if (!this.isElectron())
            return;

        let msg = {
            name: name,
            payload: payload,
        };

        setTimeout(() => {
            astilectron.sendMessage(msg);
        },50);
    }

    static parseMsgFromGo (msg) {
        var obj = null;
        try {
            obj = JSON.parse(msg);
        } catch (e) {
            console.log(e);
            obj = msg;
        }
    
        if (Object.prototype.hasOwnProperty.call(obj,'name') && Object.prototype.hasOwnProperty.call(obj,'payload')) {
            this.procQueue({
                name: obj.name,
                payload: obj.payload,
            });

            return {
                name: obj.name,
                payload: obj.payload,
            };
        } else if (Object.prototype.hasOwnProperty.call(obj,'payload')) {
            return {
                name: 'unknown',
                payload: obj.payload,
            };
        } else {
            return {
                name: 'unknown',
                payload: msg,
            };
        }
    }

    static UpdateWinBound(bound, on_top = true) {
        if (this.isElectron()) {
            if (bound == null || bound == undefined)
                return;
                
            if (
                Object.prototype.hasOwnProperty.call(bound,'x') &&
                Object.prototype.hasOwnProperty.call(bound,'y') &&
                Object.prototype.hasOwnProperty.call(bound,'width') &&
                Object.prototype.hasOwnProperty.call(bound,'height')
            ) {
                astilectron.invoke("showToBounds", bound, () => {
                    if (on_top) {
                        astilectron.invoke("focusOnTop", null, () => {
                            this.isShown = true;
                        });
                    }
                });

            } else {
                //console.log("wrong type of bound = ", bound);
            }
        }
    }

    static FocusWindow(on_top = true) {
        if (this.isElectron()) {
            astilectron.invoke("show", null, () => {
                if (on_top) {
                    astilectron.invoke("focusOnTop", null, () => {
                        this.isShown = true;
                    });
                }
            });
        }
    }
    
    static Reload() {
        if (this.isElectron()) {
            astilectron.invoke("reload", null);
        } else {
            location.reload();
        }
    }

    static CenterWindow() {
        if (this.isElectron()) {
            astilectron.invoke("center", null);
        }
    }

    static SetAlwaysOnTop(flag, level = '') {
        if (this.isElectron()) {
            astilectron.invoke("setAlwaysOnTop", {flag: flag, level: level});
        }
    }

    static GetCurrentPosition() {
        return new Promise((resolve) => {
            if (this.isElectron()) {
                astilectron.invoke("getPosition", null, (resp) => {
                    resolve({ x: resp.payload[0], y: resp.payload[1] });
                });
            } else {
                resolve({ x: 0, y: 0 });
            }
        });
    }

    static HideWindow() {
        if (this.isElectron()) {
            astilectron.invoke("hide", null, () => {
                this.isShown = false;
            });
        } else {
            this.isShown = false;
        }
    }

    static IsShown() {
        return this.isShown;
    }

    static ShowWindow() {
        if (this.isElectron()) {
            astilectron.invoke("show", null, () => {
                this.isShown = true;
            });
        } else {
            this.isShown = true;
        }
    }

    static MaximizeWindow() {
        if (this.isElectron()) {
            astilectron.invoke("maximize");
        }
    }

    static UnmaximizeWindow() {
        if (this.isElectron()) {
            astilectron.invoke("unmaximize");
        }
    }

    static IsMaximizedWindow() {
        return new Promise((resolve) => {
            if (this.isElectron()) {
                astilectron.invoke("isMaximized", null, (resp) => {
                    resolve(resp.payload);
                });
            } else {
                resolve(false);
            }
        });
    }
    
    static GetSize() {
        return new Promise((resolve) => {
            if (this.isElectron()) {
                astilectron.invoke("getSize", null, (resp) => {
                    resolve(resp.payload);
                });
            } else {
                resolve([0,0]);
            }
        });
    }

    static GetPosition() {
        return new Promise((resolve) => {
            if (this.isElectron()) {
                astilectron.invoke("getPosition", null, (resp) => {
                    resolve(resp.payload);
                });
            } else {
                resolve([0,0]);
            }
        });
    }

    static SetPosition(x,y) {
        if (this.isElectron()) {
            astilectron.invoke("setPosition", {x:x, y:y});
        }
    }

    static SetContentSize(width, height) {
        if (this.isElectron()) {
            astilectron.invoke("setContentSize", {width:width, height:height});
        }
    }

    static GetDisplaySize() {
        return new Promise((resolve) => {
            if (this.isElectron()) {
                astilectron.invoke("getWorkAreaSize", null, (resp) => {
                    resolve({
                        width: resp.payload.width,
                        height: resp.payload.height
                    });
                });
            } else {
                resolve({
                    width: 0,
                    height: 0
                });
            }
        });
    }

    static GetWindowSize() {
        return new Promise((resolve) => {
            if (this.isElectron()) {
                astilectron.invoke("getWindowSize", null, (resp) => {
                    resolve({
                        width: resp.payload.width,
                        height: resp.payload.height
                    });
                });
            } else {
                resolve({
                    width: 0,
                    height: 0
                });
            }
        }); 
    }

    static ClearCache() {
        if (this.isElectron()) {
            astilectron.invoke("clearCache");
        }
    }

    static ClearStorageData() {
        if (this.isElectron()) {
            astilectron.invoke("clearStorageData");
        }
    }

    static CookieSet(option) {
        return new Promise((resolve) => {
            if (this.isElectron()) {
                astilectron.invoke("cookieSet", option, () => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    static CookieFlushStore() {
        return new Promise((resolve) => {
            if (this.isElectron()) {
                astilectron.invoke("cookieFlushStore", null, () => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    static OpenExternal(url) {
        if (this.isElectron()) {
            require('electron').shell.openExternal(url);
        }
    }

    static GetMediaSourceId() {
        return new Promise((resolve) => {
            if (this.isElectron()) {
                astilectron.invoke("getMediaSourceId", null, (resp) => {
                    resolve(resp.payload);
                });
            } else {
                resolve("");
            }
        });
    }

    static GetBrowserViews() {
        return new Promise((resolve) => {
            if (this.isElectron()) {
                astilectron.invoke("getBrowserViews", null, (resp) => {
                    resolve(resp);
                });
            } else {
                resolve();
            }
        });
    }

    static AddBrowserView(config, win_name = "__default") {
        return new Promise((resolve) => {
            if (this.isElectron()) {
                astilectron.invoke("addBrowserView", {
                    win: win_name,
                    config: config
                }, (resp) => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    static RemoveBrowserView(win_name = "__default") {
        return new Promise((resolve) => {
            if (this.isElectron()) {
                astilectron.invoke("removeBrowserView", win_name, (resp) => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    static RemoveAllBrowserView() {
        return new Promise((resolve) => {
            if (this.isElectron()) {
                astilectron.invoke("removeAllBrowserView", null, (resp) => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    static SetBoundsInBrowserView(bound, win_name = "__default") {
        return new Promise((resolve) => {
            if (this.isElectron()) {
                astilectron.invoke("setBoundsInBrowserView", {
                    win: win_name,
                    bound: bound
                }, (resp) => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    static LoadURLInBrowserView(url, win_name = "__default") {
        return new Promise((resolve) => {
            if (this.isElectron()) {
                astilectron.invoke("loadURLInBrowserView", {
                    win: win_name,
                    url: url
                }, (resp) => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    static ReloadInBrowserView(win_name = "__default") {
        return new Promise((resolve) => {
            if (this.isElectron()) {
                astilectron.invoke("reloadInBrowserView", win_name, (resp) => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    static RunJsInBrowserView(code, win_name = "__default") {
        return new Promise((resolve) => {
            if (this.isElectron()) {
                astilectron.invoke("executeJavaScriptInBrowserView", {
                    win: win_name,
                    code: code
                }, (resp) => {
                    resolve(resp.payload);
                });
            } else {
                resolve(null);
            }
        });
    }

    static GetURLInBroswerView(win_name = "__default") {
        return new Promise((resolve) => {
            if (this.isElectron()) {
                astilectron.invoke("getURLInBroswerView", win_name, (resp) => {
                    resolve(resp.payload);
                });
            } else {
                resolve("");
            }
        });
    }
    
    static BackInBroswerView(win_name = "__default") {
        return new Promise((resolve) => {
            if (this.isElectron()) {
                astilectron.invoke("backInBroswerView", {
                    win: win_name
                 }, (resp) => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }


    static ForwardInBroswerView(win_name = "__default") {
        return new Promise((resolve) => {
            if (this.isElectron()) {
                astilectron.invoke("forwardInBroswerView", {
                    win: win_name
                }, (resp) => {
                    resolve(resp.payload);
                });
            } else {
                resolve();
            }
        });
    }

    static OnBrowserView(event_name, callback, win_name = "__default") {
        if (this.isElectron()) {
            switch(event_name) {
                case "did-finish-load": {
                    astilectron.onBrowserView("did-finish-load", callback, win_name);
                    astilectron.invoke("onBroswerView", {
                        win: win_name, 
                        event: "did-finish-load",
                    });
                    break;
                }
                case "will-navigate": {
                    astilectron.onBrowserView("will-navigate", callback, win_name);
                    astilectron.invoke("onBroswerView", {
                        win: win_name, 
                        event: "will-navigate"
                    });
                    break;
                }
                case "did-navigate": {
                    astilectron.onBrowserView("did-navigate", callback, win_name);
                    astilectron.invoke("onBroswerView", {
                        win: win_name, 
                        event: "did-navigate"
                    });
                    break;
                }
                case "will-navigate-pdf": {
                    astilectron.onBrowserView("will-navigate-pdf", callback, win_name);
                    astilectron.invoke("onBroswerView", {
                        win: win_name, 
                        event: "will-navigate-pdf"
                    });
                    break;
                }
            }
        }
    }

    static SetAllowNavigatePdfList(list = []) {
        return new Promise((resolve) => {
            if (this.isElectron()) {
                astilectron.invoke("allowNavigatePdfList", list, (resp) => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    static On(event_name, callback) {
        if (this.isElectron()) {
            switch(event_name) {
                case "open": {
                    astilectron.on("open", callback);
                    astilectron.invoke("on", "open"); // register ipc main event
                    break;
                }
            }
        }
    }
}
