
const Contract = artifacts.require('../contracts/Contract.sol');

module.exports = function (deployer, network, accounts) {
    return deployer
        .then(() => {
            return deployer.deploy(Contract);
        });
        
};