"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nnsAbi = exports.avatarKey = exports.nnsContractAddress = void 0;
exports.nnsContractAddress = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707';
exports.avatarKey = 'avatar';
exports.nnsAbi = [
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'node',
                type: 'bytes32',
            },
        ],
        name: 'getResolvedAddress',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'addr',
                type: 'address',
            },
        ],
        name: 'getPrimaryNameForAddress',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'node',
                type: 'bytes32',
            },
            {
                internalType: 'string',
                name: 'key',
                type: 'string',
            },
        ],
        name: 'getNameAttribute',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'node',
                type: 'bytes32',
            },
            {
                internalType: 'string[]',
                name: 'keys',
                type: 'string[]',
            },
        ],
        name: 'getNameAttributes',
        outputs: [
            {
                components: [
                    {
                        internalType: 'string',
                        name: 'key',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: 'value',
                        type: 'string',
                    },
                ],
                internalType: 'struct IAttributeStorage.Attribute[]',
                name: '',
                type: 'tuple[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'addr',
                type: 'address',
            },
        ],
        name: 'getNamesOfAddress',
        outputs: [
            {
                internalType: 'string[]',
                name: '',
                type: 'string[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'node',
                type: 'bytes32',
            },
            {
                internalType: 'string',
                name: 'key',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'value',
                type: 'string',
            },
        ],
        name: 'setNameAttribute',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'node',
                type: 'bytes32',
            },
            {
                components: [
                    {
                        internalType: 'string',
                        name: 'key',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: 'value',
                        type: 'string',
                    },
                ],
                internalType: 'struct IAttributeStorage.Attribute[]',
                name: 'attributes',
                type: 'tuple[]',
            },
        ],
        name: 'setNameAttributes',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];
