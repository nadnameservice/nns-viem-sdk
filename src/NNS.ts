import {
  Address,
  namehash,
  PublicClient,
  SendTransactionReturnType,
  WalletClient,
  zeroAddress,
} from 'viem'
import {
  avatarKey,
  nnsAbi,
  nnsContractAddress,
  tld,
} from './constant'

type ViemClient = PublicClient

export type NNSNameAttribute = {
  key: string
  value: string
}

export type Profile = {
  primaryName: string | undefined
  avatar: string | undefined
  addr: string | undefined
}

export type ResolvedAddressItem = {
  name: string
  resolvedAddress?: string
}

export type PrimaryNameItems = {
  addr: string
  primaryName?: string
}

export class NNS {
  private client: ViemClient
  private walletClient: WalletClient | undefined

  constructor(
    client: ViemClient,
    walletClient: WalletClient | undefined = undefined
  ) {
    this.client = client
    this.walletClient = walletClient
  }

  /**
   * Retrieves the profile associated with a given address.
   *
   * @param {string} address - The wallet address.
   * @returns {Profile} A promise that resolves to the profile associated with the given address.
   */
  async getProfile(address: Address): Promise<Profile> {
    const result = await this.client.readContract({
      address: nnsContractAddress,
      abi: nnsAbi,
      functionName: 'getProfileForAddress',
      args: [address],
    })

    const profile = {
      primaryName:
        result?.primaryName && result.primaryName !== ''
          ? result.primaryName + tld
          : undefined,
      avatar:
        result?.avatar !== '' ? result?.avatar : undefined,
      addr: result?.addr,
    }

    return profile
  }

  /**
   * Retrieves the profiles associated with a list of addresses.
   * @param addrs - The list of wallet addresses
   * @returns {Profile[]} A promise that resolves to the profiles associated with the given addresses.
   */
  async getProfiles(addrs: Address[]): Promise<Profile[]> {
    const result = await this.client.readContract({
      address: nnsContractAddress,
      abi: nnsAbi,
      functionName: 'getProfilesForAddresses',
      args: [addrs],
    })

    const profiles = result.map((p) => ({
      primaryName:
        p?.primaryName && p.primaryName !== ''
          ? p.primaryName + tld
          : undefined,
      avatar: p?.avatar !== '' ? p?.avatar : undefined,
      addr: p?.addr,
    }))

    return profiles
  }

  /**
   * Resolves a given name to an address.
   *
   * @param {string} name - The name to resolve, with the **.nad** domain.
   * @returns {Address} The resolved address associated with the given name
   * and address zero if the name is unregistered.
   */
  async getResolvedAddress(name: string): Promise<Address> {
    const result = await this.client.readContract({
      address: nnsContractAddress,
      abi: nnsAbi,
      functionName: 'getResolvedAddress',
      args: [namehash(name)],
    })

    return result
  }

  /**
   * Resolves a list of names to their respective addresses.
   *
   * @param {string[]} names - The list of names to resolve, with the **.nad** domain.
   * @returns {ResolvedAddressesItem[]} An array of objects containing the name and its resolved address.
   */
  async getResolvedAddresses(
    names: string[]
  ): Promise<ResolvedAddressItem[]> {
    const namehashes = names.map((name) => namehash(name))

    const resolvedAddrs = await this.client.readContract({
      address: nnsContractAddress,
      abi: nnsAbi,
      functionName: 'getResolvedAddresses',
      args: [namehashes],
    })

    const result = names.map((name) => {
      const resolvedAddressVal = resolvedAddrs.find(
        (item) => item.node === namehash(name)
      )?.addr

      const resolvedAddress =
        resolvedAddressVal !== undefined &&
        resolvedAddressVal !== zeroAddress
          ? resolvedAddressVal
          : undefined

      return {
        name,
        resolvedAddress,
      }
    })

    return result
  }

  /**
   * Retrieves the primary name associated with an address.
   *
   * @param {string} address - The wallet address.
   * @returns {string} A promise that resolves to the primary name associated with the given address
   * and an empty string if the primary name is not set.
   */
  async getPrimaryNameForAddress(
    address: Address
  ): Promise<string> {
    const result = await this.client.readContract({
      address: nnsContractAddress,
      abi: nnsAbi,
      functionName: 'getPrimaryNameForAddress',
      args: [address],
    })

    return result != '' ? result + tld : ''
  }

