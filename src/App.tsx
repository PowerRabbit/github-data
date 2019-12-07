import './App.css';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { AppState } from './stores/main.store';
import { UserNameForm } from './components/userNameForm';
import { GdAPI } from './services/api.service';
import { GdResponseType } from './enum/communication.enum';

const App = inject("store") (
    observer ((props: { store?: AppState }) => {
        const getUsername = (username: string) => {
            //    props.store!.userData.login = username + ' ' + Math.random();

            GdAPI.getUserData(username).then(response => {
                console.log(response);
                switch(response.type) {
                    case GdResponseType.error:
                        alert(response.message || 'An error occured. Please, check your internet connection.');
                    break;
                    case GdResponseType.ok:
                        console.log(response.data);
                    break;
                }
            });
        }

        return (
            <div className="App">
                Login {props.store!.userData.login}
                <UserNameForm getUsername={getUsername}  />
            </div>
        );
    })
);

export default App;
