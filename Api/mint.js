export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { ThirdwebSDK } = await import('@thirdweb-dev/sdk');
  const { ethers } = await import('ethers');

  const sdk = new ThirdwebSDK(
    new ethers.Wallet(process.env.PRIVATE_KEY, ethers.getDefaultProvider(process.env.RPC))
  );

  const contract = await sdk.getContract(process.env.SM_PoCA, "nft-collection");

  try {
    const tx = await contract.mintTo(req.body.wallet_address, {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image_url,
    });

    const nft = await tx.data();
    res.status(200).json({ success: true, nft });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
}
