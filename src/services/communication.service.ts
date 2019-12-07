import { RequestMethod, GdResponseType } from "../enum/communication.enum";

type GdRequestOptions = {
    url: string;
    method: RequestMethod;
    payload?: Record<string, string>;
}

export type GdResponse = {
    type: GdResponseType;
    data: Record<string, string> | Array<Record<string, string>>;
    message: string;
}

class GdRequest {

    private url: string;
    private method: RequestMethod;
    private abortController: AbortController | null;
    private payload: string | null;

    public cancelled = false;
    public shortSignature: string;
    public fullSignature: string;
    private _result: Promise<GdResponse> | null = null;

    get result() {
        if (!this._result) {
            this._result = this.perform();
        }
        return this._result;
    }

    constructor(options: GdRequestOptions) {
        this.url = options.url;
        this.method = options.method;
        this.abortController = window.AbortController ? new AbortController() : null;
        this.payload = options.payload ? JSON.stringify(options.payload) : null;
        this.shortSignature = this.method + this.url;
        this.fullSignature = this.shortSignature + this.payload;
    }

    private composeResult(type: GdResponseType, response: Record<string, string>): GdResponse {
        switch(type) {
            case GdResponseType.ok:
                return {
                    type: GdResponseType.ok,
                    data: response,
                    message: ''
                };
            default:
                return {
                    type: this.cancelled ? GdResponseType.cancelled : GdResponseType.error,
                    data: response,
                    message: response.message || ''
                }
        }
    }

    private async perform(): Promise<GdResponse> {
        try {
            const response = await fetch(this.url, {
                method: this.method,
                body: this.payload,
                signal: this.abortController ? this.abortController.signal : null,
                mode: 'cors',
                headers:{
                  'Content-Type': 'application/json'
                }
            }).then(res => res.json());
            return this.composeResult(GdResponseType.ok, response);
        } catch(e) {
            console.warn(e);
            return this.composeResult(GdResponseType.error, e);
        }
    }

    public cancel() {
        if (this.abortController) {
            this.abortController.abort();
        }
        this.cancelled = true;
    }
}

class CommunicationServiceSingleton {
    private static _instance: CommunicationServiceSingleton;
    private requests: Array<GdRequest> = [];

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

    private removeFromPool(index: number) {
        if (index > -1) {
            this.requests.splice(index, 1);
        }
    }

    private async makeRequest(url: string, method: string, payload?: Record<string, string>): Promise<GdResponse> {
        const request = new GdRequest({url: url, method: (method as RequestMethod), payload});
        const sameRequest = this.requests.find(r => r.fullSignature === request.fullSignature);

        if (sameRequest) {
            return sameRequest.result;
        }

        const obsoleteRequestIndex = this.requests.findIndex(r => r.shortSignature === request.shortSignature);

        if (obsoleteRequestIndex > -1) {
            this.requests[obsoleteRequestIndex].cancel();
            this.removeFromPool(obsoleteRequestIndex);
        }

        const result = request.result;

        result.then(() => {
            this.removeFromPool(this.requests.indexOf(request));
        });
        this.requests.push(request);

        return result;
    }

    public get(url: string) {
        return this.makeRequest(url, RequestMethod.get);
    }

    public post(url: string, payload: Record<string, string>) {
        return this.makeRequest(url, RequestMethod.post, payload);
    }

    public cancelRequest(method: RequestMethod, url: string) {
        const request = this.requests.filter(r => r.shortSignature === method + url)[0];

        if (request) {
            request.cancel();
        }
    }
}

export const CommunicationService = CommunicationServiceSingleton.Instance;