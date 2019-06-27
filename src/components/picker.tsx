import * as React from 'react';
import { useState } from 'react';

import Dialog, { DialogTitle, DialogContent } from '@material/react-dialog';
import List, { ListItem, ListItemGraphic, ListItemText } from '@material/react-list';
import MaterialIcon from '@material/react-material-icon';
import icons from '../icons';

export const Picker = () => {
    const choices = icons;
    const [state, setState] = useState({
        isOpen: true,
        action: ''
    });

    const { isOpen } = state;
    return (
        <Dialog
            open={isOpen}
            onClose={(action) => setState({ action, isOpen: false })}>
            <DialogTitle>Select icon</DialogTitle>
            <DialogContent>
                <List avatarList>
                    {choices.map((choice, i) => (
                        <ListItem key={i} data-mdc-dialog-action={choice}>
                            <ListItemGraphic graphic={
                                <MaterialIcon icon={choice} />
                            } />
                            <ListItemText primaryText={choice} />
                        </ListItem>
                    ))
                    }
                </List>
            </DialogContent>
        </Dialog>
    );
};
