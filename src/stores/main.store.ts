import { observable, action, decorate } from "mobx";

export type UserData = {
    id?: number,
    login: string,
    avatar_url: string,
    html_url: string,
    followers: number,
    repos_url: string,
    created_at: string,
    updated_at: string,
    name?: string,
    email?: string
};

export type RepoData = {
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
        name: data.name ? String(data.name) : undefined,
        avatar_url: String(data.avatar_url),
        html_url: String(data.html_url),
        created_at: String(data.created_at),
        updated_at: String(data.created_at),
        followers: Number(data.followers),
        repos_url: String(data.repos_url),
        email: data.email ? String(data.email) : undefined
    }
};

const getEmptyUserData = (): UserData => {
    return {
        login: '',
        name: '',
        avatar_url: '',
        html_url: '',
        created_at: '',
        updated_at: '',
        followers: 0,
        repos_url: '',
    };
}

export class AppState {

    userData: UserData = getEmptyUserData();
    userRepos: Array<RepoData> = [];

    updataUserData(data: Record<string, DataEntry>) {
        this.userData = prepareRawUserData(data);
    }

    updateRepoData(data: Array<Record<string, DataEntry>>) {
        this.userRepos = data.map(entry => prepareRawRepoData(entry)).filter(repoData => repoData.ownerId != null && repoData.ownerId === this.userData.id);
    }

    resetData() {
        this.userData = getEmptyUserData();
        this.userRepos = [];
    }
}

decorate (AppState, {
    userData: observable,
    userRepos: observable,
    updataUserData: action,
    updateRepoData: action,
    resetData: action
});