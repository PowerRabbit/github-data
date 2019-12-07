import './App.css';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { AppState } from './stores/main.store';
import { UserNameForm } from './components/userNameForm/userNameForm';
import { GdAPI } from './services/api.service';
import { GdResponseType } from './enum/communication.enum';
import { UserDataOutput } from './components/UserDataOutput/UserDataOutput';

const App = inject("store") (
    observer ((props: { store?: AppState }) => {
        const getUsername = (username: string) => {

            props.store!.resetData();

            if (!username) {
                GdAPI.cancelUserDataRequest();
                return;
            }

            GdAPI.getUserData(username).then(response => {
                switch(response.type) {
                    case GdResponseType.error:
                        alert(response.message || 'An error occured. Please, check your internet connection.');
                    break;
                    case GdResponseType.ok:
                        props.store!.updataUserData(response.data);
                    break;
                }
            });
        }

        return (
            <div className="App">
                <UserNameForm getUsername={getUsername} />
                <UserDataOutput userData={props.store!.userData} />
            </div>
        );
    })
);

export default App;
