
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying SepoliaToken contract with the account:", deployer.address);

  const initialSupply = 1000000; // Adjust the initial supply as needed

  const SepoliaToken = await ethers.getContractFactory("contracts/SepoliaToken.sol:SepoliaToken");
  const sepoliaToken = await SepoliaToken.deploy(initialSupply);

  console.log("SepoliaToken contract deployed to:", sepoliaToken.address);
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
