import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const IdeaTable = () => {
    function createFFData(
        name: string,
        system: string,
        beans: string,
        difficulty: string,
        creator: string,
        assigned: boolean,
    ) {
        return { name, system, beans, difficulty, creator, assigned };
    }

    const rows = [
        createFFData('TestName1', 'TestSystem1', '4', 'Hard', 'TestCreator1', true),
        createFFData('TestName2', 'TestSystem2', '2', 'Easy', 'TestCreator2', false),
        createFFData('TestName3', 'TestSystem3', '2', 'Medium', 'TestCreator3', false),
        createFFData('TestName4', 'TestSystem4', '5', 'Hard', 'TestCreator4', true),
        createFFData('TestName5', 'TestSystem5', '8', 'Hard', 'TestCreator5', true),
    ];

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>FF Idea</TableCell>
                        <TableCell align="right">System</TableCell>
                        <TableCell align="right">Beans</TableCell>
                        <TableCell align="right">Difficulty</TableCell>
                        <TableCell align="right">Assigned</TableCell>
                        <TableCell align="right">Creator</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.system}</TableCell>
                            <TableCell align="right">{row.beans}</TableCell>
                            <TableCell align="right">{row.difficulty}</TableCell>
                            <TableCell align="right">{row.assigned.toString()}</TableCell>
                            <TableCell align="right">{row.creator}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default IdeaTable;
