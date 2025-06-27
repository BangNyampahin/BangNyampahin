import { getMetadataFromNFT } from './utils.js';
import { renderNFTLayout } from './nftRenderer.js';

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
