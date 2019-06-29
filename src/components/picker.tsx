import * as React from 'react';
import { useState } from 'react';
import TextField, { HelperText, Input, Props } from '@material/react-text-field/dist/index';
import MaterialIcon from '@material/react-material-icon';

import { IconDialog } from './dialog';
import icons from '../icons';

export interface IIconPickerProps { textfield?: Partial<Pick<HTMLInputElement, "value">> & Omit<Props, "children" | "trailingIcon" | "leadingIcon"> & { editIcon?: string } };

type MyArray = typeof icons[number];

const IconPicker: React.SFC<IIconPickerProps> = (props: IIconPickerProps) => {
    const [state, setState] = useState({
        isOpen: false,
        icon: ''
    });

    const { isOpen, icon } = state;

    const {
        helperText = "Pick your icon",
        label = null,
        outlined = false,
        editIcon = "edit",
        ...rest
    } = props.textfield || {};

    return (<>
        <TextField
            helperText={<HelperText>{helperText}</HelperText>}
            leadingIcon={<MaterialIcon role="button" icon={icon}></MaterialIcon>}
            onTrailingIconSelect={() => setState({ icon, isOpen: true })}
            trailingIcon={<MaterialIcon role="button" icon="edit" />}
            outlined={true}
            label={(label || "Icon").toString()}
            {...rest}
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

IconPicker.defaultProps = {};

export default IconPicker;