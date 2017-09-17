const crypto = require("crypto");
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

export class SignereWebClient {
    constructor(private baseUrl: string, private apiId: string, private primaryKey: string, private secondaryKey: string, private pingToken: string) {

    }

    private _sha512(text: string) {
        const hmac = crypto.createHmac('sha512', this.primaryKey);
        hmac.update(text);
        return hmac.digest('hex').toUpperCase();
    }

    private _getAxiosRequestConfig(path: string, verb: string, data?: any, cfg?: AxiosRequestConfig): AxiosRequestConfig {
        var url = this.baseUrl + path;
        var timestamp = new Date().toISOString().substr(0, 19);
        var api_token;
        if (verb == "PUT" || verb == "POST") {
            api_token = this._sha512(JSON.stringify(data) + "{Timestamp:\"" + timestamp + "\",Httpverb:\"" + verb + "\"}");
        } else {
            api_token = this._sha512(url + "&Timestamp=" + timestamp + "&Httpverb=" + verb);
        }
        const req: AxiosRequestConfig = {
            headers: {
                'API-ID': this.apiId,
                'API-TOKEN': api_token,
                'API-TIMESTAMP': timestamp,
                'API-ALGORITHM': 'SHA512',
                'API-RETURNERRORHEADER': 'TRUE'
            },
            url: url,
            method: verb
        };
        if (typeof data !== "undefined") {
            req.data = data;
        }
        if (cfg) {
            Object.assign(req, cfg);
        }
        return req;
    }

    private _axios(path: string, verb: string, data?: any, cfg?: AxiosRequestConfig): AxiosPromise {
        return axios.request(this._getAxiosRequestConfig(path, verb, data, cfg));
    }

    get(path: string, cfg?: AxiosRequestConfig): AxiosPromise {
        return this._axios(path, "GET", undefined, cfg);
    }

    delete(path: string, cfg?: AxiosRequestConfig): AxiosPromise {
        return this._axios(path, "DELETE", undefined, cfg);
    }

    post(path: string, body?: any, cfg?: AxiosRequestConfig): AxiosPromise {
        return this._axios(path, "POST", body, cfg);
    }

    put(path: string, body?: any, cfg?: AxiosRequestConfig): AxiosPromise {
        return this._axios(path, "PUT", body, cfg);
    }

    ping(path: string): AxiosPromise {
        const req = this._getAxiosRequestConfig(path, 'GET');
        req.headers['PingToken'] = this.pingToken;
        return axios.request(req);
    }

}