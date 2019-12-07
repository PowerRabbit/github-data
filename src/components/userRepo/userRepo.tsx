import React from 'react';
import './userRepo.css';
import { RepoData } from '../../stores/main.store';

interface RepoDataProps {
    repoData: RepoData;
};

export const UserRepo: React.FC<RepoDataProps> = (props) => {
    const url = props.repoData.html_url ? <div><a href={props.repoData.html_url} target="_blank" rel="noopener noreferrer">{props.repoData.html_url}</a></div> : '';
    return (
        <div>
            {props.repoData.name &&
            <div>
                <h3>{props.repoData.name}</h3>
                {url}
            </div>
            }
        </div>
    );
};