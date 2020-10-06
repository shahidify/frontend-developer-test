import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { format } from "date-fns";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHeader: {
    fontWeight: '700',
  },
  sortableHeader: {
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  }
});

export const sortListData = (dataa, isAscOrder) => {
  if(dataa && dataa.length>0) {
    const sortedData = dataa.sort((a, b) =>
    isAscOrder
        ? a.timestamp > b.timestamp ? 1 : -1
        : a.timestamp > b.timestamp ? -1 : 1
    );
    return sortedData;
  }
};

export default function UserTable({ data }) {
  const [listData, setListData] = useState(data);
  const [isAsc, setIsAsc] = useState(true);
  const classes = useStyles();

  const handleSort = () => {
    isAsc ? setIsAsc(false) : setIsAsc(true);
  }

  useEffect(() => {
    if (data && data.length>0) {
      const sortedData = sortListData(data, isAsc);
      setListData(sortedData);
    }
  }, [data]);
  
  return (
    <TableContainer>
      <Table className={classes.table} data-testid="table" aria-label="Users table">
        <TableHead>
          <TableRow>
            <TableCell data-testid="header-sort" className={classes.sortableHeader} onClick={handleSort} >
              Date
              {isAsc ? (
                <KeyboardArrowUp color="primary" />
              ) : (
                <KeyboardArrowDown color="secondary" />
              )}
            </TableCell>
            <TableCell align="left" className={classes.tableHeader}>User ID</TableCell>
            <TableCell align="left" className={classes.tableHeader}>Old value</TableCell>
            <TableCell align="left" className={classes.tableHeader}>New value</TableCell>
          </TableRow>
        </TableHead>
        {<RenderBody data={listData} order={isAsc} />}
      </Table>
    </TableContainer>
  );
}

export const RenderBody = ({data = [], order}) => {
  if(!data.length) return null;
  const sortedData = sortListData(data, order);
  return (
    <TableBody>
      {sortedData.map((row) => (
          <TableRow key={row.id} data-testid="table-row" className="list-row" >
            <TableCell data-testid="cell-date" align="left">
              {format(new Date(row.timestamp), "yyyy-MM-dd")}
            </TableCell>
            <TableCell data-testid="cell-id" align="left">{row.id}</TableCell>
            <TableCell data-testid="cell-oldvalue" align="left">{row.diff[0].oldValue}</TableCell>
            <TableCell data-testid="cell-newvalue" align="left">{row.diff[0].newValue}</TableCell>
          </TableRow>
        ))}
    </TableBody>
  )
}
