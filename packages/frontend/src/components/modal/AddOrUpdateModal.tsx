import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import React from 'react';
import BuildIcon from '@mui/icons-material/Build';
import ModalForm from './ModalForm';

export enum AddOrUpdate {
    ADD,
    UPDATE,
}

export interface ModalType {
    type: AddOrUpdate;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
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
                <Box sx={style} className="w-3/4">
                    <ModalForm {...type} />
                </Box>
            </Modal>
        </div>
    );
};

export default AddOrUpdateModal;
