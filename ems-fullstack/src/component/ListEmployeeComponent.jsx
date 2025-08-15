import React, { useState, useEffect } from 'react';
import { listEmployees, deleteEmployee } from '../service/EmployeeService.js';
import { useNavigate } from 'react-router-dom';

function ListEmployeeComponent() {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        getAllEmployee();
    }, []);

    function getAllEmployee() {
        listEmployees()
            .then((response) => {
                setEmployee(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function addNewEmployee() {
        navigate('/add-employee');
    }

    function updatehandler(id) {
        navigate(`/update-employee/${id}`);
    }

    function deletehandler(id) {
        deleteEmployee(id)
            .then(() => {
                getAllEmployee();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="text-primary">Employee List</h3>
                <button className="btn btn-success" onClick={addNewEmployee}>
                    ➕ Add Employee
                </button>
            </div>

            <table className="table table-striped table-hover table-bordered shadow-sm">
                <thead className="table-dark">
                    <tr className="text-center">
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employee.length > 0 ? (
                        employee.map((item) => (
                            <tr key={item.id} className="text-center">
                                <td>{item.id}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.email}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => updatehandler(item.id)}
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deletehandler(item.id)}
                                    >
                                        🗑 Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center text-muted">
                                No employees found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListEmployeeComponent;
