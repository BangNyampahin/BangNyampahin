export async function getMetadataFromNFT(contract, tokenId) {
  try {
    const url = `https://api.thirdweb.com/v1/nft/${contract}/${tokenId}/metadata`;
    const res = await fetch(url);
    const json = await res.json();

    if (json?.metadata_uri?.startsWith('ipfs://')) {
      const ipfsUrl = json.metadata_uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
      const data = await fetch(ipfsUrl).then(res => res.json());
      return data;
    }

    return json?.metadata || null;
  } catch (err) {
    console.error("Gagal fetch metadata:", err);
    return null;
  }
}
