pragma solidity ^0.4.21;

import './Base.sol';

contract Validatable is Base {

    modifier isOpen(uint _id) {
        Agreement storage agreement = agreements[_id];
        require(AgreementStatus.Pending == agreement.status);
        _;
    }

}