  /**
   * Retrieves the primary names associated with a list of addresses.
   *
   * @param {string[]} addrs - The list of wallet addresses.
   * @returns {PrimaryNameItems[]} An array of objects containing the address and its primary name.
   */
  async getPrimaryNameForAddresses(
    addrs: Address[]
  ): Promise<PrimaryNameItems[]> {
    const primaryNames = await this.client.readContract({
      address: nnsContractAddress,
      abi: nnsAbi,
      functionName: 'getPrimaryNameForAddresses',
      args: [addrs],
    })

    const result = addrs.map((addr) => {
      const primaryNameVal = primaryNames.find(
        (item) => item.addr === addr
      )?.primaryName

      const primaryName =
        primaryNameVal !== undefined &&
        primaryNameVal !== ''
          ? primaryNameVal + tld
          : undefined

      return {
        addr,
        primaryName,
      }
    })

    return result
  }

  /**
   * Retrieves the value of a specific attribute for a given name.
   *
   * @param {string} name - The name to retrieve the attribute from, with the **.nad** domain.
   * @param {string} key - The key of the attribute to retrieve.
   * @returns {string} The value of the attribute associated with the given name and key.
   */
  async getNameAttribute(
    name: string,
    key: string
  ): Promise<string> {
    const result = await this.client.readContract({
      address: nnsContractAddress,
      abi: nnsAbi,
      functionName: 'getNameAttribute',
      args: [namehash(name), key],
    })

    return result
  }

  /**
   * Retrieves a list of name attributes
   *
   * @param {string} name - The name to retrieve the attribute from, with the **.nad** domain.
   * @param {string} keys - The keys of the attributes to retrieve.
   * @returns {NNSNameAttribute[]} List of name attributes
   */
  async getNameAttributes(
    name: string,
    keys: string[]
  ): Promise<NNSNameAttribute[]> {
    const result = await this.client.readContract({
      address: nnsContractAddress,
      abi: nnsAbi,
      functionName: 'getNameAttributes',
      args: [namehash(name), keys],
    })

    return [...result]
  }

  /**
   * Retrieves the names associated with a given address.
   *
   * @param {string} address - The wallet address.
   * @returns {string[]} An array of names associated with the given address.
   */
  async getNamesOfAddress(
    address: Address
  ): Promise<string[]> {
    const result = await this.client.readContract({
      address: nnsContractAddress,
      abi: nnsAbi,
      functionName: 'getNamesOfAddress',
      args: [address],
    })

    return [...result]
  }

  /**
   * Retrieves the avatar URL associated with a given name.
   *
   * @param {string} name - The name to retrieve the avatar URL from, with the **.nad** domain.
   * @returns {string} The avatar URL associated with the given name.
   */
  async getAvatarUrl(name: string): Promise<string> {
    return this.getNameAttribute(name, avatarKey)
  }

  /**
   * Set a value for a specific attribute for a given name.
   * @param {string} name - The name to set the attribute for, with the **.nad** domain.
   * @param {string} key - The key of the attribute to set.
   * @param {string} value - The value of the attribute to set.
   * @returns {Transaction} Transaction object for the contract call.
   */
  async setNameAttribute(
    name: string,
    key: string,
    value: string
  ): Promise<SendTransactionReturnType> {
    if (!this.walletClient) {
      throw new Error(
        'setNameAttribute requires a signer to be set'
      )
    }

    const { request } = await this.client.simulateContract({
      account: this.walletClient.account,
      address: nnsContractAddress,
      abi: nnsAbi,
      functionName: 'setNameAttribute',
      args: [namehash(name), key, value],
    })

    const result = await this.walletClient.writeContract(
      request
    )

    return result
  }

  /**
   * Set a value for a specific attribute for a given name.
   * @param {string} name - The name to set the attribute for, with the **.nad** domain.
   * @param {NNSNameAttribute[]} attributes - The attributes to set.
   * @returns {Transaction} Transaction object for the contract call.
   */
  async setNameAttributes(
    name: string,
    attributes: NNSNameAttribute[]
  ): Promise<SendTransactionReturnType> {
    if (!this.walletClient) {
      throw new Error(
        'setNameAttribute requires a signer to be set'
      )
    }

    const { request } = await this.client.simulateContract({
      account: this.walletClient.account,
      address: nnsContractAddress,
      abi: nnsAbi,
      functionName: 'setNameAttributes',
      args: [namehash(name), attributes],
    })

    const result = await this.walletClient.writeContract(
      request
    )

    return result
  }
}
