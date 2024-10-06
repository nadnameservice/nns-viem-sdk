import {
  Address,
  namehash,
  PublicClient,
  SendTransactionReturnType,
  WalletClient,
} from 'viem'
import {
  avatarKey,
  nnsAbi,
  nnsContractAddress,
} from './constant'

type ViemClient = PublicClient

export type NNSNameAttribute = {
  key: string
  value: string
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
