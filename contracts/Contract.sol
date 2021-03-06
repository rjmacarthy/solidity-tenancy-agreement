pragma solidity ^0.4.24;

import "./Base.sol";
import "./Ownable.sol";
import "./Validatable.sol";

contract Contract is Ownable, Validatable {
    
    constructor () public {}

    function getBalance () public isOwner view returns (uint256) {
        return address(this).balance;
    }

    function newAgreement (address _tenant, address _landlord, string _propertyAddress, uint256 _startTime, uint256 _endTime, uint256 _amount) 
    public returns (uint) {
        id = id + 1;
        Agreement memory agreement = Agreement(_tenant, _landlord, _propertyAddress, _startTime, _endTime, _amount, 0, AgreementStatus.Pending);
        validateNewAgreement(agreement);
        agreements[id] = agreement;
        return id;
    }

    function getAgreement (uint _id) public
    isLandlordOrTenantOrOwner(_id)  
    view returns (uint, address, address, string, uint256, uint256, uint256, uint256, AgreementStatus) {
        Agreement memory agreement = agreements[_id];
        return (
            id, 
            agreement.tenant, 
            agreement.landlord, 
            agreement.propertyAddress, 
            agreement.startTime,
            agreement.endTime,
            agreement.amount,
            agreement.balance,
            agreement.status
        );
    }

    function payAgreement (uint _id) public isTenantOrOwner(_id) isStatus(_id, AgreementStatus.Pending) payable returns (bool)  {
        require(msg.value > 0, "Can't pay zero");
        Agreement storage agreement = agreements[_id];
        require(msg.value + agreement.balance <= agreement.amount, "Can't over pay");
        agreement.balance = agreement.balance + msg.value;
        agreement.status = agreement.balance == agreement.amount ? AgreementStatus.Paid : AgreementStatus.Pending;
        return true;
    }

    function payLandlord (uint _id) public isTenantOrOwner(_id) canFinalise(_id) returns (bool) {
        Agreement storage agreement = agreements[_id];
        require(block.timestamp >= agreement.endTime, "Agreement ended");
        agreement.landlord.transfer(agreement.balance);
        agreement.status = AgreementStatus.Complete;
        agreement.balance = 0;
        return true;
    }

}