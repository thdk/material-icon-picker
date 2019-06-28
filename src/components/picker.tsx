import * as React from 'react';
import { useState } from 'react';
import TextField, { HelperText, Input, Props } from '@material/react-text-field/dist/index';
import MaterialIcon from '@material/react-material-icon';

import { IconDialog } from './dialog';

export const Picker = (props: {textfield: Exclude<Props, "leadingIcon" | "trailingIcon">}) => {
    const [state, setState] = useState({
        isOpen: false,
        icon: ''
    });

    const { isOpen, icon } = state;

    const {textfield} = props;

    return (<>
<TextField {...textfield}
            label="Icon"
            helperText={<HelperText>Pick your icon</HelperText>}
            leadingIcon={<MaterialIcon role="button" icon={icon}></MaterialIcon>}
            onTrailingIconSelect={() => setState({ icon, isOpen: true })}
            trailingIcon={<MaterialIcon role="button" icon="edit" />}
            outlined={true}
        ><Input
                value={icon}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    setState({ icon: e.currentTarget.value, isOpen: false });
                }} />
        </TextField>
        <IconDialog
            isOpen={isOpen}
            onClose={icon => {
                if (icon !== "close") {
                    setState({ icon: icon.substr(10), isOpen: false });
                } else {
                    setState({ isOpen: false, icon: "" })
                }
            }}
            selectedIcon={icon} />
    </>
    );
};
