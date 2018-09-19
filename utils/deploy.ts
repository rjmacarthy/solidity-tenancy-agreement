import * as fs from 'fs';
import { readFileSync } from "fs";
import { join } from "path";
import { web3, getAccounts } from '../utils/web3';
import * as config from '../config'

export const deploy = async (contractName: string, path?: string) => {
  const dirPath = join(__dirname, path || "../build/contracts");
  const fileName = `${contractName}`;
  const abi = JSON.parse(readFileSync(join(dirPath, fileName + ".json"), "utf-8"));
  const code = abi.bytecode;
  const accounts = await getAccounts();
  const contract = new web3.eth.Contract(abi.abi, { from: accounts[0] });
  const erc20 = await contract.deploy({ data: code }).send({
    from: accounts[0],
    gas: config.GAS
  });
  return { erc20 };
}