import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React from 'react';
import BuildIcon from '@mui/icons-material/Build';

export enum AddOrUpdate {
    ADD,
    UPDATE,
}

interface ModalType {
    type: AddOrUpdate;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddOrUpdateModal: React.FC<ModalType> = (type: ModalType) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const AddOrUpdateButton = (type: ModalType) => {
        return type.type === AddOrUpdate.ADD ? (
            <Button onClick={handleOpen}>Add Idea</Button>
        ) : (
            <Button onClick={handleOpen}>
                <BuildIcon />
            </Button>
        );
    };

    return (
        <div>
            <AddOrUpdateButton {...type} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Add Or Update an Idea"
                aria-describedby="Add or Modify the details here to add/change an idea"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default AddOrUpdateModal;
