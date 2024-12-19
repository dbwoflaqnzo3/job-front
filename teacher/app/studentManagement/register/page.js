'use client'

import React, { useState } from 'react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        birthDate: '',
        sex: '',
        phoneNumber: '',
        parentNumbers: [''],
        email: '',
        parentEmails: [''],
        userId: '',
        password: '',
        teacherId: '',
        grade: '',
        level: '',
        status: 'Active',
    });

    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleArrayInputChange = (index, e, key) => {
        const { value } = e.target;
        setFormData((prevData) => {
            const updatedArray = [...prevData[key]];
            updatedArray[index] = value;
            return { ...prevData, [key]: updatedArray };
        });
    };

    const addArrayField = (key) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: [...prevData[key], ''],
        }));
    };

    const removeArrayField = (key, index) => {
        setFormData((prevData) => {
            const updatedArray = [...prevData[key]];
            updatedArray.splice(index, 1);
            return { ...prevData, [key]: updatedArray };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/student/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Registration successful!');
            } else {
                const result = await response.json();
                setError(result.message || 'Registration failed.');
            }
        } catch (err) {
            setError('Error connecting to the server.');
        }
    };

    return (
        <div>
            <h1>Register</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Birth Date:</label>
                    <input type="date" name="birthDate" value={formData.birthDate} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Sex:</label>
                    <select name="sex" value={formData.sex} onChange={handleInputChange} required>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Parent Phone Numbers:</label>
                    {formData.parentNumbers.map((num, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={num}
                                onChange={(e) => handleArrayInputChange(index, e, 'parentNumbers')}
                                required
                            />
                            {index > 0 && <button type="button" onClick={() => removeArrayField('parentNumbers', index)}>Remove</button>}
                        </div>
                    ))}
                    <button type="button" onClick={() => addArrayField('parentNumbers')}>Add Parent Number</button>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Parent Emails:</label>
                    {formData.parentEmails.map((email, index) => (
                        <div key={index}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => handleArrayInputChange(index, e, 'parentEmails')}
                                required
                            />
                            {index > 0 && <button type="button" onClick={() => removeArrayField('parentEmails', index)}>Remove</button>}
                        </div>
                    ))}
                    <button type="button" onClick={() => addArrayField('parentEmails')}>Add Parent Email</button>
                </div>
                <div>
                    <label>User ID:</label>
                    <input type="text" name="userId" value={formData.userId} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Teacher ID:</label>
                    <input type="text" name="teacherId" value={formData.teacherId} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Grade:</label>
                    <input type="number" name="grade" value={formData.grade} onChange={handleInputChange} min="1" max="12" />
                </div>
                <div>
                    <label>Level:</label>
                    <select name="level" value={formData.level} onChange={handleInputChange}>
                        <option value="">Select</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>
                <div>
                    <label>Status:</label>
                    <select name="status" value={formData.status} onChange={handleInputChange}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Graduated">Graduated</option>
                    </select>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
