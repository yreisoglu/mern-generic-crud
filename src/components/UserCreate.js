import React from "react";
import { useState, useEffect } from "react";
import '../UserCreate.css';
import { UserSave } from '../methods/UserSave';
import { GetUserById } from "../methods/GetUsers";

const UserCreate = () => {
    const [data, setData] = useState({
        name: "",
        surname: "",
        email: "",
        image: "",
        firstJobDay: "",
        totalWorkTime: "",
        university: "",
        graduationTime: "",
        previousJob: "",
        skills: "",
        description: "",
    });

    const [DataErrors, setDataErrors] = useState({});

    const [SubmitControl, setSubmitControl] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setDataErrors(validate(data));
        setSubmitControl(true);
        UserSave(data);
    }

    useEffect(() => {
        console.log(DataErrors);
        if (Object.keys(DataErrors).length === 0 && SubmitControl) {
            console.log(data);
        }
    }, [DataErrors]);

    const validate = (data) => {
        const errors = {};
        if (!data.name) {
            errors.name = "Name is required.";
        }
        if (!data.surname) {
            errors.surname = "Surname is required.";
        }
        if (!data.email) {
            errors.email = "Email is required.";
        }
        if (!data.image) {
            errors.image = "Image is required.";
        }
        if (!data.firstJobDay) {
            errors.firstJobDay = "First job day is required.";
        }
        if (!data.totalWorkTime) {
            errors.totalWorkTime = "Total work time is required.";
        }
        if (!data.university) {
            errors.university = "University is required.";
        }
        if (!data.graduationTime) {
            errors.graduationTime = "Graduation time is required.";
        }
        if (!data.previousJob) {
            errors.previousJob = "Previous job is required.";
        }
        if (!data.skills) {
            errors.skills = "Skills is required.";
        }
        if (!data.description < 30) {
            errors.description = "Description must be a min(30) characters.";
        }
        return errors;
    };

    return (
        <div className="container">
            <div className="form-body">
                <div className="row">
                    <div className="form-holder">
                        <div className="form-content">
                            <div className="form-items">
                                <h3>Welcome</h3>
                                <p>TELL US ABOUT YOURSELF</p>
                                {Object.keys(DataErrors).length === 0 && SubmitControl ? (<div className="ui message success"> Succesfully </div>) : (<div className="ui message danger"> Missing or incorrect information </div>)}
                                <form onSubmit={handleSubmit} className="requires-validation" novalidate>
                                    <div className="row">
                                        <div className="form-group col-md-4">
                                            <label for="name">Name</label>
                                            <input type="text" className="form-control" id="name" placeholder="Name" onChange={(e) => setData({ ...data, name: e.target.value })} />
                                            <p style={{ color: "red" }} className="mt-2">
                                                {DataErrors.name}
                                            </p>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label for="Surname">Surname</label>
                                            <input type="text" className="form-control" id="name" placeholder="Surname" onChange={(e) => setData({ ...data, surname: e.target.value })} />
                                            <p style={{ color: "red" }} className="mt-2">
                                                {DataErrors.surname}
                                            </p>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label for="email">Email</label>
                                            <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={(e) => setData({ ...data, email: e.target.value })} />
                                            <p style={{ color: "red" }} className="mt-2">
                                                {DataErrors.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group mt-2 col-md-6">
                                            <div className="form-group">
                                                <label className="mb-3" for="file">Photo</label>
                                                <input type="file" className="form-control" id="file" onChange={(e) => setData({ ...data, image: e.target.value })} />
                                                <p style={{ color: "red" }} className="mt-2">
                                                    {DataErrors.image}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="form-group mt-2 col-md-3">
                                            <label className="mb-3" for="FirstJobDay">First Job Day</label>
                                            <div className="form-group">
                                                <input type="date" className="form-control" id="FirstJobDay" onChange={(e) => setData({ ...data, firstJobDay: e.target.value })} />
                                                <p style={{ color: "red" }} className="mt-2">
                                                    {DataErrors.firstJobDay}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="form-group mt-1 col-md-3">
                                            <div className="form-group">
                                                <label for="TotalWorkTime">Total Work Time</label>
                                                <input type="text" className="form-control" id="TotalWorkTime" placeholder="1 month 2 year" onChange={(e) => setData({ ...data, totalWorkTime: e.target.value })} />
                                                <p style={{ color: "red" }} className="mt-2">
                                                    {DataErrors.totalWorkTime}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group mt-1 col-md-9">
                                            <div className="form-group">
                                                <label for="university">University</label>
                                                <input type="text" className="form-control" id="university" placeholder="Corban University" onChange={(e) => setData({ ...data, university: e.target.value })} />
                                                <p style={{ color: "red" }} className="mt-2">
                                                    {DataErrors.university}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="form-group mt-2 col-md-3">
                                            <label className="mb-3" for="GraduationTime">Graduation Time</label>
                                            <div className="form-group">
                                                <input type="date" className="form-control" id="GraduationTime" onChange={(e) => setData({ ...data, graduationTime: e.target.value })} />
                                                <p style={{ color: "red" }} className="mt-2">
                                                    {DataErrors.graduationTime}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group mt-1 col-md-12">
                                            <label for="PreviousJob">Previous Job</label>
                                            <input type="text" className="form-control" id="PreviousJob" placeholder="Corporate consulting" onChange={(e) => setData({ ...data, previousJob: e.target.value })} />
                                            <p style={{ color: "red" }} className="mt-2">
                                                {DataErrors.previousJob}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group mt-1 col-md-6">
                                            <label for="Skills">Skills</label>
                                            <textarea className="form-control" id="Skills" rows="1" onChange={(e) => setData({ ...data, skills: e.target.value })}></textarea>
                                            <p style={{ color: "red" }} className="mt-2">
                                                {DataErrors.skills}
                                            </p>
                                        </div>
                                        <div className="form-group mt-1 col-md-6">
                                            <label for="Description">About us</label>
                                            <textarea className="form-control" id="description" rows="1" onChange={(e) => setData({ ...data, description: e.target.value })}></textarea>
                                            <p style={{ color: "red" }} className="mt-2">
                                                {DataErrors.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="form-button mt-3">
                                        <button id="submit" type="submit" class="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCreate;