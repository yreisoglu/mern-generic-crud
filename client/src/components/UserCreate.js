import React, { useEffect, useState } from "react";
import '../UserCreate.css';
import { UserSave } from '../methods/UserSave';
import { Link } from "react-router-dom";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserCreate = () => {

    const FILE_SIZE = 1024 * 1024;
    const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/png"
    ];

    const formik = useFormik({
        initialValues: {
            fullname: "",
            email: "",
            file: "",
            firstJobDay: "",
            totalWorkTime: "",
            department: "",
            university: "",
            graduationTime: "",
            previousJob: "",
            skills: "",
            description: "",
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required("Name and surname is a required field"),
            email: Yup.string().email("Invalid email address").required("Email is a required field"),
            firstJobDay: Yup.date().required("Orion start day is a required field"),
            file: Yup.mixed()
                    .required("Image is a required field")
                    .test(
                        "fileSize",
                        "Image too large. (max: 1024 x 1024)",
                        value => value && value.size <= FILE_SIZE
                    )
                    .test(
                        "fileFormat",
                        "Unsupported Format. (sup: .jpg .png)",
                        value => value && SUPPORTED_FORMATS.includes(value.type)
                    ),
            totalWorkTime: Yup.string().required("Total work day is a required field"),
            university: Yup.string().required("University is a required field"),
            department: Yup.string().required("Orion department is a required field"),
            graduationTime: Yup.date().required("Graduation is a required field"),
            previousJob: Yup.string().required("Previous job is a required field"),
            skills: Yup.string().min(20, "Skills must be at least 20 characters")
                    .required("Technical skills is a required field"),
            description: Yup.string().min(150, "About must be at least 150 characters")
                    .required("About is a required field"),
        }),
        onSubmit: (values, { resetForm }) => {
            var form_data = new FormData();
            for (var key in values) {
                form_data.append(key, values[key]);
            }
            UserSave(form_data).then(() => {
                toast.success("Succesful !")
                setTimeout(() => {
                    resetForm();
                }, 500)
            }).catch(() => {
                toast.error("Error ! Please try again !")
            });
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
                                    <div className="form-group col-md-3">
                                        <h3>Welcome</h3>
                                        <p>TELL US ABOUT YOURSELF</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }} className="form-group col-md-9">
                                        <Link to="/login" class="btn btn-primary">
                                            Admin Panel
                                        </Link>
                                    </div>
                                </div>
                                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                                    <div className="row mt-4">
                                        <div className="form-group col-md-6 col-sm-12">
                                            <label for="Surname">Full Name</label>
                                            <input type="text" className="form-control" id="fullname" onBlur={formik.handleBlur} placeholder="Name Surname" name="fullname" onChange={formik.handleChange} value={formik.values.fullname}/>
                                            {formik.touched.fullname && formik.errors.fullname ? <p className="formikValidate">{formik.errors.fullname}</p> : null}
                                        </div>
                                        <div className="form-group col-md-6 col-sm-12">
                                            <label for="email">Email</label>
                                            <input type="email" className="form-control" id="email" onBlur={formik.handleBlur} name="email" placeholder="name@example.com" onChange={formik.handleChange} value={formik.values.email} />
                                            {formik.touched.email && formik.errors.email ? <p className="formikValidate">{formik.errors.email}</p> : null}
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="form-group mt-1 col-md-3 col-sm-12">
                                            <label className="mb-2" for="FirstJobDay">Orion Start Day</label>
                                            <div className="form-group">
                                                <input type="date" className="form-control" id="FirstJobDay" onBlur={formik.handleBlur} name="firstJobDay" onChange={formik.handleChange} value={formik.values.firstJobDay} />
                                                {formik.touched.firstJobDay && formik.errors.firstJobDay ? <p className="formikValidate">{formik.errors.firstJobDay}</p> : null}
                                            </div>
                                        </div>
                                        <div className="form-group mt-1 col-md-3 col-sm-12">
                                            <div className="form-group">
                                                <label for="TotalWorkTime">Total Experience</label>
                                                <input type="text" className="form-control" id="TotalWorkTime" onBlur={formik.handleBlur} name="totalWorkTime" placeholder="ex: 2 years " onChange={formik.handleChange} value={formik.values.totalWorkTime} />
                                                {formik.touched.totalWorkTime && formik.errors.totalWorkTime ? <p className="formikValidate">{formik.errors.totalWorkTime}</p> : null}
                                            </div>
                                        </div>
                                        <div className="form-group mt-1 col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label className="mb-2" for="file">Photo</label>
                                                <input type="file" className="form-control" id="file" name="file" onChange={(e) => { formik.setFieldValue("file", (e.target.files[0])) }} />
                                                {formik.touched.file && formik.errors.file ? <p className="formikValidate">{formik.errors.file}</p> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="form-group mt-1 col-md-9 col-sm-12">
                                            <div className="form-group">
                                                <label for="university">University</label>
                                                <input type="text" className="form-control" onBlur={formik.handleBlur} id="university" placeholder="ex: Corban University" name="university" onChange={formik.handleChange} value={formik.values.university} />
                                                {formik.touched.university && formik.errors.university ? <p className="formikValidate">{formik.errors.university}</p> : null}
                                            </div>
                                        </div>
                                        <div className="form-group mt-1 col-md-3 col-sm-12">
                                            <label className="mb-2" for="GraduationTime">Graduation</label>
                                            <div className="form-group">
                                                <input type="month" className="form-control" id="GraduationTime" onBlur={formik.handleBlur} name="graduationTime" onChange={formik.handleChange} value={formik.values.graduationTime} />
                                                {formik.touched.graduationTime && formik.errors.graduationTime ? <p className="formikValidate">{formik.errors.graduationTime}</p> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="form-group mt-1 col-md-12 col-sm-12">
                                            <div className="form-group">
                                                <label for="university">Orion Department</label>
                                                <input type="text" className="form-control" onBlur={formik.handleBlur} id="department" placeholder="ex: NRD 2208" name="department" onChange={formik.handleChange} value={formik.values.department} />
                                                {formik.touched.department && formik.errors.department ? <p className="formikValidate">{formik.errors.department}</p> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="form-group mt-1 col-md-12 col-sm-12">
                                            <label for="PreviousJob">Previous Job</label>
                                            <input type="text" className="form-control" id="PreviousJob" onBlur={formik.handleBlur} name="previousJob" placeholder="ex: Corporate consulting" onChange={formik.handleChange} value={formik.values.previousJob} />
                                            {formik.touched.previousJob && formik.errors.previousJob ? <p className="formikValidate">{formik.errors.previousJob}</p> : null}
                                        </div> 
                                    </div>
                                    <div className="row mt-4">
                                        <div className="form-group mt-1 col-md-12 col-sm-12">
                                            <label for="Skills">Technical Skills</label>
                                            <textarea className="form-control mt-2" id="Skills" name="skills" placeholder=" ex: PHP, Vue.js, AWS.." onBlur={formik.handleBlur} rows="3" onChange={formik.handleChange} value={formik.values.skills}></textarea>
                                            {formik.touched.skills && formik.errors.skills ? <p className="formikValidate">{formik.errors.skills}</p> : null}
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="form-group mt-1 col-md-12 col-sm-12">
                                            <label for="Description">About</label>
                                            <textarea className="form-control mt-2" name="description" onBlur={formik.handleBlur} id="description" rows="3" onChange={formik.handleChange} value={formik.values.description}></textarea>
                                            {formik.touched.description && formik.errors.description ? <p className="formikValidate">{formik.errors.description}</p> : null}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'center' }} class="form-button mt-4">
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