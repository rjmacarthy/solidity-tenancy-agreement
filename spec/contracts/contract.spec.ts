import { deploy } from '../../utils/deploy';
import { expect, assert } from "chai";
import { web3, getAccounts, rawTransaction } from '../../utils/web3';
import { IContract } from '../../interfaces/Contract';
import * as config from '../../config';
import { method } from 'bluebird';

describe('Crowdsale spec', () => {
    let accounts: Array<string>;
    let methods: IContract;
    let deployed;

    before(async () => {
        console.log('before');
        deployed = await deploy(config.CONTRACT_NAME);
        accounts = await getAccounts();
        methods = deployed.erc20.methods;
    });

    it('can get contract balance', async () => {
        var balance = await methods.getBalance().call();
        expect('0').to.equal(web3.utils.fromWei(balance));
    });

    it('can add an agreement', async () => {
        var today = new Date();
        var tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        var agreementId = await methods.newAgreement(accounts[1], accounts[2], "Some property address...", Math.floor((<any>today) / 1000), Math.floor((<any>today) / 1000), web3.utils.toWei("1", "ether")).send({ from: accounts[0], gas: config.TRANSACTION_GAS });
    });

    it('can get the current agreement id', async () => {
        var id = await methods.id().call();
    });

    it('can get an agreement by its id', async () => {
        var agreement = await methods.getAgreement(1).call();
        expect(agreement[0]).to.equal('1');
        expect(agreement[1]).to.equal(accounts[1]);
        expect(agreement[2]).to.equal(accounts[2]);
    });

    it('can pay ether into an agreement', async () => {
        await methods.payAgreement(1).send({ from: accounts[1], value: web3.utils.toWei("0.5", "ether") });
    });

    it('can pay up to the agreement amount', async () => {
        await methods.payAgreement(1).send({ from: accounts[1], value: web3.utils.toWei("0.5", "ether") });
    });

    xit('cant pay over the agreement amount', async () => {
        expect(methods.payAgreement(1).send({ from: accounts[1], value: web3.utils.toWei("2", "ether") })).to.throw;
    });

    it('can forward the funds to the landlord and close the agreement', async () => {
        var call = await methods.payLandlord(1).send({ from: accounts[1] });
        var agreement = await methods.getAgreement(1).call();
        expect(agreement[7]).to.equal('0');
    });

    it('has no balance when the agreement is completed', async () => {
        var balance = await methods.getBalance().call();
        expect('0').to.equal(web3.utils.fromWei(balance));
    });

    xit('cant pay into a completed agreement', async () => {
        expect(methods.payAgreement(1).send({ from: accounts[1], value: web3.utils.toWei("1", "ether") })).to.throw;
    })

});