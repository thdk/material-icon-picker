import * as React from 'react';
import { useState } from 'react';
import TextField, { HelperText, Input, Props } from '@material/react-text-field/dist/index';
import MaterialIcon from '@material/react-material-icon';

import { IconDialog } from './dialog';
import icons from '../icons';

export interface IIconPickerProps {
    textfield?: Partial<Pick<HTMLInputElement, "value">>
    & Omit<Props, "children" | "trailingIcon" | "leadingIcon" | "helperText">
    & { editIcon?: string, helperTextValue?: string },
    input: Omit<React.HTMLProps<HTMLInputElement>, "onChange">,
    onChange: (icon: string) => void;
};

const IconPicker: React.SFC<IIconPickerProps> = (props: IIconPickerProps) => {
    const {
        value
    } = props.input;

    const {
        helperTextValue = undefined,
        label = null,
        outlined = false,
        editIcon = "edit",
        ...restTextField
    } = props.textfield || {};

    const { onChange } = props;

    const [state, setState] = useState({
        isOpen: false,
        icon: (value || '').toString()
    });

    const { isOpen, icon } = state;

    React.useEffect(() => {
        // only call onChange if value of inputField is a valid icon
        if (icons.indexOf(icon) !== -1) {
            onChange(icon);
        }
    }, [icon]);

    return (<>
        <TextField
            helperText={helperTextValue ? <HelperText>{helperTextValue}</HelperText> : undefined}
            leadingIcon={<MaterialIcon role="button" icon={icon}></MaterialIcon>}
            onTrailingIconSelect={() => setState({ icon, isOpen: true })}
            trailingIcon={<MaterialIcon role="button" icon="edit" />}
            outlined={true}
            label={(label || "Icon").toString()}
            {...restTextField}
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