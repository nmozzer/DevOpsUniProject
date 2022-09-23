import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import React from 'react';
import BuildIcon from '@mui/icons-material/Build';
import ModalForm from './ModalForm';
import { FFIdea } from '../../api/client';

export enum AddOrUpdate {
    ADD,
    UPDATE,
}

export interface ModalProps {
    type: AddOrUpdate;
    ffIdea?: FFIdea;
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

const AddOrUpdateModal: React.FC<ModalProps> = ({ type, ffIdea }: ModalProps) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const AddOrUpdateButton = ({ type }: { type: AddOrUpdate }) => {
        return type === AddOrUpdate.ADD ? (
            <Button variant="contained" onClick={handleOpen}>
                Add Idea
            </Button>
        ) : (
            <Button onClick={handleOpen}>
                <BuildIcon />
            </Button>
        );
    };

    return (
        <div>
            <AddOrUpdateButton {...{ type }} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Add Or Update an Idea"
                aria-describedby="Add or Modify the details here to add/change an idea"
            >
                <Box sx={style} className="w-3/4">
                    <ModalForm {...{ type, ffIdea, setOpen }} />
                </Box>
            </Modal>
        </div>
    );
};

export default AddOrUpdateModal;
