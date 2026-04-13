# Cappucina

`cappucina` adalah library WhatsApp Web API berbasis Baileys yang sudah disiapkan untuk dipakai sebagai dependency bot Node.js.

Library ini cocok kalau kamu ingin:

- memakai socket WhatsApp style Baileys
- tetap kompatibel dengan pola `require("cappucina")`
- memasang package langsung dari repository GitHub

## Install

### Dari repository GitHub

```bash
npm install github:USERNAME/cappucina
```

### Dari folder lokal

```bash
npm install file:./cappucina
```

## Contoh penggunaan

```js
const {
  default: makeWASocket,
  useMultiFileAuthState,
  makeCacheableSignalKeyStore,
  fetchLatestBaileysVersion
} = require("cappucina");

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys)
    }
  });

  sock.ev.on("creds.update", saveCreds);
}

start();
```

## Node.js

- minimum: Node.js 18
- rekomendasi: Node.js 20+

## Publish checklist

1. Pastikan field `repository`, `homepage`, dan `bugs` di `package.json` sudah diisi sesuai repo GitHub kamu.
2. Jalankan `npm install`.
3. Jalankan `npm test`.
4. Jalankan `npm run pack:check`.
5. Publish atau push ke GitHub.

Panduan lebih ringkas ada di [PUBLISHING.md](./PUBLISHING.md).
