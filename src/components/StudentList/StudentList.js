import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStudents,
  deleteStudent,
  updateStudent,
} from "../../store/studentSlice";

import styled from "styled-components";

const DivContainer = styled.div`
  display: Flex;
  flex-direction: column;
  width: 45%;
  background: #262649;
`;

const TitleHeader = styled.h3`
  text-align: center;
  color: green;
  margin: 15px;
`;

const Table = styled.table`
`

const TableHeader = styled.thead`
  border-bottom: 1px solid #d0caca;
  border-top: 1px solid #d0caca;
`;

const TableHeaderCell = styled.th`
  padding: 15px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px;

  text-align: center;
`;
const Button = styled.button`
  padding: 5px;
  border-radius: 10px;
  margin: 2px;
`;

const UpdateStudentForm = styled.div`
  display: flex;
  margin: 0 10px;
`;
const Input = styled.input`
  width: 60%;
`;

function StudentList() {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);
  const [updatedStudent, setUpdatedStudent] = useState(null); // Initialize with null

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleDelete = (student) => {
    dispatch(deleteStudent(student._id));
  };

  const handleUpdate = (student) => {
    setUpdatedStudent(student);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudent({ ...updatedStudent, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(
      updateStudent({
        studentId: updatedStudent._id,
        studentData: updatedStudent,
      })
    );
    setUpdatedStudent(null); // Reset updatedStudent after submission
  };

  const handleCancel = () => {
    setUpdatedStudent(null);
  };

  function formatDateOfBirth(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  

  return (
    <DivContainer>
      <TitleHeader>Student List</TitleHeader>
      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell>First Name</TableHeaderCell>
            <TableHeaderCell>Last Name</TableHeaderCell>
            <TableHeaderCell>Birthdate</TableHeaderCell>
            <TableHeaderCell>Major</TableHeaderCell>
            <TableHeaderCell>Current Year</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </tr>
        </TableHeader>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <TableCell>{student.firstName}</TableCell>
              <TableCell>{student.lastName}</TableCell>
              <TableCell>{formatDateOfBirth(student.dateOfBirth)}</TableCell>
              <TableCell>{student.major}</TableCell>
              <TableCell>{student.currentYear}</TableCell>
              <TableCell>
              <Button onClick={() => handleUpdate(student)}>Update</Button>
                <Button onClick={() => handleDelete(student)}>Delete</Button>
              </TableCell>
              
            </tr>
          ))}
        </tbody>
      </Table>

      {updatedStudent && (
        <UpdateStudentForm>
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={updatedStudent.firstName}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={updatedStudent.lastName}
            onChange={handleChange}
          />
          <Input
            type="date"
            name="dateOfBirth"
            placeholder="Birthdate"
            value={updatedStudent.dateOfBirth}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="major"
            placeholder="Major"
            value={updatedStudent.major}
            onChange={handleChange}
          />
          <select
            id="currentYear"
            name="currentYear"
            value={updatedStudent.currentYear}
            onChange={handleChange}
          >
            <option value="">Select Year</option>
            <option value="Freshman">Freshman</option>
            <option value="Sophomore">Sophomore</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
          </select>

          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </UpdateStudentForm>
      )}
    </DivContainer>
  );
}

export default StudentList;
