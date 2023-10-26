
// const { ethers } = require("ethers");

const { expect } = require("chai");

describe("Financial Contract", function () {
  let LoanSystem;
  let SepoliaToken;
  let loanSystem;
  let sepoliaToken;
  let owner;
  let user1;

  beforeEach(async function () {
    [owner, user1] = await ethers.getSigners();

    SepoliaToken = await ethers.getContractFactory("contracts/SepoliaToken.sol:SepoliaToken");
    sepoliaToken = await SepoliaToken.deploy(ethers.utils.parseEther("10000")); // Deploy with initial supply
    await sepoliaToken.deployed();

    LoanSystem = await ethers.getContractFactory("LoanSystem");
    loanSystem = await LoanSystem.deploy(sepoliaToken.address);
    await loanSystem.deployed();
  });

  it("should approve loan application with debt value <= 100 and requested amount <= 10 ETH", async function () {
    await sepoliaToken.connect(user1).approve(loanSystem.address, ethers.utils.parseEther("100"));
    await loanSystem.connect(user1).applyForLoan("Alice", ethers.utils.parseEther("5"), 50);
    await loanSystem.connect(owner).processLoanApplication(1);
    const applicant = await loanSystem.applicants(1);
    expect(applicant.isApproved).to.equal(true);
  });

  it("should reject loan application with debt value > 100", async function () {
    await sepoliaToken.connect(user1).approve(loanSystem.address, ethers.utils.parseEther("100"));
    await loanSystem.connect(user1).applyForLoan("Bob", ethers.utils.parseEther("5"), 150);
    await loanSystem.connect(owner).processLoanApplication(1);
    const applicant = await loanSystem.applicants(1);
    expect(applicant.isApproved).to.equal(false);
  });
});
