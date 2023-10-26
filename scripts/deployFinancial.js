const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying Financial contract with the account:", deployer.address);

  const LoanSystem = await ethers.getContractFactory("Financial");
  const loanSystem = await LoanSystem.deploy();

  console.log("LoanSystem contract deployed to:", loanSystem.address);
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
