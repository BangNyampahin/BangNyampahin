import { getMetadataFromNFT } from './utils.js';
import { renderNFTLayout } from './nftRenderer.js';
import { fetchMetadata, renderCanvas } from './nftRenderer.js';

window.onload = async () => {
  const params = new URLSearchParams(window.location.search);
  const tokenURI = params.get('uri') || 'ipfs://QmSjwUBj1x3CGM1c2NkunKNDprVx7EscQVovyr65DormaW/0';
  const cleanURI = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/');

  const data = await fetchMetadata(cleanURI);
  renderCanvas(data);
};
window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const contract = urlParams.get('contract');
  const tokenId = urlParams.get('tokenId');

  if (!contract || !tokenId) {
    document.body.innerHTML = "<h2>NFT tidak ditemukan 😢</h2>";
    return;
  }

  const metadata = await getMetadataFromNFT(contract, tokenId);
  if (!metadata) {
    document.body.innerHTML = "<h2>Metadata gagal dimuat 😭</h2>";
    return;
  }

  renderNFTLayout(metadata);
};
