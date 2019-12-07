import { observable, action, decorate } from "mobx";

type UserData = {
    id?: number,
    login: string,
    avatar_url: string,
    html_url: string,
    followers_url: string,
    followers: number,
    email?: string
};

type RepoData = {
    ownerId?: number,
    name: string,
    html_url: string,
    stargazers_count: number,
    language?: string
}

type DataEntry = string | number | Record<string, number>;

const prepareRawRepoData = (data: Record<string, DataEntry>): RepoData => {
    const ownerId = data.owner && (data.owner as Record<string, number>).id;
    return {
        ownerId: ownerId != null ? Number(ownerId) : undefined,
        name: String(data.name),
        html_url: String(data.html_url),
        stargazers_count: Number(data.stargazers_count),
        language: data.language ? String(data.language) : undefined
    }
};

const prepareRawUserData = (data: Record<string, DataEntry>): UserData => {
    return {
        id: Number(data.id),
        login: String(data.login),
        avatar_url: String(data.avatar_url),
        html_url: String(data.html_url),
        followers_url: String(data.followers_url),
        followers: Number(data.followers),
        email: data.email ? String(data.email) : undefined
    }
};

const getEmptyUserData = (): UserData => {
    return {
        login: '',
        avatar_url: '',
        html_url: '',
        followers_url: '',
        followers: 0,
    };
}

export class AppState {

    userData: UserData = getEmptyUserData();
    userRepos: Array<RepoData> = [];

    updataUserData(data: Record<string, DataEntry>) {
        this.userData = prepareRawUserData(data);
    }

    updataRepoData(data: Array<Record<string, DataEntry>>) {
        this.userRepos = data.map(entry => prepareRawRepoData(entry)).filter(repoData => repoData.ownerId != null && repoData.ownerId === this.userData.id);
    }

    resetData() {
        this.userData = getEmptyUserData();
        this.userRepos = [];
    }
}

decorate (AppState, {
    userData: observable,
    updataUserData: action,
    updataRepoData: action,
    resetData: action
});