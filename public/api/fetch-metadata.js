export async function fetchMetadata(cid) {
  const url = `https://ipfs.io/ipfs/${cid}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Gagal fetch metadata!");
  return await res.json();
}
