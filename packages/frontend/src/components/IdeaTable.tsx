import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { apiCall, FFIdea } from '../api/client';
import Typography from '@mui/material/Typography';
import AddOrUpdateModal, { AddOrUpdate } from './modal/AddOrUpdateModal';
import EditOrDeleteButtons from './editOrDelete/EditOrDeleteButtons';
import { useIdeasHook } from './hooks/getIdeasHooks';

export const IdeaTable = () => {
    const { ideas, setIdeas } = useIdeasHook();
    const [error, setError] = React.useState<string>('');

    React.useEffect(() => {
        const getIdeas = async () => {
            try {
                const response = await apiCall('/getAllIdeas');
                setIdeas(response);
            } catch (error: any) {
                setError(error.message);
            }
        };

        getIdeas();
    }, []);
    const rows = ideas;

    const DisplayRows = () => {
        if (ideas.length === 0) {
            return (
                <div className="flex justify-center items-center h-screen flex-col">
                    <Typography>No Ideas Currently Available</Typography>
                    <AddOrUpdateModal {...{ type: AddOrUpdate.ADD }} />
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                </div>
            );
        }

        return (
            <TableRow>
                <TableCell>FF Idea</TableCell>
                <TableCell align="right">System</TableCell>
                <TableCell align="right">Beans</TableCell>
                <TableCell align="right">Difficulty</TableCell>
                <TableCell align="right">Assigned</TableCell>
                <TableCell align="right">Creator</TableCell>
                <TableCell align="right">Edit | Delete</TableCell>
            </TableRow>
        );
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <DisplayRows />
                </TableHead>
                <TableBody>
                    {rows.map((row: FFIdea) => (
                        <TableRow key={row.PK} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {row.PK}
                            </TableCell>
                            <TableCell align="right">{row.system}</TableCell>
                            <TableCell align="right">{row.beans}</TableCell>
                            <TableCell align="right">{row.difficulty}</TableCell>
                            <TableCell align="right">{row.assigned.toString()}</TableCell>
                            <TableCell align="right">{row.creator}</TableCell>
                            <TableCell align="right">
                                <EditOrDeleteButtons
                                    {...{
                                        type: AddOrUpdate.UPDATE,
                                        ffIdea: {
                                            name: row.PK,
                                            system: row.system,
                                            beans: row.beans,
                                            difficulty: row.difficulty,
                                            assigned: row.assigned,
                                            creator: row.creator,
                                        },
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default IdeaTable;
