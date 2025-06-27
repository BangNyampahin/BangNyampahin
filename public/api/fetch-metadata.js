export async function fetchMetadata(cid) {
  const url = `https://ipfs.io/ipfs/${cid}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Gagal fetch metadata!");
  return await res.json();
}

import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const contract = searchParams.get("contract");
  const tokenId = searchParams.get("tokenId");

  const sdk = ThirdwebSDK.fromNetwork("base");
  const nftContract = await sdk.getContract(contract);
  const nft = await nftContract.erc721.get(tokenId);
  
  const metaRes = await fetch(nft.metadataUri);
  const metadata = await metaRes.json();
  return NextResponse.json(metadata);
}
