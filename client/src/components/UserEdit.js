import React, { useState, useEffect } from "react";
import '../UserCreate.css';
import { Link } from "react-router-dom";
import { UpdateUser } from '../methods/GetUsers';
import { useFormik } from "formik";
import * as Yup from "yup";

const UserEdit = (props) => {
    
    const [fileName, setFileName] = useState("");
    
    const formik = useFormik({
        initialValues: {
            name: props.data.name,
            surname: props.data.surname,
            email: props.data.email,
            // fileName: "",
            firstJobDay: props.data.firstJobDay ? props.data.firstJobDay.substring(0,10) : null,
            totalWorkTime: props.data.totalWorkTime,
            university: props.data.university,
            graduationTime: props.data.graduationTime ? props.data.graduationTime.substring(0,10) : null,
            previousJob: props.data.previousJob,
            skills: props.data.skills,
            description: props.data.description,
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
            UpdateUser(form_data);
        }
    });

    return (
        <div className="container m-4 mt-4">
          <div className="row">
            <div className="row">
                <div className="form-group col-md-9">
                <p> <h3>Detail <small> or update </small></h3></p>
                </div>
            </div>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              <div className="row mt-3">
                <div className="form-group col-md-4">
                  <label for="name">Name</label>
                  <input type="text" className="form-control" id="name" onBlur={formik.handleBlur} placeholder="Name" onChange={formik.handleChange} value={formik.values.name} />
                  {formik.touched.name && formik.errors.name ? <p className="formikValidate">{formik.errors.name}</p> : null}
                </div>
                <div className="form-group col-md-4">
                  <label for="Surname">Surname</label>
                  <input type="text" className="form-control" id="surname" onBlur={formik.handleBlur} placeholder="Surname" name="surname" onChange={formik.handleChange} value={formik.values.surname}/>
                  {formik.touched.surname && formik.errors.surname ? <p className="formikValidate">{formik.errors.surname}</p> : null}
                </div>
                <div className="form-group col-md-4">
                  <label for="email">Email</label>
                  <input type="email" className="form-control" id="email" onBlur={formik.handleBlur} name="email" placeholder="name@example.com" onChange={formik.handleChange} value={formik.values.email}/>
                  {formik.touched.email && formik.errors.email ? <p className="formikValidate">{formik.errors.email}</p> : null}
                </div>
              </div>
              <div className="row mt-4">
                <div className="form-group mt-2 col-md-6">
                  <div className="form-group">
                    <label className="mb-3" for="file">Current Photo</label>
                    <div className="currentPhoto">
                        <img className="currentPhotoImg" src={props.data.image} />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-2 col-md-6">
                  <div className="form-group">
                    <label className="mb-3" for="file">Click to update photo</label>
                    <input type="file" className="form-control" id="file" onBlur={formik.handleBlur} onChange={(e)=> {setFileName(e.target.files[0])}}/>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="form-group mt-2 col-md-6">
                    <label for="FirstJobDay">First Job Day</label>
                    <div className="form-group">
                      <input type="date" className="form-control" id="FirstJobDay" onBlur={formik.handleBlur} name="firstJobDay" onChange={formik.handleChange} value={formik.values.firstJobDay}/>
                      {formik.touched.firstJobDay && formik.errors.firstJobDay ? <p className="formikValidate">{formik.errors.firstJobDay}</p> : null}
                    </div>
                  </div>
                  <div className="form-group mt-2 col-md-6">
                    <div className="form-group">
                      <label for="TotalWorkTime">Total Work Time</label>
                      <input type="text" className="form-control" id="TotalWorkTime" onBlur={formik.handleBlur} name="totalWorkTime" placeholder="1 month 2 year" onChange={formik.handleChange} value={formik.values.totalWorkTime}/>
                      {formik.touched.totalWorkTime && formik.errors.totalWorkTime ? <p className="formikValidate">{formik.errors.totalWorkTime}</p> : null}
                    </div>
                  </div>
              </div>
              <div className="row mt-4">
                <div className="form-group mt-2 col-md-9">
                  <div className="form-group">
                    <label for="university">University</label>
                    <input type="text" className="form-control" onBlur={formik.handleBlur} id="university" placeholder="Corban University" name="university" onChange={formik.handleChange} value={formik.values.university}/>
                    {formik.touched.university && formik.errors.university ? <p className="formikValidate">{formik.errors.university}</p> : null}
                  </div>
                </div>
                <div className="form-group mt-2 col-md-3">
                  <label for="GraduationTime">Graduation Time</label>
                  <div className="form-group">
                    <input type="date" className="form-control" id="GraduationTime" onBlur={formik.handleBlur} name="graduationTime" onChange={formik.handleChange} value={formik.values.graduationTime}/>
                    {formik.touched.graduationTime && formik.errors.graduationTime ? <p className="formikValidate">{formik.errors.graduationTime}</p> : null}
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="form-group mt-2 col-md-12">
                  <label for="PreviousJob">Previous Job</label>
                  <input type="text" className="form-control" id="PreviousJob" onBlur={formik.handleBlur} name="previousJob" placeholder="Corporate consulting" onChange={formik.handleChange} value={formik.values.previousJob}/>
                  {formik.touched.previousJob && formik.errors.previousJob ? <p className="formikValidate">{formik.errors.previousJob}</p> : null}
                </div>
              </div>
              <div className="row mt-4">
                <div className="form-group mt-1 col-md-12">
                  <label for="Skills">Skills</label>
                  <textarea className="form-control" id="Skills" name="skills" onBlur={formik.handleBlur} rows="5" onChange={formik.handleChange} value={formik.values.skills}></textarea>
                  {formik.touched.skills && formik.errors.skills ? <p className="formikValidate">{formik.errors.skills}</p> : null}
                </div>
                <div className="form-group mt-1 col-md-12">
                  <label for="Description">About</label>
                  <textarea className="form-control" name="description" onBlur={formik.handleBlur} id="description" rows="5" onChange={formik.handleChange} value={formik.values.description}></textarea>
                  {formik.touched.description && formik.errors.description ? <p className="formikValidate">{formik.errors.description}</p> : null}
                </div>
              </div>
              <div style={{ textAlign: 'center' }} class="form-button mt-4">
                <button id="submit" type="submit" class="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      )
} 

export default UserEdit;