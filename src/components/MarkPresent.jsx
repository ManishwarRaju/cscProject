import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { setAlertBox } from '../store';
import AlertComponent from './AlertComponent';
import axios from 'axios';

const MarkPresent = () => {
    const [rollNumber, setRollNumber] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name === "" || rollNumber === "") {
            dispatch(setAlertBox({
                title: "Empty Fields",
                message: "All the fields are required!",
                color: "orange",
                show: true
            }));
            return;
        }

        try {
            const response = await axios.post(
                "https://6xl19fbrec.execute-api.us-west-2.amazonaws.com/cscattendaceproject/add-student",
                {
                    name: name,
                    rollno: rollNumber
                }
            );

            if (response.status === 200) {
                dispatch(setAlertBox({
                    title: "Success",
                    message: "Student marked present successfully!",
                    color: "green",
                    show: true
                }));
                setName('');
                setRollNumber('');
            } else {
                dispatch(setAlertBox({
                    title: "Error",
                    message: "Unexpected response. Please try again.",
                    color: "red",
                    show: true
                }));
            }

        } catch (error) {
            console.error("Error adding student:", error);
            dispatch(setAlertBox({
                title: "Error",
                message: "Failed to add student. Please check your connection.",
                color: "red",
                show: true
            }));
        }
    };

    return (
        <>
            <AlertComponent />
            <div className="flex justify-center min-h-screen items-center flex-wrap">
                <div className="w-full max-w-xs">
                    <form
                        className="bg-white shadow-2xl shadow-purple-300 rounded px-8 pt-6 pb-8 mb-4"
                        method="POST"
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <h1 className='text-2xl font-bold mb-6 text-purple-400 text-center'>Enter Present Student Details</h1>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Student Full Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                placeholder="Student Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rollNumber">
                                Roll Number
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="rollNumber"
                                type="text"
                                placeholder="Enter Roll Number"
                                value={rollNumber}
                                onChange={(e) => setRollNumber(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Add Student
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default MarkPresent;
