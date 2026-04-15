# Cappucina-Baileys

Library WhatsApp berbasis **Baileys** yang disiapkan untuk dipakai sebagai **dependency GitHub** pada project bot WhatsApp.

Tujuan utama repo ini adalah memisahkan layer koneksi WhatsApp dari source bot utama, sehingga update, patch, dan maintenance library bisa dilakukan dari repo sendiri tanpa harus mengedit `node_modules` secara manual setiap kali install ulang.

---

## Kenapa pakai repo ini?

- **Lebih rapi** — core koneksi dipisah dari bot utama.
- **Lebih aman untuk maintenance** — update library cukup dari repo ini.
- **Lebih mudah dikustom** — cocok untuk workflow bot pribadi maupun publik.
- **Tidak bergantung pada edit manual `node_modules`** — perubahan tidak hilang setelah `npm install`.
- **Cocok untuk migrasi bot lama** — terutama jika source bot masih memakai alias seperti `require("ourin")`.

---

## Fungsi utama

Repository ini dipakai sebagai fondasi koneksi untuk bot WhatsApp, dengan fokus pada:

- koneksi WhatsApp Web berbasis Baileys,
- pairing code,
- auth state multi-file,
- helper event dan message,
- utilitas untuk pengiriman dan manipulasi pesan,
- struktur library yang bisa dipanggil ulang dari berbagai project bot.

Repo ini cocok dipakai kalau Anda ingin menjadikan library WhatsApp sebagai komponen terpisah yang bisa dikelola, di-patch, dan di-update secara independen.

---

## Requirement

- **Node.js 20 atau lebih baru**
- npm / yarn / pnpm
- Server atau VPS yang siap menjalankan bot WhatsApp

Cek versi Node:

```bash
node -v
```

---

## Instalasi

### Opsi 1 — install langsung dari GitHub

```bash
npm install github:heydaristo/Cappucina-Baileys#main
```

### Opsi 2 — pasang sebagai alias dependency

Opsi ini cocok kalau source bot Anda masih memakai:

```js
require("ourin")
```

Contoh `package.json`:

```json
{
  "dependencies": {
    "ourin": "github:heydaristo/Cappucina-Baileys#main"
  }
}
```

Dengan model ini, source bot tidak perlu banyak dirombak karena library tetap dapat dipanggil dengan nama `ourin`.

---

## Contoh penggunaan dasar

```js
const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} = require("ourin")

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session")
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    auth: state,
    version,
    printQRInTerminal: false
  })

  sock.ev.on("creds.update", saveCreds)
}

startBot()
```

---

## Export yang umum dipakai

Beberapa export yang biasanya digunakan dari library ini:

```js
const {
  default: makeWASocket,
  makeInMemoryStore,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason,
  jidDecode,
  proto,
  WAProto,
  Utils,
  Store
} = require("ourin")
```

Ketersediaan export mengikuti isi library pada branch yang Anda pakai.

---

## Contoh helper yang sering dipakai

```js
await sock.sendMessage(jid, { text: "Halo" })
```

```js
await sock.readMessages([key])
```

```js
sock.ev.on("messages.upsert", async ({ messages }) => {
  console.log(messages)
})
```

```js
sock.ev.on("connection.update", (update) => {
  console.log(update)
})
```

---

## Struktur repository

```text
lib/
WAProto/
engine-requirements.js
package.json
LICENSE
README.md
```

Secara umum:

- `lib/` berisi core library,
- `WAProto/` berisi komponen proto/statis terkait WhatsApp,
- `engine-requirements.js` melakukan pengecekan environment Node,
- `package.json` mengatur entry point, dependency, dan script package.

---

## Workflow yang disarankan

Agar update lebih aman:

1. Lakukan perubahan library di repo ini.
2. Commit dan push ke GitHub.
3. Update dependency di repo bot utama.
4. Restart bot.
5. Tes pairing, login, kirim pesan, dan event utama.

Contoh update di bot utama:

```bash
npm install
npm update ourin
```

Kalau perlu, hapus lalu install ulang dependency GitHub agar perubahan benar-benar terambil.

---

## Cocok untuk siapa?

Repo ini cocok untuk:

- developer bot WhatsApp yang ingin struktur project lebih bersih,
- pengguna yang sering patch library sendiri,
- owner bot yang ingin update library dari repo GitHub pribadi,
- migrasi dari setup lama yang sebelumnya mengedit library langsung di `node_modules`.

---

## Catatan penting

- Jangan jadikan edit manual di `node_modules` sebagai solusi permanen.
- Jangan commit folder `node_modules` ke repository.
- Sebaiknya pin ke branch atau tag tertentu bila dipakai di production.
- Setiap update library sebaiknya diuji ulang sebelum dipakai penuh.

---

## Lisensi

Project ini menggunakan lisensi **MIT**.

Lihat file [`LICENSE`](./LICENSE) untuk detailnya.

---

## Kredit

Repository ini merupakan turunan dan modifikasi dari ekosistem **Baileys**, lalu disesuaikan untuk kebutuhan bot WhatsApp dan workflow pengembangan pribadi.
