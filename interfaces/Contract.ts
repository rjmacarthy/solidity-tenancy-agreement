
    // Auto generated interface using utils/abi-parser.ts
    import { IBaseMethods } from './base/IBaseMethods';
    export interface IContract extends IBaseMethods { owner : () => IBaseMethods;id : () => IBaseMethods;transferOwnership : (newOwner) => void;OwnershipTransferred : (previousOwner,newOwner) => void;getBalance : () => IBaseMethods;newAgreement : (_tenant,_landlord,_propertyAddress,_startTime,_endTime,_amount) => IBaseMethods;getAgreement : (_id) => IBaseMethods;payAgreement : (_id) => IBaseMethods;payLandlord : (_id) => IBaseMethods;}