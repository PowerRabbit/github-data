import { CommunicationService, GdResponse } from "./communication.service";
import { SETTINGS } from "../settings";
import { RequestMethod } from "../enum/communication.enum";

 const fakeUser = {"type":"ok","data":{"login":"PowerRabbit","id":7870125,"node_id":"MDQ6VXNlcjc4NzAxMjU=","avatar_url":"https://avatars2.githubusercontent.com/u/7870125?v=4","gravatar_id":"","url":"https://api.github.com/users/PowerRabbit","html_url":"https://github.com/PowerRabbit","followers_url":"https://api.github.com/users/PowerRabbit/followers","following_url":"https://api.github.com/users/PowerRabbit/following{/other_user}","gists_url":"https://api.github.com/users/PowerRabbit/gists{/gist_id}","starred_url":"https://api.github.com/users/PowerRabbit/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/PowerRabbit/subscriptions","organizations_url":"https://api.github.com/users/PowerRabbit/orgs","repos_url":"https://api.github.com/users/PowerRabbit/repos","events_url":"https://api.github.com/users/PowerRabbit/events{/privacy}","received_events_url":"https://api.github.com/users/PowerRabbit/received_events","type":"User","site_admin":false,"name":null,"company":null,"blog":"","location":null,"email":"rrr@rrrr.rr","hireable":true,"bio":null,"public_repos":8,"public_gists":0,"followers":0,"following":0,"created_at":"2014-06-12T11:53:05Z","updated_at":"2019-12-07T12:36:57Z"},"message":""};


class GdAPISingleton {

    private static currentUserDataUrl = '';

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

    public getUserData(userName: string): Promise<GdResponse> {
        this.cancelUserDataRequest();
        GdAPISingleton.currentUserDataUrl = SETTINGS.USER_URL + encodeURIComponent(userName);

        //return CommunicationService.get(GdAPISingleton.currentUserDataUrl);
        return Promise.resolve((fakeUser as never as GdResponse));
    }

}

export const GdAPI = GdAPISingleton.Instance;
