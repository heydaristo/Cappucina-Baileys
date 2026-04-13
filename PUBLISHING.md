# Publishing Cappucina

## 1. Siapkan repository GitHub

1. Buat repository baru, misalnya `cappucina`.
2. Upload seluruh isi folder ini ke root repository.
3. Pastikan folder `node_modules` tidak ikut ter-push.

## 2. Instal dari GitHub

Setelah repository sudah online, library bisa dipakai langsung dari project lain:

```bash
npm install github:USERNAME/cappucina
```

Atau bila ingin mengunci branch tertentu:

```bash
npm install github:USERNAME/cappucina#main
```

## 3. Opsional: publish ke npm

Sebelum publish ke npm, lengkapi field berikut di `package.json`:

- `repository`
- `homepage`
- `bugs`
- `author` jika ingin memakai nama pribadi atau organisasi

Lalu login dan publish:

```bash
npm login
npm publish --access public
```

## 4. Verifikasi sebelum rilis

```bash
npm install
npm test
npm run pack:check
```

## 5. Contoh penggunaan

```js
const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} = require("cappucina");
```
