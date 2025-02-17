// Libraries
import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { TUser } from "@my-monorepo/lib";
import dayjs from "dayjs";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { isNumber } from "lodash";

// Constants
import { DATE_FORMAT } from "@/constants";

// Stores
import { useUserTable } from "./hooks";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number | string, record: TUser) => React.ReactNode;
}

export const UserTable: React.FC = React.memo(() => {
  const {
    loading,
    rows,
    totalRows,
    state,
    onCancel,
    onChangeField,
    onChangePage,
    onChangeRowsPerPage,
    onEdit,
    onSave,
  } = useUserTable();

  const columns: Column[] = [
    {
      id: "actions",
      label: "Actions",
      minWidth: 170,
      format: (_, record) => {
        const isEditing = state.editingRowId === record.id;
        return (
          <div>
            {isEditing ? (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className="w-fit mb-2"
                  onClick={() => onSave(record.id)}
                  sx={{ mr: 1, mb: 1 }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  className="w-fit"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                variant="text"
                color="secondary"
                onClick={() => onEdit(record)}
              >
                Edit
              </Button>
            )}
          </div>
        );
      },
    },
    { id: "id", label: "ID", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 170 },
    {
      id: "name",
      label: "Name",
      minWidth: 100,
      format: (value: string, record) => {
        const isEditing = state.editingRowId === record.id;
        return isEditing ? (
          <TextField
            variant="outlined"
            size="small"
            value={state.editValues.name ?? ""}
            onChange={(e) => onChangeField("name", e.target.value)}
          />
        ) : (
          value
        );
      },
    },
    {
      id: "totalAverageWeightRatings",
      label: "Total Average Weight Ratings",
      minWidth: 250,
      format: (value, record) => {
        const isEditing = state.editingRowId === record.id;
        return isEditing ? (
          <TextField
            variant="outlined"
            size="small"
            type="number"
            value={state.editValues.totalAverageWeightRatings ?? ""}
            onChange={(e) => {
              const value = isNaN(parseInt(e.target.value))
                ? 0
                : parseInt(e.target.value);
              onChangeField("totalAverageWeightRatings", value);
            }}
          />
        ) : isNumber(value) ? (
          value.toFixed(2)
        ) : (
          "-"
        );
      },
    },
    {
      id: "numberOfRents",
      label: "Number of Rents",
      minWidth: 200,
      format: (value, record) => {
        const isEditing = state.editingRowId === record.id;
        return isEditing ? (
          <TextField
            variant="outlined"
            size="small"
            type="number"
            value={state.editValues.numberOfRents ?? ""}
            onChange={(e) => {
              const value = isNaN(parseInt(e.target.value))
                ? 0
                : parseInt(e.target.value);
              onChangeField("numberOfRents", value);
            }}
          />
        ) : isNumber(value) ? (
          value.toFixed(2)
        ) : (
          "-"
        );
      },
    },
    {
      id: "recentlyActive",
      label: "Recently Active",
      minWidth: 170,
      format: (value: string) => {
        if (!value || isNumber(value)) return "-";
        const d = dayjs(value);
        if (d.isValid()) {
          return d.format(DATE_FORMAT.FULL_DATE);
        }
        return "-";
      },
    },
    {
      id: "updatedAt",
      label: "Updated At",
      minWidth: 170,
      align: "right",
      format: (value: string) => {
        const d = dayjs(value);
        if (d.isValid()) {
          return d.format(DATE_FORMAT.FULL_DATE);
        }
        return "-";
      },
    },
    {
      id: "createdAt",
      label: "Created At",
      minWidth: 170,
      align: "right",
      format: (value: string) => {
        const d = dayjs(value);
        if (d.isValid()) {
          return d.format(DATE_FORMAT.FULL_DATE);
        }
        return "-";
      },
    },
  ];

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            className="w-full h-full"
            height={200}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column?.format?.(value, row) || value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50, 100]}
        component="div"
        count={totalRows}
        rowsPerPage={state.pageSize}
        page={state.page}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
      />
    </Paper>
  );
});

UserTable.displayName = "UserTable";
