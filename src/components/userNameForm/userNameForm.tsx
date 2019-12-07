import React from 'react';
import { debounce } from '../../services/utils.service';
import { SETTINGS } from '../../settings';

interface UserNameFormProps {
    getUsername: (value: string) => void;
};

let value = '';

export const UserNameForm: React.FC<UserNameFormProps> = (props) => {

    const onChange = debounce((val: string) => {
        const newValue = val.trim();

        if (newValue !== value) {
            value = newValue;
            props.getUsername(value);
        }
    }, SETTINGS.INPUT_DELAY);

    return (
        <input onChange={evt => onChange(evt.target.value)} />
    );
};