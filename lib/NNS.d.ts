import { Address, PublicClient, SendTransactionReturnType, WalletClient } from 'viem';
type ViemClient = PublicClient;
export type NNSNameAttribute = {
    key: string;
    value: string;
};
export declare class NNS {
    private client;
    private walletClient;
    constructor(client: ViemClient, walletClient?: WalletClient | undefined);
    /**
     * Resolves a given name to an address.
     *
     * @param {string} name - The name to resolve, with the **.nad** domain.
     * @returns {Address} The resolved address associated with the given name
     * and address zero if the name is unregistered.
     */
    getResolvedAddress(name: string): Promise<Address>;
    /**
     * Retrieves the primary name associated with an address.
     *
     * @param {string} address - The wallet address.
     * @returns {string} A promise that resolves to the primary name associated with the given address
     * and an empty string if the primary name is not set.
     */
    getPrimaryNameForAddress(address: Address): Promise<string>;
    /**
     * Retrieves the value of a specific attribute for a given name.
     *
     * @param {string} name - The name to retrieve the attribute from, with the **.nad** domain.
     * @param {string} key - The key of the attribute to retrieve.
     * @returns {string} The value of the attribute associated with the given name and key.
     */
    getNameAttribute(name: string, key: string): Promise<string>;
    /**
     * Retrieves a list of name attributes
     *
     * @param {string} name - The name to retrieve the attribute from, with the **.nad** domain.
     * @param {string} keys - The keys of the attributes to retrieve.
     * @returns {NNSNameAttribute[]} List of name attributes
     */
    getNameAttributes(name: string, keys: string[]): Promise<NNSNameAttribute[]>;
    /**
     * Retrieves the names associated with a given address.
     *
     * @param {string} address - The wallet address.
     * @returns {string[]} An array of names associated with the given address.
     */
    getNamesOfAddress(address: Address): Promise<string[]>;
    /**
     * Retrieves the avatar URL associated with a given name.
     *
     * @param {string} name - The name to retrieve the avatar URL from, with the **.nad** domain.
     * @returns {string} The avatar URL associated with the given name.
     */
    getAvatarUrl(name: string): Promise<string>;
    /**
     * Set a value for a specific attribute for a given name.
     * @param {string} name - The name to set the attribute for, with the **.nad** domain.
     * @param {string} key - The key of the attribute to set.
     * @param {string} value - The value of the attribute to set.
     * @returns {Transaction} Transaction object for the contract call.
     */
    setNameAttribute(name: string, key: string, value: string): Promise<SendTransactionReturnType>;
    /**
     * Set a value for a specific attribute for a given name.
     * @param {string} name - The name to set the attribute for, with the **.nad** domain.
     * @param {NNSNameAttribute[]} attributes - The attributes to set.
     * @returns {Transaction} Transaction object for the contract call.
     */
    setNameAttributes(name: string, attributes: NNSNameAttribute[]): Promise<SendTransactionReturnType>;
}
export {};
