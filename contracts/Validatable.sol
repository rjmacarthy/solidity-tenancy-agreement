pragma solidity ^0.4.21;

import './Base.sol';

contract Validatable is Base {

    modifier isStatus(uint _id, AgreementStatus status) {
        Agreement storage agreement = agreements[_id];
        require(status == agreement.status);
        _;
    }

    modifier canFinalise(uint _id) {
        Agreement storage agreement = agreements[_id];
        require(AgreementStatus.Complete != agreement.status);
        require(agreement.balance > 0);
        _;
    }

    function validateNewAgreement (Agreement agreement) internal pure {
        require(agreement.tenant != 0x0);
        require(agreement.landlord != 0x0);
        require(agreement.amount > 0);
        require(agreement.startTime > 0);
        require(agreement.endTime > 0);
    }

}