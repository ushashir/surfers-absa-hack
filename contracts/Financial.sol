// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
            

interface SepoliaToken {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

// SMEs data or information available
contract LoanSystem {
    struct LoanApplicant {
        uint256 id;
        string name;
        uint256 requestedAmount;
        uint256 debtValue; // the debtValue will be used to test loan eligibility
        bool isApproved;
    }

    address public sepoliaTokenAddress;
    uint256 public nextUserId = 1;
    mapping(uint256 => LoanApplicant) public applicants;

    constructor(address _sepoliaTokenAddress) {
        sepoliaTokenAddress = _sepoliaTokenAddress;
    }

    // Loan Apllication process
    function applyForLoan(string memory _name, uint256 _requestedAmount, uint256 _debtValue) external {
        LoanApplicant storage applicant = applicants[nextUserId];
        applicant.id = nextUserId;
        applicant.name = _name;
        applicant.requestedAmount = _requestedAmount;
        applicant.debtValue = _debtValue;
        applicant.isApproved = false;
        nextUserId++;
    }

    // Loan processing process
    function processLoanApplication(uint256 _applicantId) external {
        LoanApplicant storage applicant = applicants[_applicantId];
        require(applicant.id != 0, "Invalid applicant ID");
        require(!applicant.isApproved, "Application already approved");

        if (applicant.requestedAmount <= 10 ether && applicant.debtValue <= 100) {
            // Transfer the approved loan amount in Sepolia ETH to the applicant
            require(SepoliaToken(sepoliaTokenAddress).transfer(msg.sender, applicant.requestedAmount), "Transfer failed");
            applicant.isApproved = true;
        }
    }
}
