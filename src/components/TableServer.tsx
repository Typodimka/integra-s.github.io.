import React, { useState  } from 'react';
import {
    Table,
    TableContainer,
    TableBody, TextField,
} from '@material-ui/core';
import {IServer} from '../types/types';
import {useServer} from '../hooks/api'
import Modal from "./TableComponents/Modal/modal";
import TableHeader from "./TableComponents/TableHeader/TableHeader";
import TableRowServer from "./TableComponents/TableRow/TableRowServer";

const TableServer: React.FC = () => {

    //Получения данных с функции БД
    const {data} = useServer()

    const [sortBy, setSortBy] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [selectedRow, setSelectedRow] = useState<IServer | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');



    //Фунция закрытия модального окна
    const handleCloseModal = () => {
        setSelectedRow(null);
    };




    const handleSort = (column: string) => {
        if (column === sortBy) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortDirection('asc');
        }
    };

    //Фильтрация
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = data.filter((row) => {
        // Фильтрацию по каждому столбцу
        return (
            row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.ipAddressServer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.regFile.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.os.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.timeStart.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.version.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    //Функция сортировки столбцов
    const sortedData = [...filteredData].sort((a, b) => {
        if (sortBy) {
            const sortOrder = sortDirection === 'asc' ? 1 : -1;
            return a[sortBy] > b[sortBy] ? sortOrder : -sortOrder;
        }
        return 0;
    });


    return (
        <>
            <div style ={{display: 'flex', marginTop: '10px', justifyContent: "space-between"}}>
                <h3>Статус Клиента</h3>

                <TextField
                    label="Поиск по серверам"
                    value={searchQuery}
                    onChange={handleSearch}
                    style={{ marginBottom: "20px", marginLeft: '200px' }}
                />
            </div>
            <TableContainer style={{ maxHeight: '350px', overflow: 'auto'}}>
                <Table stickyHeader aria-label="sticky table" style={{ border: '1px solid #C0C0C0' }}>
                    <TableHeader sortBy={sortBy} sortDirection={sortDirection} handleSort={handleSort} table = {'server'} />

                    <TableBody>
                        {sortedData.map((row, index) => (
                            <TableRowServer
                                row={row}
                                index={index}
                                setSelectedRow={setSelectedRow}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal selectedRow={selectedRow} handleCloseModal={handleCloseModal}  />

        </>
    );
};

export default TableServer;