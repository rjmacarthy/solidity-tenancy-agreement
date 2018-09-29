pragma solidity ^0.4.21;

import "./Base.sol";

contract Validatable is Base {

    modifier isStatus(uint _id, AgreementStatus status) {
        Agreement storage agreement = agreements[_id];
        require(status == agreement.status, "Not in correct status");
        _;
    }

    modifier canFinalise(uint _id) {
        Agreement storage agreement = agreements[_id];
        require(AgreementStatus.Complete != agreement.status, "Agreement completed");
        require(agreement.balance > 0, "Agreement has no balance");
        _;
    }

    function validateNewAgreement (Agreement agreement) internal pure {
        require(agreement.tenant != 0x0, "Invalid address");
        require(agreement.landlord != 0x0, "Invalid address");
        require(agreement.amount > 0, "Invalid amount");
        require(agreement.startTime > 0, "Invalid start time");
        require(agreement.endTime > 0, "Invalid end time");
    }

}