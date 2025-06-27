// interactive.js

// 1. Event listener untuk blok klik interaktif
export function attachInteractivity(canvas) {
  const blocks = canvas.querySelectorAll('.block');

  blocks.forEach((block, i) => {
    const type = block.dataset.type;

    if (type === 'scene-block') {
      block.onclick = () => {
        alert(`🧩 Scene ${i + 1} aktif!`);
        // Bisa juga load iframe ke animation_url scene
      };
    }

    if (type === 'logic-block') {
      block.onclick = () => {
        alert(`⚙️ Logika dari Block ${i + 1} dijalankan!`);
        // Tambah kode logic ke smart contract atau fungsi lokal
      };
    }

    if (type === 'child-NFT-block') {
      block.onclick = () => {
        alert(`👶 Ini NFT anak dari root ini!`);
        // Bisa fetch token metadata baru & tampilkan
      };
    }
  });
}
