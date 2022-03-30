import React, { useState } from "react";
import '../UserCreate.css';
import { UserSave } from '../methods/UserSave';
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserCreate = () => {

    const [fileName, setFileName] = useState("");

    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            email: "",
            // fileName: "",
            firstJobDay: "",
            totalWorkTime: "",
            university: "",
            graduationTime: "",
            previousJob: "",
            skills: "",
            description: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            surname: Yup.string().required(),
            email: Yup.string().email("Invalid email address").required(),
            // fileName: Yup.string().required(),
            firstJobDay: Yup.date().required(),
            totalWorkTime: Yup.string().required(),
            university: Yup.string().required(),
            graduationTime: Yup.date().required(),
            previousJob: Yup.string().required(),
            skills: Yup.string().min(50, "Skills must be at least 50 characters").required(),
            description: Yup.string().min(150, "Description must be at least 150 characters").required(),
        }),
        onSubmit: (values) => {
            var form_data = new FormData();

            for ( var key in values ) {
                form_data.append(key, values[key]);
            }
            
            form_data.append("file",fileName);
            UserSave(form_data);
        }
    });

    return (
        <div className="container">
            <div className="form-body">
                <div className="row">
                    <div className="form-holder">
                        <div className="form-content">
                            <div className="form-items">
                                <div className="row">
                                    <div className="form-group col-md-9">
                                        <h3>Welcome</h3>
                                        <p>TELL US ABOUT YOURSELF</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }} className="form-group col-md-3">
                                        <Link to="/login" class="btn btn-primary">
                                            Admin Panel
                                        </Link>
                                    </div>
                                </div>
                                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                                    <div className="row">
                                        <div className="form-group col-md-4">
                                            <label for="name">Name</label>
                                            <input type="text" className="form-control" id="name" onBlur={formik.handleBlur} placeholder="Name" onChange={formik.handleChange} />
                                            {formik.touched.name && formik.errors.name ? <p className="formikValidate">{formik.errors.name}</p> : null}
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label for="Surname">Surname</label>
                                            <input type="text" className="form-control" id="surname" onBlur={formik.handleBlur} placeholder="Surname" name="surname" onChange={formik.handleChange} />
                                            {formik.touched.surname && formik.errors.surname ? <p className="formikValidate">{formik.errors.surname}</p> : null}
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label for="email">Email</label>
                                            <input type="email" className="form-control" id="email" onBlur={formik.handleBlur} name="email" placeholder="name@example.com" onChange={formik.handleChange} value={formik.values.email} />
                                            {formik.touched.email && formik.errors.email ? <p className="formikValidate">{formik.errors.email}</p> : null}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group mt-2 col-md-6">
                                            <div className="form-group">
                                                <label className="mb-3" for="file">Photo</label>
                                                <input type="file" className="form-control" id="file" onBlur={formik.handleBlur} onChange={(e)=> {setFileName(e.target.files[0])}} />
                                            </div>
                                        </div>
                                        <div className="form-group mt-2 col-md-3">
                                            <label className="mb-3" for="FirstJobDay">First Job Day</label>
                                            <div className="form-group">
                                                <input type="date" className="form-control" id="FirstJobDay" onBlur={formik.handleBlur} name="firstJobDay" onChange={formik.handleChange} value={formik.values.firstJobDay} />
                                                {formik.touched.firstJobDay && formik.errors.firstJobDay ? <p className="formikValidate">{formik.errors.firstJobDay}</p> : null}
                                            </div>
                                        </div>
                                        <div className="form-group mt-1 col-md-3">
                                            <div className="form-group">
                                                <label for="TotalWorkTime">Total Work Time</label>
                                                <input type="text" className="form-control" id="TotalWorkTime" onBlur={formik.handleBlur} name="totalWorkTime" placeholder="1 month 2 year" onChange={formik.handleChange} value={formik.values.totalWorkTime} />
                                                {formik.touched.totalWorkTime && formik.errors.totalWorkTime ? <p className="formikValidate">{formik.errors.totalWorkTime}</p> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group mt-1 col-md-9">
                                            <div className="form-group">
                                                <label for="university">University</label>
                                                <input type="text" className="form-control" onBlur={formik.handleBlur} id="university" placeholder="Corban University" name="university" onChange={formik.handleChange} value={formik.values.university} />
                                                {formik.touched.university && formik.errors.university ? <p className="formikValidate">{formik.errors.university}</p> : null}
                                            </div>
                                        </div>
                                        <div className="form-group mt-2 col-md-3">
                                            <label className="mb-3" for="GraduationTime">Graduation Time</label>
                                            <div className="form-group">
                                                <input type="date" className="form-control" id="GraduationTime" onBlur={formik.handleBlur} name="graduationTime" onChange={formik.handleChange} value={formik.values.graduationTime} />
                                                {formik.touched.graduationTime && formik.errors.graduationTime ? <p className="formikValidate">{formik.errors.graduationTime}</p> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group mt-1 col-md-12">
                                            <label for="PreviousJob">Previous Job</label>
                                            <input type="text" className="form-control" id="PreviousJob" onBlur={formik.handleBlur} name="previousJob" placeholder="Corporate consulting" onChange={formik.handleChange} value={formik.values.previousJob} />
                                            {formik.touched.previousJob && formik.errors.previousJob ? <p className="formikValidate">{formik.errors.previousJob}</p> : null}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group mt-1 col-md-6">
                                            <label for="Skills">Skills</label>
                                            <textarea className="form-control" id="Skills" name="skills" onBlur={formik.handleBlur} rows="1" onChange={formik.handleChange} value={formik.values.skills}></textarea>
                                            {formik.touched.skills && formik.errors.skills ? <p className="formikValidate">{formik.errors.skills}</p> : null}
                                        </div>
                                        <div className="form-group mt-1 col-md-6">
                                            <label for="Description">About us</label>
                                            <textarea className="form-control" name="description" onBlur={formik.handleBlur} id="description" rows="1" onChange={formik.handleChange} value={formik.values.description}></textarea>
                                            {formik.touched.description && formik.errors.description ? <p className="formikValidate">{formik.errors.description}</p> : null}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'center' }} class="form-button mt-3">
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