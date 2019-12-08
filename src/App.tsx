import './App.css';
import React from 'react';
import { reaction } from 'mobx';
import { inject, observer } from 'mobx-react';
import { AppState } from './stores/main.store';
import { UserNameForm } from './components/userNameForm/userNameForm';
import { GdAPI } from './services/api.service';
import { GdResponseType } from './enum/communication.enum';
import { UserDataOutput } from './components/UserDataOutput/UserDataOutput';
import { UserRepo } from './components/userRepo/userRepo';
import { SETTINGS } from './settings';

let currentRepoUrl = '';
let doNotRequest: Record<string, boolean> = {};
let doNotRequestLength = 0;

const addToDoNotRequest = (name: string) => {
    if (doNotRequestLength > 100) {
        doNotRequestLength = 0;
        doNotRequest = {};
    }
    doNotRequest[name] = true;
    doNotRequestLength += 1;
}

const App = inject("store") (
    observer ((props: { store?: AppState }) => {

        reaction(
            () => props.store!.userData.repos_url,
            (url, reaction) => {
                if (!url) {
                    GdAPI.cancelUserReposRequest();
                } else {
                    if (url !== currentRepoUrl) {
                        GdAPI.getUserRepos(url).then(response => {
                            if (response.type === GdResponseType.ok) {
                                props.store!.updateRepoData(response.data as Array<Record<string, string>>);
                            }
                        });
                    }
                }

                currentRepoUrl = url;
                reaction.dispose();
            }
        );

        const getUsername = (username: string) => {

            props.store!.resetData();

            if (!username || doNotRequest[username]) {
                GdAPI.cancelUserDataRequest();
                return;
            }

            GdAPI.getUserData(username).then(response => {
                switch(response.type) {
                    case GdResponseType.error:
                        if (response.message === SETTINGS.WRONG_NAME) {
                            addToDoNotRequest(username);
                        } else {
                            alert(response.message || 'An error occured. Please, check your internet connection.');
                        }
                    break;
                    case GdResponseType.ok:
                        props.store!.updataUserData(response.data as Record<string, string>);
                    break;
                }
            });
        }

        return (
            <div className="App">
                <h1>Type a GitHub username</h1>
                <UserNameForm getUsername={getUsername} />
                <section>
                    <UserDataOutput userData={props.store!.userData} />
                </section>
                <section className="mainRepoWrapper">
                    {props.store!.userRepos.map((repoData, k) => <UserRepo key={k} repoData={repoData} />)}
                </section>
            </div>
        );
    })
);

export default App;
