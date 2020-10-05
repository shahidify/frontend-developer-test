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
  link: {
    cursor: 'pointer'
  }
});

const sortListData = (dataa, isAscOrder) => {
  debugger;
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
      debugger;
      const sortedData = sortListData(data, isAsc);
      setListData(sortedData);
    }
  }, [data]);
  
  // useEffect(() => {
  //   if(listData.length>0) {
  //     debugger;
  //     const sortedData = sortListData(listData, isAsc);
  //     setListData(sortedData);
  //   } 
  // }, [isAsc])

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeader, classes.link} onClick={handleSort} >
              Date
              {isAsc ? (
                <KeyboardArrowUp color="primary" />
              ) : (
                <KeyboardArrowDown color="secondary" />
              )}
            </TableCell>
            <TableCell align="left">User ID</TableCell>
            <TableCell align="left">Old value</TableCell>
            <TableCell align="left">New value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {<RenderBody data={listData} order={isAsc} />}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const RenderBody = ({data = [], order}) => {
  if(!data.length) return null;
  const sortedData = sortListData(data, order);
  return (
    sortedData.map((row) => (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            {format(new Date(row.timestamp), "yyyy-MM-dd")}
          </TableCell>
          <TableCell align="left">{row.id}</TableCell>

          <TableCell align="left">{row.diff[0].oldValue}</TableCell>
          <TableCell align="left">{row.diff[0].newValue}</TableCell>
        </TableRow>
      ))
  )
}
