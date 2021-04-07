import React, { useMemo, useEffect, useState } from "react";
import { useTable, usePagination } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";
import "./BanTable.css";
import IconButton from "@material-ui/core/IconButton";

import { Button } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import ReactPaginate from "react-paginate";

export const BanTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/User")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log("err", err));
  }, []);

  const columns = useMemo(() => COLUMNS, []);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const handleBan = async (data) => {
    console.log(data);
    await axios.post("http://localhost:4000/Admin/ban", data).then((res) => {
      console.log(res);
    });
    axios
      .get("http://localhost:4000/User")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log("err", err));
  };

  const deleteUser = async (data) => {
    await axios
      .delete("http://localhost:4000/user/account", {
        data: {
          id: data._id,
        },
      })
      .then((res) => {
      })
      .catch((err) => console.log("err", err));
    axios
      .get("http://localhost:4000/User")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log("err", err));
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  const { pageIndex } = state;

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            const status = row.values.banStatus;
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.Header === "Ban/Delete" && status === true) {
                    return (
                      <td>
                        <Button
                          variant="contained"
                          style={{
                            padding: "0px",
                            fontSize: "11px",
                            color: "white",
                            backgroundColor: "#43BD48",
                            marginRight: "8px",
                            marginBottom: "0px",
                          }}
                          onClick={() => handleBan(row.original)}
                        >
                          Unban
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{
                            padding: "0px",
                            fontSize: "11px",
                            width: "5px",
                            marginBottom: "0px",
                          }}
                          disabled
                        >
                          Ban
                        </Button>
                        <IconButton
                          aria-label="delete"
                          style={{
                            height: "40px",
                            width: "40px",
                          }}
                        >
                          <CancelIcon
                            onClick={() => deleteUser(row.original)}
                          />
                        </IconButton>
                      </td>
                    );
                  } else if (
                    cell.column.Header === "Ban/Delete" &&
                    status === false
                  ) {
                    return (
                      <td>
                        <Button
                          variant="contained"
                          style={{
                            padding: "0px",
                            fontSize: "11px",
                            marginRight: "8px",
                            marginBottom: "0px",
                          }}
                          disabled
                        >
                          Unban
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{
                            padding: "0px",
                            fontSize: "11px",
                            backgroundColor: "#C53030",
                            width: "5px",
                            marginBottom: "0px",
                          }}
                          onClick={() => handleBan(row.original)}
                        >
                          Ban
                        </Button>
                        <IconButton
                          aria-label="delete"
                          style={{
                            height: "40px",
                            width: "40px",
                          }}
                        >
                          <CancelIcon
                            onClick={() => deleteUser(row.original)}
                          />
                        </IconButton>
                      </td>
                    );
                  } else {
                    if (cell.value === true) {
                      return (
                        <td
                          style={{
                            paddingTop: "20px",
                          }}
                        >
                          <h4>Banned</h4>
                        </td>
                      );
                    } else if (cell.value === false) {
                      return (
                        <td
                          style={{
                            paddingTop: "20px",
                          }}
                        >
                          <h4>Normal</h4>
                        </td>
                      );
                    } else {
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            paddingTop: "20px",
                          }}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    }
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        className={"pagination"}
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          display: "tableCell",
          verticalAlign: "middle",
        }}
      >
        <span
          style={{
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Page {pageIndex + 1} of {pageOptions.length}{" "}
        </span>
        <span>
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value ? e.target.value - 1 : 0;
              gotoPage(pageNumber);
            }}
            style={{
              width: "50px",
              height: "20px",
              marginLeft: "5px",
            }}
          />
        </span>
        <Button
          style={{ marginLeft: "10px", height: "20px" }}
          variant="contained"
          size="small"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {" "}
          {"<<"}
        </Button>

        <Button
          style={{ marginLeft: "10px", height: "20px" }}
          variant="contained"
          size="small"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </Button>
        <Button
          style={{ marginLeft: "10px", height: "20px" }}
          variant="contained"
          size="small"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </Button>
        <Button
          style={{ marginLeft: "10px", height: "20px" }}
          variant="contained"
          size="small"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {" "}
          {">>"}
        </Button>
      </div>
    </>
  );
};
