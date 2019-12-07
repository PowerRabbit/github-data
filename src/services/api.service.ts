import { CommunicationService, GdResponse } from "./communication.service";
import { SETTINGS } from "../settings";
import { RequestMethod } from "../enum/communication.enum";

class GdAPISingleton {

    private static currentUserDataUrl = '';

    private static _instance: GdAPISingleton;

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public getUserData(userName: string,): Promise<GdResponse> {
        if (GdAPISingleton.currentUserDataUrl) {
            CommunicationService.cancelRequest(RequestMethod.get, GdAPISingleton.currentUserDataUrl);
        }
        GdAPISingleton.currentUserDataUrl = SETTINGS.USER_URL + encodeURIComponent(userName);

        return CommunicationService.get(GdAPISingleton.currentUserDataUrl);
    }

}

export const GdAPI = GdAPISingleton.Instance;
