const os = require('os');
const path = require('path');
const fs = require('fs');

/**
 * Implementation of a basic file storage for the authentication data 
 * for interacting with Episerver
 * 
 * @implements { epi.ContentDelivery.IAuthStorage }
 */
class ClientAuthStorage {
    /**
     * The filename where the authorization token will be stored
     * 
     * @private
     * @constant
     * @readonly
     * @type { string }
     */
    AUTH_FILE = '.epi_auth'

    /**
     * The path to the homedir of the current user
     * 
     * @private
     * @type { string }
     */
    _homeDir = '';

    _filePostFix = '';

    /**
     * 
     * @param {string} [scope] The scope for the file name
     */
    constructor(scope) 
    {
        this._homeDir = os.homedir();
        this._filePostFix = scope || '';
    }

    /**
     * @returns { boolean }
     */
    clearToken() 
    {
        if (!this.isStorageFilePathUsable) return false;
        try {
            fs.unlinkSync(this.getStorageFilePath())
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * 
     * @param { epi.ContentDelivery.IOAuthSuccessResponse } token The token to store
     * @returns { boolean }
     */
    storeToken(token)
    {
        if (!this.isStorageFilePathUsable) return false;
        try {
            const data = Buffer.from(JSON.stringify(token));
            fs.writeFileSync(this.getStorageFilePath(), data.toString('base64'));
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
     * @returns { boolean }
     */
    hasToken()
    {
        return this.getToken() !== null;
    }

    /**
     * @returns { epi.ContentDelivery.IOAuthSuccessResponse | null }
     */
    getToken()
    {
        if (!this.isStorageFilePathUsable) return null;
        try {
            const reader = Buffer.from(fs.readFileSync(this.getStorageFilePath(), { encoding: 'ascii'}), 'base64');
            return JSON.parse(reader.toString('ascii'));
        } catch (e) {
            return null;
        }
    }

    /**
     * 
     * @protected
     * @returns { string }
     */
    getStorageFilePath()
    {
        if (this._filePostFix && typeof(this._filePostFix) === 'string' && this._filePostFix.length > 0)
            return path.join(this._homeDir, '.' + this._filePostFix + this.AUTH_FILE);
        else
            return path.join(this._homeDir, this.AUTH_FILE);
    }

    /**
     * 
     * @protected
     * @returns {boolean}
     */
    isStorageFilePathUsable()
    {
        const storagePath = this.getStorageFilePath()
        const exists = (storagePath) => {
            try {
                const stats = fs.statSync(storagePath);
                if (stats.isFile()) {
                    return true;
                }
            } catch (e) {
                return false;
            }
            throw new Error('Auth file exists but is not of type file');
        }
        const isWriteable = (path) => {
            try {
                fs.accessSync(path, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
                return true;
            } catch (e) {
                return false;
            }
        }
        return exists(storagePath) ? isWriteable(storagePath) : isWriteable(path.dirname(storagePath));
    }
}

module.exports = ClientAuthStorage;