import React from 'react';
import './UserDataOutput.css';
import { UserData } from '../../stores/main.store';

interface UserDataOutputProps {
    userData: UserData;
};

export const UserDataOutput: React.FC<UserDataOutputProps> = (props) => {
    const avatar = props.userData.avatar_url ? <img className="avatar" src={props.userData.avatar_url} alt="User avatar" /> : '';
    const name = props.userData.name ? <div><strong>Name</strong>: {props.userData.name}</div> : '';
    const created_at = props.userData.created_at ? <div><strong>Created</strong>: {new Date(props.userData.created_at).toLocaleDateString()}</div> : '';
    const updated_at = props.userData.updated_at ? <div><strong>Last update</strong>: {new Date(props.userData.updated_at).toLocaleDateString()}</div> : '';
    const html_url = props.userData.html_url ? <div><strong>Profile URL</strong>: <a href={props.userData.html_url} target="_blank" rel="noopener noreferrer">{props.userData.html_url}</a></div> : '';
    const email = props.userData.email ? <div><strong>Email</strong>: <a href={'mailto:' + props.userData.email} >{props.userData.email}</a></div> : '';
    const mainClassName = props.userData.login ? 'main main_shown' : 'main';
    return (
        <div className={mainClassName}>
            {props.userData.login &&
            <div>
                <div>{avatar}</div>
                <h2>{props.userData.login}</h2>
                {created_at}
                {updated_at}
                {name}
                {html_url}
                <div><strong>Followers</strong>: {props.userData.followers}</div>
                {email}
            </div>
            }
        </div>
    );
};