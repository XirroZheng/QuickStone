// src/services/wsClient.js

let ws = null
let listeners = []

export function connectWS(options) {
    const { url } = options

    // 已经连接就不再重复连
    if (ws && ws.readyState === WebSocket.OPEN) return ws

    ws = new WebSocket(url)

    ws.onopen = () => {
        console.log('[WS] connected')
    }

    ws.onmessage = (evt) => {
        try {
            const data = JSON.parse(evt.data)
            listeners.forEach((fn) => fn(data))
        } catch (e) {
            console.error('[WS] json parse error', e)
        }
    }

    ws.onclose = () => {
        console.log('[WS] closed')
        // 这里可以做重连逻辑
    }

    ws.onerror = (err) => {
        console.error('[WS] error', err)
    }

    return ws
}

// 订阅消息
export function onWSMessage(cb) {
    listeners.push(cb)
    // 返回一个取消订阅的方法
    return () => {
        listeners = listeners.filter((fn) => fn !== cb)
    }
}

// 发送消息
export function sendWS(data) {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data))
    }
}

// 手动关闭连接
export function closeWS() {
    if (ws) {
        ws.close()
        ws = null
    }
}
