import {
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { DisplayResults } from "./helper";

const useStyles = makeStyles({
  table: {
    maxWidth: 840,
    margin: "auto",
  },
});

const students = [
  { id: 1, name: "Mahasiswa 1" },
  { id: 2, name: "Mahasiswa 2" },
  { id: 3, name: "Mahasiswa 3" },
  { id: 4, name: "Mahasiswa 4" },
  { id: 5, name: "Mahasiswa 5" },
  { id: 6, name: "Mahasiswa 6" },
  { id: 7, name: "Mahasiswa 7" },
  { id: 8, name: "Mahasiswa 8" },
  { id: 9, name: "Mahasiswa 9" },
  { id: 10, name: "Mahasiswa 10" },
];

const subjects = [
  { id: 1, label: "Aspek penilaian 1" },
  { id: 2, label: "Aspek penilaian 2" },
  { id: 3, label: "Aspek penilaian 3" },
  { id: 4, label: "Aspek penilaian 4" },
];

const Main = () => {
  const classes = useStyles();
  const [formValue, setFormValue] = useState({});
  const [errValue, setErrorValue] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    let dynFormValue = {};
    let dynValidation = {};

    subjects.forEach((subject) => {
      const dynAs = `aspek_penilaian_${subject.id}`;
      students.forEach((student) => {
        if (!dynFormValue[dynAs]) {
          dynFormValue[dynAs] = {};
          dynValidation[dynAs] = {};
        }
        const dynStud = `mahasiswa_${student.id}`;
        dynFormValue[dynAs][dynStud] = "";
        dynValidation[dynAs][dynStud] = "";
      });
    });

    setErrorValue(dynValidation);
    setFormValue(dynFormValue);
  }, []);

  const handleChange = (subject, student, value) => {
    const dynAs = `aspek_penilaian_${subject.id}`;
    const dynStud = `mahasiswa_${student.id}`;
    const newFormValue = {
      ...formValue,
      [dynAs]: { ...formValue[dynAs], [dynStud]: value },
    };
    setIsSubmitted(false);
    setFormValue(newFormValue);
  };

  const handleSubmit = () => {
    let newErrVal = { ...errValue };
    let err = 0;
    subjects.forEach((subject) => {
      const dynAs = `aspek_penilaian_${subject.id}`;
      students.forEach((student) => {
        const dynStud = `mahasiswa_${student.id}`;
        if (!formValue[dynAs][dynStud]) {
          newErrVal = {
            ...newErrVal,
            [dynAs]: { ...newErrVal[dynAs], [dynStud]: "Harus diisi" },
          };
          err++;
        } else {
          newErrVal = {
            ...newErrVal,
            [dynAs]: { ...newErrVal[dynAs], [dynStud]: "" },
          };
        }
      });
    });
    setErrorValue(newErrVal);
    if (err === 0) {
      console.log(formValue);
      setIsSubmitted(true);
    }
  };

  return (
    <div style={{ marginTop: 60 }}>
      <h1 style={{ textAlign: "center" }}>Aplikasi Penilaian Mahasiswa</h1>
      <form>
        <TableContainer className={classes.table} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  Nama mahasiswa
                </TableCell>
                {subjects.map((subject) => {
                  return (
                    <TableCell
                      style={{ width: 124, fontWeight: "bold" }}
                      key={subject.id}
                      align="right"
                    >
                      {subject.label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell component="th" scope="row">
                    {student.name}
                  </TableCell>
                  {subjects.map((subject) => {
                    const dynAs = `aspek_penilaian_${subject.id}`;
                    const dynStud = `mahasiswa_${student.id}`;
                    return (
                      <TableCell key={subject.id} align="right">
                        <select
                          style={{
                            width: "100%",
                            padding: "4px 0px",
                            border:
                              errValue[dynAs] && errValue[dynAs][dynStud]
                                ? "1px solid red"
                                : "",
                            background: "white",
                          }}
                          name={`${dynAs}.${dynStud}`}
                          value={formValue[dynAs] && formValue[dynAs][dynStud]}
                          onChange={(e) =>
                            handleChange(
                              subject,
                              student,
                              parseInt(e.target.value)
                            )
                          }
                        >
                          <option value="">-</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                        {errValue[dynAs] && errValue[dynAs][dynStud] && (
                          <span style={{ color: "red" }}>
                            {errValue[dynAs][dynStud]}
                          </span>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div style={{ padding: "20px", textAlign: "right" }}>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Simpan
            </Button>
          </div>
        </TableContainer>
        {isSubmitted && <DisplayResults results={formValue} />}
      </form>
    </div>
  );
};

export default Main;
