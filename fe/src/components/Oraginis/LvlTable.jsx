import {
    Box,
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel
} from '@mui/material';
import { useState } from 'react';

const LvlTable = ({ data = [], scrollHeight, pagination ,rowPerpageOption = [5,10,20],selected ,onRowClick,sort,columnStyles }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const isSelected = (row) => selectedRows.indexOf(row) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const sortedData = sort
    ? data.slice().sort((a, b) => {
        if (orderBy === '') return 0;
        if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
        if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
        return 0;
      })
    : data;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // hàm xử lý sự kiện rowclick
  const handleRowClick = (row) => {
    // kiểm tra kiểu chọn là multiple hay single
    // nếu là multiple thực hiện logic để chọn hoặc bỏ chọn nhiều hàng.
    if (selected === 'multiple') {
      //Tìm vị trí của hàng hiện tại
      const selectedIndex = selectedRows.indexOf(row);
      let newSelected = [];
      
      // Nếu hàng chưa được chọn. Thêm hàng hiện tại vào mảng
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selectedRows, row);
      } 
      // Nếu hàng là phần tử đầu tiên trong mảng. Bỏ hàng đầu tiên và giữ lại các hàng khác
      else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selectedRows.slice(1));
      } 
      // Nếu hàng là phần tử cuối cùng trong mảng. Bỏ hàng cuối cùng và giữ lại các hàng khác
      else if (selectedIndex === selectedRows.length - 1) {
        newSelected = newSelected.concat(selectedRows.slice(0, -1));
      } 
      // Nếu hàng nằm ở vị trí giữa mảng.Bỏ hàng ở vị trí selectedIndex và giữ lại các hàng khác.
      else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selectedRows.slice(0, selectedIndex),
          selectedRows.slice(selectedIndex + 1),
        );
      }
      //Cập nhật trạng thái selectedRows
      setSelectedRows(newSelected);
      // nếu là single thực hiện logic để chọn một hàng duy nhất.
    } else if (selected === 'single') {
      setSelectedRows([row]);
    }
    //Gọi callback onRowClick nếu được cung cấp
    if (onRowClick) {
      onRowClick(row);
    }
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper} style={{ maxHeight: scrollHeight }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
           {
                data.length > 0 ? 

                <TableCell padding="checkbox" style={columnStyles && columnStyles['checkbox'] ? columnStyles['checkbox'] : {}}>
                    <Checkbox
                    indeterminate={
                        selectedRows.length > 0 && selectedRows.length < data.length
                    }
                    checked={data.length > 0 && selectedRows.length === data.length}
                    onChange={(event) => {
                        if (event.target.checked) {
                        setSelectedRows(data);
                        } else {
                        setSelectedRows([]);
                        }
                    }}
                    />
              </TableCell>
              : <></>
           }
            {
            data.length > 0 ? 
            Object.keys(data[0]).map((key) => (
                <TableCell
                  key={key}
                  sortDirection={orderBy === key ? order : false}
                  style={columnStyles && columnStyles[key] ? columnStyles[key] : {}}
                >
                  {sort ? (
                    <TableSortLabel
                      active={orderBy === key}
                      direction={orderBy === key ? order : 'asc'}
                      onClick={() => handleRequestSort(key)}
                    >
                      {key}
                    </TableSortLabel>
                  ) : (
                    key
                  )
            }
                </TableCell>
            ))  : <></>}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              const isItemSelected = isSelected(row);
              return (
                <TableRow
                  key={index}
                  onClick={() => handleRowClick(row)}
                  selected={isItemSelected}
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  style={{
                    backgroundColor: isItemSelected ? 'lightblue' : 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  <TableCell padding="checkbox" style={columnStyles && columnStyles['checkbox'] ? columnStyles['checkbox'] : {}}>
                    <Checkbox checked={isItemSelected} />
                  </TableCell>
                  {Object.values(row).map((value, idx) => (
                    <TableCell key={idx} style={columnStyles && columnStyles[Object.keys(row)[idx]] ? columnStyles[Object.keys(row)[idx]] : {}}>{value}</TableCell>
                  ))}
                </TableRow>
              );
            })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={data.length > 0  ? Object.keys(data[0]).length + 1 : 0} />
            </TableRow>
          )}
        </TableBody>
        {
         pagination && data.length > 0 ? 
            <TableFooter>
            <TableRow>
                <TableCell colSpan={data.length > 0  ? Object.keys(data[0]).length + 1 : 0}>
                <Box display="flex" justifyContent="flex-end">
                    <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    component="div"
                    />
                </Box>
                </TableCell>
            </TableRow>
            </TableFooter>
        : <></>
        }
      </Table>
    </TableContainer>
  );
};

export default LvlTable;