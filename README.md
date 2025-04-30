# @nadnameservice/nns-viem-sdk

A TypeScript library for interacting with Nad Name Service (NNS) protocol using Viem. This library provides a convenient wrapper around the NNS smart contract, enabling seamless operations related to name resolution, address mapping, and managing name attributes.

## About Nad Name Service

Nad Name Service (NNS) is a web3 name service built natively on Monad. NNS maps human-readable names like 'salmo.nad' to machine-readable identifiers such as cryptocurrency addresses, metadata, and more.

More information:

[Website](https://nad.domains)\
[Documents](https://docs.nad.domains)\
[Monad](https://www.monad.xyz/)

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Initialization](#initialization)
  - [Examples](#examples)
- [API Reference](#api-reference)
  - [NNS Class](#nns-class)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Name Resolution:** Resolve `.nad` domain names to Ethereum addresses.
- **Address Mapping:** Retrieve primary names associated with wallet addresses.
- **Batch queries:** Retrieve resolved addresses, primary names, profiles, ...
- **Attribute Management:** Get and set custom attributes for names.
- **Avatar Integration:** Fetch avatar URLs associated with names.
- **And many more...**

## Prerequisites

- **Node.js:** Ensure you have Node.js installed (v12 or higher recommended).
- **TypeScript**
- **Viem:** This library depends on [Viem](https://viem.sh/) for blockchain interactions.

## Installation

Install the library via npm:

```bash
npm install @nadnameservice/nns-viem-sdk
```

Or using yarn:

```bash
yarn add @nadnameservice/nns-viem-sdk
```

## Usage

### Initialization

To initialize the NNS library:

Create an instance of the `NNS` class by providing a `PublicClient` if you only want to read infos:

```typescript
import { NNS } from '@nadnameservice/nns-viem-sdk'
import { createPublicClient, http } from 'viem'

const viemClient = createPublicClient({
  chain: monad,
  transport: http(),
})

const nns = new NNS(viemClient)
```

Or if you want to modify name attributes, provide `PublicCliient` and `WalletClient` to the `NNS` class:

```typescript
import { NNS } from '@nadnameservice/nns-viem-sdk'
import {
  createPublicClient,
  createWalletClient,
  http,
} from 'viem'

const viemClient = createPublicClient({
  chain: monad,
  transport: http(),
})

const viemWallet = privateKeyToAccount('...')
const viemWalletClient = createWalletClient({
  account: viemWallet,
  chain: monnad,
  transport: http(),
})

const nns = new NNS(viemClient, viemWalletClient)
```

### Examples

#### Get profile of an address, include primary name and avatar

```typescript
const profile = await nns.getProfile(
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
)

// {
//   primaryName: 'test.nad',
//   avatar: 'https://...
// }
```

#### Get profiles for multiple address

```typescript
const profiles = await nns.getProfiles([
  '0x771CdA7e3786979d8fDed8d4c22Cd42F7B576dD4',
  '0x88eecAcDfaC29ab77aa5E185f34CF8481127FB0E',
  '0xf020798E2D29C0e26d400EE12A1b100Da46bfB3C',
])

/*[
  {
    primaryName: 'nnsfaucet.nad',
    avatar: undefined,
    addr: '0x771CdA7e3786979d8fDed8d4c22Cd42F7B576dD4'
  },
  {
    primaryName: 'tungtungtungsahur69.nad',
    avatar: 'https://play-lh.googleusercontent.com/QrCjJRpiwcFZcwey7VYGtTLPM-iohNDa6ktQfRJNvr7meX3eeTSnyvW6Fe7fHh7Kjwc=w240-h480-rw',
    addr: '0x88eecAcDfaC29ab77aa5E185f34CF8481127FB0E'
  },
  {
    primaryName: 'hihihaha1234.nad',
    avatar: 'https://cdn.discordapp.com/avatars/789141581155795004/a43f791724b7a61334c2f2b01ea82ddd.png',
    addr: '0xf020798E2D29C0e26d400EE12A1b100Da46bfB3C'
  }
]*/
```

#### Get resolved address of a .nad name

```typescript
const resolveAddress = await nns.getResolvedAddress(
  'test.nad'
)
// 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

#### Get resolved addresses for a list of name

```typescript
const resolveAddresses = await nns.getResolvedAddresses([
  'mo.nad',
  'keone.nad',
  'joe69.nad',
  '0xchine.nad',
  '💜.nad',
  '0x771CdA7e3786979d8fDed8d4c22Cd42F7B576dD4',
  '123%^&',
])

/*[
  {
    name: 'joe69.nad',
    resolvedAddress: '0x88eecAcDfaC29ab77aa5E185f34CF8481127FB0E'
  },
  {
    name: '0xchine.nad',
    resolvedAddress: '0x76C5851cE22e476F3513eD31DD77840B4d9DB34C'
  },
  {
    name: '💜.nad',
    resolvedAddress: '0x0A28c04667686A7F2182a9A2488998c61029289E'
  },
  {
    name: '0x771CdA7e3786979d8fDed8d4c22Cd42F7B576dD4',
    resolvedAddress: undefined
  },
  { name: '123%^&', resolvedAddress: undefined }
]*/
```

#### Get the primary .nad name of an address

```typescript
const primaryName = await nns.getPrimaryNameForAddress(
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
)
// test.nad
```

#### Get the primary .nad name for multiple address

```typescript
const primaryNames = await nns.getPrimaryNameForAddresses([
  '0x771CdA7e3786979d8fDed8d4c22Cd42F7B576dD4',
  '0x88eecAcDfaC29ab77aa5E185f34CF8481127FB0E',
  zeroAddress,
])

/*[
  {
    addr: '0x771CdA7e3786979d8fDed8d4c22Cd42F7B576dD4',
    primaryName: 'nnsfaucet.nad'
  },
  {
    addr: '0x88eecAcDfaC29ab77aa5E185f34CF8481127FB0E',
    primaryName: 'tungtungtungsahur69.nad'
  },
  {
    addr: '0x0000000000000000000000000000000000000000',
    primaryName: undefined
  }
]*/
```

#### Get the avatar associated with a name

```typescript
const avatar = await nns.getAvatarUrl('test.nad')
// https://www.example.com/image.png
```

#### Get name attributes

```typescript
// Get an attribute
const avatarStr = await nns.getNameAttribute(
  'test.nad',
  'avatar'
)

// Get a list of attribute of a name
const customAttrs = await nns.getNameAttributes(
  'test.nad',
  ['key1', 'key2', 'key3']
)
```

#### Set name attributes

```typescript
// Set value for an attribute
const tx = await nns.setNameAttribute(
  'test.nad',
  'key1',
  'value1'
)

// Set value for a list of attributes
const tx1 = await nns.setNameAttributes('test.nad', [
  {
    key: 'key2',
    value: 'value2',
  },
  {
    key: 'key3',
    value: 'value3',
  },
])
```

## API Reference

### NNS Class

#### `getProfile(address: Address)`

Get profile including primary name, avatar for an address

- **Parameters:**
  - `address`: The wallet address.
- **Returns:** an `Profile` object includes
  - `primaryName`: The primaryName of the account
  - `avatar`: The avatar record of the account

#### `getProfiles(addrs: Address[])`

Get profile including primary name, avatar for multiple address

- **Parameters:**
  - `addrs`: The list of wallet address.
- **Returns:** an `Profile[]` array

#### `getResolvedAddress(name: string)`

Resolves a given name to an address.

- **Parameters:**
  - `name`: The name to resolve, with the `.nad` domain.
- **Returns:** Resolved address or zero address if unregistered.

#### `getResolvedAddresses(names: string[])`

Resolves a list of names to a list of addresses.

- **Parameters:**
  - `names`: The name array to resolve, with the `.nad` domain.
- **Returns:** A list of `ResolvedAddressItem` includes:
  - `name`: The .nad name
  - `resolvedAddress`: The resolved address of the name

#### `getPrimaryNameForAddress(address: string)`

Retrieves the primary name associated with an address.

- **Parameters:**
  - `address`: The wallet address.
- **Returns:** Primary name or empty string if not set.

#### `getPrimaryNameForAddresses(addrs: Address[])`

Retrieves the primary names associated with a list of address.

- **Parameters:**
  - `addrs`: The list of address
- **Returns:** A list of `PrimaryNameItems` includes:
  - `addr`: The wallet address
  - `primaryName`: The primary name associated with the address

#### `getNameAttribute(name: string, key: string)`

Retrieves the value of a specific attribute for a given name.

- **Parameters:**
  - `name`: The name to retrieve the attribute from, with the `.nad` domain.
  - `key`: The key of the attribute.
- **Returns:** Value of the attribute.

#### `getNameAttributes(name: string, keys: string[])`

Retrieves a list of name attributes.

- **Parameters:**
  - `name`: The name to retrieve attributes from, with the `.nad` domain.
  - `keys`: The keys of the attributes to retrieve.
- **Returns:** List of name attributes.

#### `getNamesOfAddress(address: string)`

Retrieves the names associated with a given address.

- **Parameters:**
  - `address`: The wallet address.
- **Returns:** An array of names associated with the address.

#### `getAvatarUrl(name: string)`

Retrieves the avatar URL associated with a given name.

- **Parameters:**
  - `name`: The name to retrieve the avatar URL from, with the `.nad` domain.
- **Returns:** Avatar URL.

#### `setNameAttribute(name: string, key: string, value: string)`

Sets a value for a specific attribute for a given name.

- **Parameters:**
  - `name`: The name to set the attribute for, with the `.nad` domain.
  - `key`: The key of the attribute to set.
  - `value`: The value of the attribute to set.
- **Returns:** Transaction data.

#### `setNameAttributes(name: string, attributes: NNSNameAttribute[])`

Sets multiple attributes for a given name.

- **Parameters:**
  - `name`: The name to set the attributes for, with the `.nad` domain.
  - `attributes`: The attributes to set.
- **Returns:** Transaction data.

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your forked repository.
5. Open a pull request detailing your changes and why they should be merged.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
