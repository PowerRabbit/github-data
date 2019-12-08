import { CommunicationService, GdResponse } from "./communication.service";
import { SETTINGS } from "../settings";
import { RequestMethod } from "../enum/communication.enum";

class GdAPISingleton {

    private static currentUserDataUrl = '';
    private static currentUserReposUrl = '';

    private static _instance: GdAPISingleton;

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public cancelUserDataRequest() {
        if (GdAPISingleton.currentUserDataUrl) {
            CommunicationService.cancelRequest(RequestMethod.get, GdAPISingleton.currentUserDataUrl);
            GdAPISingleton.currentUserDataUrl = '';
        }
    }

    public cancelUserReposRequest() {
        if (GdAPISingleton.currentUserReposUrl) {
            CommunicationService.cancelRequest(RequestMethod.get, GdAPISingleton.currentUserReposUrl);
            GdAPISingleton.currentUserReposUrl = '';
        }
    }

    public getUserData(userName: string): Promise<GdResponse> {
        this.cancelUserDataRequest();
        GdAPISingleton.currentUserDataUrl = SETTINGS.SERVER_URL + SETTINGS.USER_URL + encodeURIComponent(userName);
        return CommunicationService.get(GdAPISingleton.currentUserDataUrl);
    }

    public getUserRepos(url: string): Promise<GdResponse> {
        this.cancelUserReposRequest();
        GdAPISingleton.currentUserReposUrl = encodeURI(url);
        return CommunicationService.get(GdAPISingleton.currentUserReposUrl);
    }

}

export const GdAPI = GdAPISingleton.Instance;
