
import '../style/employeeform.css';
import React, { useState, useEffect } from 'react';
import { savedEmployee, updateDataEmployee, editEmployee } from '../service/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            editEmployee(id).then((response) => {
                setEmployee(response.data);
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id) {
            updateDataEmployee(id, employee).then(() => {
                navigate('/employees');
            }).catch((error) => {
                console.error(error);
            });
        } else {
            savedEmployee(employee).then(() => {
                navigate('/employees');
            }).catch((error) => {
                console.error(error);
            });
        }
    };

    return (
        <div className="employee-form-container">
            <h2>{id ? 'Update Employee' : 'Add Employee'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={employee.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={employee.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn-submit">
                    {id ? 'Update' : 'Save'}
                </button>
            </form>
        </div>
    );
};

export default EmployeeComponent;

