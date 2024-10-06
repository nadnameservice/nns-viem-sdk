export declare const nnsContractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
export declare const avatarKey = "avatar";
export declare const nnsAbi: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "node";
        readonly type: "bytes32";
    }];
    readonly name: "getResolvedAddress";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "addr";
        readonly type: "address";
    }];
    readonly name: "getPrimaryNameForAddress";
    readonly outputs: readonly [{
        readonly internalType: "string";
        readonly name: "";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "node";
        readonly type: "bytes32";
    }, {
        readonly internalType: "string";
        readonly name: "key";
        readonly type: "string";
    }];
    readonly name: "getNameAttribute";
    readonly outputs: readonly [{
        readonly internalType: "string";
        readonly name: "";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "node";
        readonly type: "bytes32";
    }, {
        readonly internalType: "string[]";
        readonly name: "keys";
        readonly type: "string[]";
    }];
    readonly name: "getNameAttributes";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "string";
            readonly name: "key";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "value";
            readonly type: "string";
        }];
        readonly internalType: "struct IAttributeStorage.Attribute[]";
        readonly name: "";
        readonly type: "tuple[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "addr";
        readonly type: "address";
    }];
    readonly name: "getNamesOfAddress";
    readonly outputs: readonly [{
        readonly internalType: "string[]";
        readonly name: "";
        readonly type: "string[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "node";
        readonly type: "bytes32";
    }, {
        readonly internalType: "string";
        readonly name: "key";
        readonly type: "string";
    }, {
        readonly internalType: "string";
        readonly name: "value";
        readonly type: "string";
    }];
    readonly name: "setNameAttribute";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "node";
        readonly type: "bytes32";
    }, {
        readonly components: readonly [{
            readonly internalType: "string";
            readonly name: "key";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "value";
            readonly type: "string";
        }];
        readonly internalType: "struct IAttributeStorage.Attribute[]";
        readonly name: "attributes";
        readonly type: "tuple[]";
    }];
    readonly name: "setNameAttributes";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}];
