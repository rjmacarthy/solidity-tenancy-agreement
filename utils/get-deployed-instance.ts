import * as fs from 'fs';
import { readFileSync } from "fs";
import { join } from "path";
import { web3, getAccounts } from '../utils/web3';
import * as config from '../config'

export const getInstance = async (contractName: string, address: string, path?: string) => {
    const dirPath = join(__dirname, path || "../build/contracts");
    const fileName = `${contractName}`;
    const abi = JSON.parse(readFileSync(join(dirPath, fileName + ".json"), "utf-8"));
    var instance = new web3.eth.Contract(abi.abi, address);
    return instance;
}
