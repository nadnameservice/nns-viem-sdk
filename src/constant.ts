export const nnsContractAddress =
  '0x3019BF1dfB84E5b46Ca9D0eEC37dE08a59A41308'

export const avatarKey = 'avatar'

export const tld = '.nad'

export const nnsAbi = [
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
        internalType: 'bytes32[]',
        name: 'nodes',
        type: 'bytes32[]',
      },
    ],
    name: 'getResolvedAddresses',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'node',
            type: 'bytes32',
          },
          {
            internalType: 'address',
            name: 'addr',
            type: 'address',
          },
        ],
        internalType:
          'struct IResolvedAddressStorage.ResolvedAddressItem[]',
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
        internalType: 'address[]',
        name: 'addr',
        type: 'address[]',
      },
    ],
    name: 'getPrimaryNameForAddresses',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'addr',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'primaryName',
            type: 'string',
          },
        ],
        internalType:
          'struct IPrimaryNameStorage.PrimaryNameItem[]',
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
        internalType:
          'struct IAttributeStorage.Attribute[]',
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
        internalType:
          'struct IAttributeStorage.Attribute[]',
        name: 'attributes',
        type: 'tuple[]',
      },
    ],
    name: 'setNameAttributes',
    outputs: [],
    stateMutability: 'nonpayable',
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
    name: 'getProfileForAddress',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'addr',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'primaryName',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'avatar',
            type: 'string',
          },
        ],
        internalType: 'struct INadNameService.Profile',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'addrs',
        type: 'address[]',
      },
    ],
    name: 'getProfilesForAddresses',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'addr',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'primaryName',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'avatar',
            type: 'string',
          },
        ],
        internalType: 'struct INadNameService.Profile[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const
