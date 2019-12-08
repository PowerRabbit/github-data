import React from 'react';
import './userRepo.css';
import { RepoData } from '../../stores/main.store';

interface RepoDataProps {
    repoData: RepoData;
};

export const UserRepo: React.FC<RepoDataProps> = (props) => {
    const url = props.repoData.html_url ? <div><a href={props.repoData.html_url} target="_blank" rel="noopener noreferrer">{props.repoData.html_url}</a></div> : '';
    const language = props.repoData.language ? <div><small>{props.repoData.language}</small></div> : '';
    const repoWrapperClassName = props.repoData.name ? 'repoWrapper repoWrapper_shown' : 'repoWrapper';
    return (
        <div className={repoWrapperClassName}>
            {props.repoData.name &&
            <div>
                <h3>{props.repoData.name} <small>(stars: {props.repoData.stargazers_count})</small></h3>
                {url}
                {language}
            </div>
            }
        </div>
    );
};