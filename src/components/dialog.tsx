import * as React from 'react';

import Dialog, { DialogTitle, DialogContent } from '@material/react-dialog/dist';
import icons from '../icons';

export const IconDialog = (props: { onClose: (icon: string) => void, selectedIcon: string, isOpen: boolean }) => {

    const { onClose, selectedIcon, isOpen } = props;

    return <Dialog
        open={isOpen}
        onClose={onClose}>
        <DialogTitle>Select an icon</DialogTitle>
        <DialogContent>
            <div className="icon-dialog-content">
                {icons.map((icon, i) =>
                    <div className="icon-dialog-content-item" data-mdc-dialog-action={`icon-code-${icon}`}>

                        <i className="material-icons icon-dialog-content-item-icon">
                            {icon}
                        </i>
                        <div className="icon-dialog-content-item-name">{icon}</div>
                    </div>
                )
                }
            </div>
        </DialogContent>
    </Dialog>
};