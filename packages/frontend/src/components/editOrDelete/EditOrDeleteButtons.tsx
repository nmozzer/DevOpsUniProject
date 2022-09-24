import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import React, { useEffect } from 'react';
import BuildIcon from '@mui/icons-material/Build';
import { apiCall, FFIdea } from '../../api/client';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalForm from '../modal/ModalForm';
import { Typography } from '@mui/material';

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

const EditOrDeleteButtons: React.FC<ModalProps> = ({ type, ffIdea }: ModalProps) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [openDelete, setOpenDelete] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>('');

    useEffect(() => {
        ffIdea?.name ? setName(ffIdea.name) : setName('');
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    const handleOnDeleteClick = async () => {
        try {
            await apiCall('/deleteIdea', { nameDeletion: name });
            alert('Successfully deleted');
            setOpenDelete(false);
            await apiCall('/getAllIdeas');
        } catch (error) {
            alert(error);
            setOpenDelete(false);
        }
    };

    return (
        <div className="flex justify-items-end items-center justify-end">
            <div>
                <Button onClick={handleOpen}>
                    <BuildIcon />
                </Button>
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
            |
            <div>
                <Button onClick={handleOpenDelete}>
                    <DeleteIcon />
                </Button>
                <Modal
                    open={openDelete}
                    onClose={handleCloseDelete}
                    aria-labelledby="Delete Idea"
                    aria-describedby="Acknowledge and deleteIdea"
                >
                    <Box sx={style} className="w-3/4">
                        <Typography>Are you sure you wish to delete this idea?</Typography>
                        <Button onClick={handleOnDeleteClick}>Delete Idea</Button>
                    </Box>
                </Modal>
            </div>
        </div>
    );
};

export default EditOrDeleteButtons;
