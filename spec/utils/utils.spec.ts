import { expect, assert } from "chai";
import { deploy } from '../../utils/deploy'
import { getAccounts, web3 } from '../../utils/web3'
import { IBaseMethods } from '../../interfaces/base/IBaseMethods';
import * as config from '../../config';

describe('Utils spec', () => {
    let accounts: Array<string>;

    it('Can get a web3 instance', async function () {
        assert.isNotNull(web3);
    });

    it('Can get eth accounts', async function () {
        let accounts = await getAccounts();
        assert.isNotNull(accounts);
        assert.isArray(accounts);
    });

    xit('Can deploy a contract', async function () {
        let deployed = await deploy(config.CONTRACT_NAME);
        assert.isNotNull(deployed);
        assert.isNotNull(deployed.erc20.options.address);
        console.log(`ERC deployed at : ${deployed.erc20.options.address}`);
    });

});