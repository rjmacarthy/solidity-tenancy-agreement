
    // Auto generated interface using utils/abi-parser.ts
    import { IBaseMethods } from './base/IBaseMethods';
    export interface IOwnable extends IBaseMethods { owner : () => IBaseMethods;OwnershipTransferred : (previousOwner,newOwner) => void;transferOwnership : (newOwner) => void;}