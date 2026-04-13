const major = parseInt(process.versions.node.split(".")[0], 10);

if (major < 20) {
  console.warn(
    `\n[WARN] Cappucina berjalan paling stabil di Node.js 20+.\n` +
    `       Node.js yang terdeteksi: ${process.versions.node}.\n` +
    `       Instalasi tetap dilanjutkan, tetapi upgrade ke Node.js 20+ sangat disarankan.\n`
  );
}
