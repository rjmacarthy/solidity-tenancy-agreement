pragma solidity ^0.4.21;

import './Base.sol';

contract Ownable is Base {
  address public owner;

  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

  constructor() public {
    owner = msg.sender;
  }

  modifier isOwner() {
    require(msg.sender == owner);
    _;
  }

  modifier isTenant(uint _id) {
      Agreement storage agreement = agreements[_id];
      require(msg.sender == agreement.tenant);
      _;
  }

  modifier isTenantOrOwner(uint _id) {
      Agreement storage agreement = agreements[_id];
      require(msg.sender == agreement.tenant || msg.sender == owner);
      _;
  }

  modifier isLandlord(uint _id) {
      Agreement storage agreement = agreements[_id];
      require(msg.sender == agreement.landlord);
      _;
  }

  modifier isLandlordOrOwner(uint _id) {
      Agreement storage agreement = agreements[_id];
      require(msg.sender == agreement.landlord || msg.sender == owner);
      _;
  }

  modifier isLandlordOrTenant(uint _id) {
      Agreement storage agreement = agreements[_id];
      require(msg.sender == agreement.landlord || msg.sender == agreement.tenant);
      _;
  }

  modifier isLandlordOrTenantOrOwner(uint _id) {
      Agreement storage agreement = agreements[_id];
      require(msg.sender == agreement.landlord || msg.sender == agreement.tenant || msg.sender == owner);
      _;
  }

  function transferOwnership(address newOwner) public isOwner {
    require(newOwner != address(0));
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }

}
