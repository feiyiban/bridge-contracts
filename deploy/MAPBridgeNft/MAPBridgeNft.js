const BigNumber = require('bignumber.js')
BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_FLOOR })
module.exports = async function ({ ethers, deployments}) {
  const { deploy } = deployments
  const { deployer} = await ethers.getNamedSigners()

  console.log(
      "Deploying contracts with the account:",
      await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  await deploy('NFTBridge', {
    from: deployer.address,
    args: [],
    log: true,
    contract: 'NFTBridge',
  })
  let nftbridge = await ethers.getContract('NFTBridge');

  console.log("NFTBridge:", nftbridge.address);


  await deploy('FeeNFT', {
    from: deployer.address,
    args: [],
    log: true,
    contract: 'FeeNFT',
  })
  let feeNFT = await ethers.getContract('FeeNFT');

  console.log("FeeNFT:", feeNFT.address);

  await feeNFT.setToChainNFTFee(22776,"10000000000000000");
  console.log("setToChainNFTFee is ok : 22776")

  await feeNFT.setToChainNFTFee(3,"10000000000000000");
  console.log("setToChainNFTFee is ok : 3")

  await feeNFT.setToChainNFTFee(97,"10000000000000000");
  console.log("setToChainNFTFee is ok: 97")

  await nftbridge.setFeeNFT(feeNFT.address);
  console.log("setFeeNFT is ok")


}

module.exports.tags = ['BridgeNFT']
