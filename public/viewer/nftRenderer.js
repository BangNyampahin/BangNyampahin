async function fetchMetadata() {
  const params = new URLSearchParams(window.location.search);
  const contract = params.get('root') || '';
  const tokenId = params.get('tokenId') || '1';

  const tokenURI = `https://ipfs.io/ipfs/QmSjwUBj1x3CGM1c2NkunKNDprVx7EscQVovyr65DormaW/${tokenId}`;
  const res = await fetch(tokenURI);
  const data = await res.json();
  renderCanvas(data);
}

function renderCanvas(data) {
  const canvas = document.getElementById('canvas');
  const schema = data.canvas_schema;
  const layout = schema.layout || 'grid';

  canvas.style.gridTemplateColumns = `repeat(${schema.columns || 4}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${schema.rows || 4}, auto)`;

  document.getElementById('title').textContent = data.name;

  data.canvas_schema.block_types.forEach((type, i) => {
    const div = document.createElement('div');
    div.classList.add('block');

    if (type === "text-block") {
      div.classList.add("text-block");
      div.textContent = `📦 ${type} aktif (${i + 1})`;
    }

    if (type === "visual-block") {
      div.innerHTML = `<img src="${data.image}" style="width:100%; border-radius:16px;">`;
    }

    if (type === "scene-block" || type === "logic-block" || type === "child-NFT-block") {
      div.onclick = () => {
        alert(`Klik pada ${type} (${i + 1})`);
      };
    }

    if (type === "child-NFT-block" && data.logic_registry) {
      const rule = data.logic_registry.find(r => r.type === "childNFT-attachment");
      if (rule && rule.allowed_address.includes("*")) {
        div.textContent = `🪙 NFT Turunan (aktif)`;
      }
    }

    if (type === "scene-block" && data.animation_url) {
      div.innerHTML = `<iframe src="${data.animation_url}" height="300px"></iframe>`;
    }

    canvas.appendChild(div);
  });
}

fetchMetadata();
