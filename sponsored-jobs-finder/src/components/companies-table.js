import React from "react";
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../scss/companies-table.scss';

export const CompaniesTable = ({markers, onRowClicked}) => {
    return (
        <div className={'companies-list'}>
            <h3>Total results found: {markers.size}</h3>
            <TableContainer component={Paper} className={'container'}>
                    <Table className={'table'} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Company Name</TableCell>
                                <TableCell>Town</TableCell>
                                <TableCell>Date Added</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {markers.map((data, index) => {
                                const anchor = [data.get('lat'), data.get('lng')];
                                return (
                                    <TableRow className={'table--row'} key={index} onClick={() => onRowClicked(anchor)}>
                                        <TableCell>{data.get('organisation_name')}</TableCell>
                                        <TableCell>{data.get('town')}</TableCell>
                                        <TableCell>{data.get('date_added')}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
        </div>
    );
};

CompaniesTable.propTypes = {
    markers: PropTypes.object.isRequired,
    onRowClicked: PropTypes.func.isRequired
};

