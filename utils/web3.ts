import * as ganache from "ganache-cli";
var Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx');
import * as config from '../config'

export var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545/'));

export const getAccounts = async () => {
  return await web3.eth.getAccounts();
}

export interface IRawTx {
  senderPublicKey: string;
  senderPrivateKey: string;
  contractAddress: string;
  data: any;
  value: any;
}

export const rawTransaction = async (rawTxArguments: IRawTx, cb: Function) => {
  let key = new Buffer(rawTxArguments.senderPrivateKey, 'hex');
  let nonce = await web3.eth.getTransactionCount(rawTxArguments.senderPublicKey);
  let gasPrice = config.GAS;
  
  let rawTx = {
    nonce: nonce,
    gas: config.GAS_PRICE,
    data: rawTxArguments.data || null,
    to: rawTxArguments.contractAddress,
    value: web3.utils.toHex(rawTxArguments.value)
  };
  let tx = new EthereumTx(rawTx);
  tx.sign(key);
  let stx = '0x' + tx.serialize().toString('hex');
  web3.eth.sendSignedTransaction(stx, (err: any, result: any) => {
    if (err) {
      cb && cb(err, null)
    } else {
      cb && cb(null, result);
    }
  });
}