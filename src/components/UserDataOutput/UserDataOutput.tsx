import React from 'react';
import './UserDataOutput.css';
import { UserData } from '../../stores/main.store';

interface UserDataOutputProps {
    userData: UserData;
};

export const UserDataOutput: React.FC<UserDataOutputProps> = (props) => {
    const avatar = props.userData.avatar_url ? <img className="avatar" src={props.userData.avatar_url} alt="User avatar" /> : '';
    const name = props.userData.name ? <div>{props.userData.name}</div> : '';
    const created_at = props.userData.created_at ? <div>Created: {new Date(props.userData.created_at).toLocaleDateString()}</div> : '';
    const updated_at = props.userData.updated_at ? <div>Last update: {new Date(props.userData.updated_at).toLocaleDateString()}</div> : '';
    const html_url = props.userData.html_url ? <div>Profile URL: <a href={props.userData.html_url} target="_blank" rel="noopener noreferrer">{props.userData.html_url}</a></div> : '';
    const email = props.userData.email ? <div>Email: <a href={'mailto:' + props.userData.email} >{props.userData.email}</a></div> : '';
    return (
        <div>
            {props.userData.login &&
            <div>
                <div>{avatar}</div>
                <h2>{props.userData.login}</h2>
                {created_at}
                {updated_at}
                {name}
                {html_url}
                <div>Followers: {props.userData.followers}</div>
                {email}
            </div>
            }
        </div>
    );
};