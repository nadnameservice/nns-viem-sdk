"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NNS = void 0;
const viem_1 = require("viem");
const constant_1 = require("./constant");
class NNS {
    constructor(client, walletClient = undefined) {
        this.client = client;
        this.walletClient = walletClient;
    }
    /**
     * Resolves a given name to an address.
     *
     * @param {string} name - The name to resolve, with the **.nad** domain.
     * @returns {Address} The resolved address associated with the given name
     * and address zero if the name is unregistered.
     */
    getResolvedAddress(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.client.readContract({
                address: constant_1.nnsContractAddress,
                abi: constant_1.nnsAbi,
                functionName: 'getResolvedAddress',
                args: [(0, viem_1.namehash)(name)],
            });
            return result;
        });
    }
    /**
     * Retrieves the primary name associated with an address.
     *
     * @param {string} address - The wallet address.
     * @returns {string} A promise that resolves to the primary name associated with the given address
     * and an empty string if the primary name is not set.
     */
    getPrimaryNameForAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.client.readContract({
                address: constant_1.nnsContractAddress,
                abi: constant_1.nnsAbi,
                functionName: 'getPrimaryNameForAddress',
                args: [address],
            });
            return result;
        });
    }
    /**
     * Retrieves the value of a specific attribute for a given name.
     *
     * @param {string} name - The name to retrieve the attribute from, with the **.nad** domain.
     * @param {string} key - The key of the attribute to retrieve.
     * @returns {string} The value of the attribute associated with the given name and key.
     */
    getNameAttribute(name, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.client.readContract({
                address: constant_1.nnsContractAddress,
                abi: constant_1.nnsAbi,
                functionName: 'getNameAttribute',
                args: [(0, viem_1.namehash)(name), key],
            });
            return result;
        });
    }
    /**
     * Retrieves a list of name attributes
     *
     * @param {string} name - The name to retrieve the attribute from, with the **.nad** domain.
     * @param {string} keys - The keys of the attributes to retrieve.
     * @returns {NNSNameAttribute[]} List of name attributes
     */
    getNameAttributes(name, keys) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.client.readContract({
                address: constant_1.nnsContractAddress,
                abi: constant_1.nnsAbi,
                functionName: 'getNameAttributes',
                args: [(0, viem_1.namehash)(name), keys],
            });
            return [...result];
        });
    }
    /**
     * Retrieves the names associated with a given address.
     *
     * @param {string} address - The wallet address.
     * @returns {string[]} An array of names associated with the given address.
     */
    getNamesOfAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.client.readContract({
                address: constant_1.nnsContractAddress,
                abi: constant_1.nnsAbi,
                functionName: 'getNamesOfAddress',
                args: [address],
            });
            return [...result];
        });
    }
    /**
     * Retrieves the avatar URL associated with a given name.
     *
     * @param {string} name - The name to retrieve the avatar URL from, with the **.nad** domain.
     * @returns {string} The avatar URL associated with the given name.
     */
    getAvatarUrl(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getNameAttribute(name, constant_1.avatarKey);
        });
    }
    /**
     * Set a value for a specific attribute for a given name.
     * @param {string} name - The name to set the attribute for, with the **.nad** domain.
     * @param {string} key - The key of the attribute to set.
     * @param {string} value - The value of the attribute to set.
     * @returns {Transaction} Transaction object for the contract call.
     */
    setNameAttribute(name, key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.walletClient) {
                throw new Error('setNameAttribute requires a signer to be set');
            }
            const { request } = yield this.client.simulateContract({
                account: this.walletClient.account,
                address: constant_1.nnsContractAddress,
                abi: constant_1.nnsAbi,
                functionName: 'setNameAttribute',
                args: [(0, viem_1.namehash)(name), key, value],
            });
            const result = yield this.walletClient.writeContract(request);
            return result;
        });
    }
    /**
     * Set a value for a specific attribute for a given name.
     * @param {string} name - The name to set the attribute for, with the **.nad** domain.
     * @param {NNSNameAttribute[]} attributes - The attributes to set.
     * @returns {Transaction} Transaction object for the contract call.
     */
    setNameAttributes(name, attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.walletClient) {
                throw new Error('setNameAttribute requires a signer to be set');
            }
            const { request } = yield this.client.simulateContract({
                account: this.walletClient.account,
                address: constant_1.nnsContractAddress,
                abi: constant_1.nnsAbi,
                functionName: 'setNameAttributes',
                args: [(0, viem_1.namehash)(name), attributes],
            });
            const result = yield this.walletClient.writeContract(request);
            return result;
        });
    }
}
exports.NNS = NNS;
