# Cappucina-Baileys

Modifikasi library **Baileys / WhatsApp Web API** yang dipakai sebagai basis koneksi bot WhatsApp. Repository ini ditujukan untuk dipakai sebagai **dependency GitHub** pada project bot milikmu, sehingga update library bisa dikelola dari repo sendiri dan tidak perlu lagi edit manual di `node_modules`.

## Tentang project ini

`Cappucina-Baileys` adalah fork/modifikasi dari ekosistem Baileys yang berisi penyesuaian pada beberapa fitur WhatsApp modern, helper tambahan, utilitas newsletter/saluran, dan beberapa method praktis untuk kebutuhan bot.

Cocok dipakai bila kamu ingin:
- memisahkan library koneksi dari source bot utama,
- mengelola update lewat repo GitHub sendiri,
- melakukan patch/fix tanpa takut perubahan hilang saat `npm install`,
- menjaga struktur project bot tetap rapi.

## Fitur utama

Beberapa hal yang sudah tersedia di repo ini:

- dukungan koneksi WhatsApp berbasis Baileys,
- pairing code,
- helper untuk message reaction, edit, revoke, dan deteksi tipe pesan,
- utilitas newsletter / saluran,
- helper label group,
- dukungan interactive message, event message, album message, poll result, dan status mention,
- utilitas auth state seperti `useMultiFileAuthState`,
- export modul penting seperti `makeWASocket`, `fetchLatestBaileysVersion`, `WAProto`, `Store`, `Utils`, dan lainnya.

## Requirement

Project ini saat ini mengecek **Node.js 20+** saat instalasi.

```bash
node -v
```

Kalau server masih di Node 18 atau lebih lama, upgrade dulu sebelum dipakai.

## Instalasi

### Opsi 1 — install langsung dari GitHub

```bash
npm install github:heydaristo/Cappucina-Baileys#main
```

### Opsi 2 — pasang sebagai dependency alias

Cara ini paling cocok kalau source bot kamu masih memakai:

```js
require("ourin")
```

Contoh di `package.json` bot:

```json
{
  "dependencies": {
    "ourin": "github:heydaristo/Cappucina-Baileys#main"
  }
}
```

Dengan cara itu, source bot tidak perlu diubah besar-besaran karena library tetap dipanggil sebagai `ourin`.

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

## Helper tambahan yang tersedia

Beberapa helper yang terlihat tersedia di library ini:

### Delay

```js
await sock.delay(3)
```

### Reaction

```js
await sock.react(m, "🔥")
await sock.unreact(m)
```

### Edit pesan

```js
await sock.edit(m, "Pesan baru")
```

### Hapus / revoke pesan

```js
await sock.del(m)
```

### Deteksi tipe pesan

```js
const type = sock.detect(m)
console.log(type)
```

### Label group

```js
await sock.setLabelGroup(jid, "Member Premium")
```

### Cek ID saluran / newsletter dari URL

```js
const info = await sock.cekIDSaluran(url)
console.log(info)
```

### Follow banyak newsletter sekaligus

```js
await sock.newsletterMultipleFollow(
  "120xxxxxxxx@newsletter 120yyyyyyyy@newsletter"
)
```

### Cek banned number

```js
const result = await sock.checkBanned(jid)
console.log(result)
```

## Contoh pengiriman pesan yang didukung

Library ini juga memuat dukungan untuk beberapa bentuk pengiriman pesan, seperti:

- `interactiveMessage`
- `eventMessage`
- `pollResultMessage`
- `albumMessage`
- `groupStatusMessage`
- `sendStatusMention(...)`

Implementasi detailnya bisa kamu sesuaikan di source bot berdasarkan kebutuhan command/plugin.

## Struktur penting repository

```text
lib/
  Defaults/
  Signal/
  Socket/
  Store/
  Types/
  Utils/
  WABinary/
  WAM/
  WAUSync/
WAProto/
engine-requirements.js
package.json
```

## Workflow yang disarankan

Agar rapi dan aman, gunakan alur seperti ini:

1. Update library di repo `Cappucina-Baileys`.
2. Commit dan push perubahan ke GitHub.
3. Di repo bot utama, jalankan install ulang dependency.
4. Restart bot.

Contoh:

```bash
npm install
npm update ourin
```

Atau hapus lalu install ulang dependency GitHub bila perlu.

## Catatan penting

- Jangan jadikan edit manual di `node_modules` sebagai solusi permanen.
- Jangan ikut push folder `node_modules` ke GitHub.
- Sebaiknya kunci ke branch atau tag tertentu agar update tidak merusak bot secara tiba-tiba.
- Lakukan testing pada pairing, send message, newsletter, dan event message setelah setiap update.

## Lisensi

Project ini memakai lisensi **MIT** sesuai file `LICENSE` yang ada di repository.

## Kredit

Repository ini merupakan modifikasi dari ekosistem **Baileys** dan turunannya, lalu disesuaikan kembali untuk kebutuhan bot dan workflow pribadi.
