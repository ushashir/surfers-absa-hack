// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CustomerInfo {
    struct CustomerData {
        uint256 id;
        string name;
        uint256 debtValue;
    }

    // Mapping to store customer data
    mapping(uint256 => CustomerData) public customers;

    uint256 public nextCustomerId;

    constructor() {
        nextCustomerId = 1;
    }

    // Function to add a new customer
    function addCustomer(string memory _name, uint256 _debtValue) public {
        customers[nextCustomerId] = CustomerData(
            nextCustomerId,
            _name,
            _debtValue
        );
        nextCustomerId++;
    }
}
