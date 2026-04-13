# Cappucina

`cappucina` adalah library WhatsApp Web API berbasis Baileys yang disiapkan untuk dipakai sebagai dependency bot Node.js.

Repository ini cocok kalau kamu ingin:

- memakai socket WhatsApp style Baileys
- mengganti dependency custom lama seperti `ourin`
- membagikan library langsung dari GitHub
- memasang library lewat `package.json`

## Fitur

- kompatibel dengan `require("cappucina")`
- bisa dipasang langsung dari repository GitHub
- bisa dipakai dari folder lokal
- cocok untuk bot WhatsApp berbasis CommonJS
- siap dipakai sebagai library dependency project lain

## Requirements

- Node.js 18 minimum
- Node.js 20+ direkomendasikan

## Install

### 1. Install langsung dari GitHub

```bash
npm install github:heydaristo/Cappucina-Baileys
```

### 2. Install dari branch tertentu

```bash
npm install github:heydaristo/Cappucina-Baileys#main
```

### 3. Install dari tag release

Contoh kalau nanti kamu membuat release `v1.0.0`:

```bash
npm install github:heydaristo/Cappucina-Baileys#v1.0.0
```

### 4. Install dari `package.json`

Tambahkan dependency ini ke `package.json` project user:

```json
{
  "dependencies": {
    "cappucina": "github:heydaristo/Cappucina-Baileys"
  }
}
```

Lalu jalankan:

```bash
npm install
```

### 5. Install dari folder lokal

Kalau library ada di folder lokal:

```bash
npm install file:./cappucina
```

Atau di `package.json`:

```json
{
  "dependencies": {
    "cappucina": "file:./cappucina"
  }
}
```

## Cara import

```js
const {
  default: makeWASocket,
  useMultiFileAuthState,
  makeCacheableSignalKeyStore,
  fetchLatestBaileysVersion
} = require("cappucina");
```

## Contoh penggunaan sederhana

```js
const {
  default: makeWASocket,
  useMultiFileAuthState,
  makeCacheableSignalKeyStore,
  fetchLatestBaileysVersion
} = require("cappucina");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys)
    },
    printQRInTerminal: true
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    console.log("connection.update:", update);
  });

  sock.ev.on("messages.upsert", ({ messages }) => {
    console.log("Pesan masuk:", messages[0]);
  });
}

startBot();
```

## Contoh penggunaan di project bot

Contoh `package.json` bot:

```json
{
  "name": "my-whatsapp-bot",
  "version": "1.0.0",
  "main": "index.js",
  "type": "commonjs",
  "dependencies": {
    "cappucina": "github:heydaristo/Cappucina-Baileys",
    "pino": "^9.0.0"
  }
}
```

Contoh `index.js`:

```js
const {
  default: makeWASocket,
  useMultiFileAuthState,
  makeCacheableSignalKeyStore,
  fetchLatestBaileysVersion
} = require("cappucina");
const pino = require("pino");

async function connect() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: pino({ level: "silent" }),
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys)
    },
    printQRInTerminal: true
  });

  sock.ev.on("creds.update", saveCreds);
}

connect();
```

## Migrasi dari dependency lama

Kalau sebelumnya project memakai:

```js
const baileys = require("ourin");
```

Ganti menjadi:

```js
const baileys = require("cappucina");
```

Kalau sebelumnya di `package.json` memakai dependency lama, ganti ke:

```json
{
  "dependencies": {
    "cappucina": "github:heydaristo/Cappucina-Baileys"
  }
}
```

## Scripts package

Repository ini menyediakan script berikut:

- `npm test`
  Mengecek apakah package bisa di-load dengan benar.

- `npm run pack:check`
  Simulasi `npm pack --dry-run` untuk memastikan isi package aman sebelum dipublish.

## Struktur package

File penting di repo ini:

- `lib/`
  Output library utama yang dipakai runtime.

- `WAProto/`
  Proto/stubs yang dipakai library.

- `engine-requirements.js`
  Peringatan versi Node.js sebelum install.

- `package.json`
  Metadata package `cappucina`.

- `PUBLISHING.md`
  Panduan singkat untuk publish repository/package.

## Publish checklist

Sebelum dipakai publik atau dirilis:

1. Pastikan metadata package sudah sesuai.
2. Jalankan `npm install`.
3. Jalankan `npm test`.
4. Jalankan `npm run pack:check`.
5. Push ke GitHub.
6. Buat tag release seperti `v1.0.0` bila ingin dependency lebih stabil.

## Tentang fork

Repository ini menggunakan basis dari fork Baileys, dan repo GitHub saat ini tercatat sebagai fork dari:

- [Nted3xec/baileys](https://github.com/Nted3xec/baileys)

## Credits

Library ini tidak dibuat dari nol. `cappucina` dibangun di atas basis yang berasal dari project berikut:

- [LuckyArch/OurinGlitch-Baileys](https://github.com/LuckyArch/OurinGlitch-Baileys)
- [Nted3xec/baileys](https://github.com/Nted3xec/baileys)
- [WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys)

Terima kasih untuk para maintainer dan kontributor dari project-project tersebut yang menjadi dasar pengembangan library ini.

## Repository

- GitHub: [heydaristo/Cappucina-Baileys](https://github.com/heydaristo/Cappucina-Baileys)
- Issues: [Issues](https://github.com/heydaristo/Cappucina-Baileys/issues)

## License

MIT
