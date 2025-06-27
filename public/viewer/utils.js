export async function getMetadataFromNFT(contract, tokenId) {
  try {
    const url = `/api/fetch-metadata?contract=${contract}&tokenId=${tokenId}`;
    const res = await fetch(url);
    const json = await res.json();
    return json;
  } catch (e) {
    console.error("Gagal fetch metadata:", e);
    return null;
  }
}
