import { network } from "hardhat";
const { ethers } = await network.connect();

async function main() {
  const initialSupply = 1_000_000n * 10n ** 18n;

  const Token = await ethers.getContractFactory("GLDToken");

  const token = await Token.deploy(initialSupply);
  await token.waitForDeployment();

  const [deployer] = await ethers.getSigners();

  console.log("GLDToken deployed");
  console.log("Contract address:", await token.getAddress());
  console.log("Deployer:", deployer.address);
  console.log(
    "Deployer balance:",
    (await token.balanceOf(deployer.address)).toString()
  );
  console.log(
    "Total supply:",
    (await token.totalSupply()).toString()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
