import React, { useEffect, useState } from "react";
import '../UserCreate.css';
import { UserSave } from '../methods/UserSave';
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";


const UserCreate = () => {

    const [isLoading, setLoading] = useState(false)
    const FILE_SIZE = 1024 * 1024;
    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/png"
    ];

    const titles = [
        "Yazılım Mühendisi",
        "Teknoloji Grubu Mühendisi",
        "DevOps Mühendisi",
        "IT Sistem Mühendisi",
        "Test Otomasyon Mühendisi",
        "Ürün Destek Mühendisi",
        "Arka Uç Geliştirici",
        "Ön Uç Geliştirici",
        "Stajyer",
        "Diğer"
    ]

    useEffect(() => {
        document.title = "Kişisel Bilgiler";
    }, [])

    const formik = useFormik({
        initialValues: {
            fullname: "",
            email: "",
            file: "",
            firstJobDay: "",
            // totalWorkTime: "",
            department: "",
            workTitle: "",
            // university: "",
            // graduationTime: "",
            // previousJob: "",
            // previousWorkTitle: "",
            // skills: "",
            description: "",
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required("Ad soyad alanı boş bırakılamaz"),
            email: Yup.string().email("Geçersiz email").required("Email alanı boş bırakılamaz"),
            firstJobDay: Yup.date().required("Orion başlangıç tarihi alanı boş bırakılamaz."),
            file: Yup.mixed()
                .required("Fotoğraf alanı boş bırakılamaz")
                .test(
                    "fileSize",
                    "Fotoğraf boyutu çok fazla. (max: 1024 x 1024)",
                    value => value && value.size <= FILE_SIZE
                )
                .test(
                    "fileFormat",
                    "Desteklenmeyen fotoğraf formatı. (Desteklenenler: .jpg .png)",
                    value => value && SUPPORTED_FORMATS.includes(value.type)
                ),
            // university: Yup.string().required("University is a required field"),
            workTitle: Yup.string().required("Çalıştığın pozisyonu seç"),
            department: Yup.string().required("Orion departman alanı boş bırakılamaz"),
            // graduationTime: Yup.date().required("Graduation is a required field"),
            // skills: Yup.string().min(20, "Skills must be at least 20 characters")
            //     .required("Technical skills is a required field"),
            description: Yup.string().min(150, "Hakkımda alanında min(150) karakter kullanmalısın.")
                .required("Hakkımda alanı boş bırakılamaz"),
        }),
        onSubmit: (values, { resetForm }) => {
            setLoading(true)
            var form_data = new FormData();
            for (var key in values) {
                form_data.append(key, values[key]);
            }
            UserSave(form_data).then(() => {
                toast.success("Kayıt işlemi başarılı!")
                setLoading(false);
                setTimeout(() => {
                    resetForm();
                }, 2000)
            }
            ).catch((error) => {
                toast.error("Kayıt işlemi hatalı!")
                console.log(error)
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
                                        <h3>Hoş Geldin</h3>
                                        <p>KiŞİSEL BİLGİLER</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }} className="form-group col-md-9">
                                        <Link to="/users" class="btn btn-primary">
                                            Admin Girişi
                                        </Link>
                                    </div>
                                </div>
                                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                                    <div className="row mt-4">
                                        <div className="form-group col-md-4 col-sm-12">
                                            <label for="Surname">Ad Soyad</label>
                                            <input type="text" className="form-control" id="fullname" onBlur={formik.handleBlur} placeholder="Ad Soyad" name="fullname" onChange={formik.handleChange} value={formik.values.fullname} />
                                            {formik.touched.fullname && formik.errors.fullname ? <p className="formikValidate">{formik.errors.fullname}</p> : null}
                                        </div>
                                        <div className="form-group col-md-4 col-sm-12">
                                            <label for="email">Email</label>
                                            <input type="email" className="form-control" id="email" onBlur={formik.handleBlur} name="email" placeholder="name@example.com" onChange={formik.handleChange} value={formik.values.email} />
                                            {formik.touched.email && formik.errors.email ? <p className="formikValidate">{formik.errors.email}</p> : null}
                                        </div>
                                        <div className="form-group col-md-4 col-sm-12">
                                            <div className="form-group">
                                                <label className="mb-1" for="file">Fotoğraf Seç</label>
                                                <input type="file" className="form-control" id="file" name="file" onChange={(e) => { formik.setFieldValue("file", (e.target.files[0])) }} />
                                                {formik.touched.file && formik.errors.file ? <p className="formikValidate">{formik.errors.file}</p> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="form-group mt-1 col-md-4 col-sm-12">
                                            <label className="mb-2" for="FirstJobDay">Orion Başlangıç Tarihi</label>
                                            <div className="form-group">
                                                <input type="date" className="form-control" id="FirstJobDay" onBlur={formik.handleBlur} name="firstJobDay" onChange={formik.handleChange} value={formik.values.firstJobDay} />
                                                {formik.touched.firstJobDay && formik.errors.firstJobDay ? <p className="formikValidate">{formik.errors.firstJobDay}</p> : null}
                                            </div>
                                        </div>
                                        <div className="form-group mt-1 col-md-4 col-sm-12">
                                            <label for="FirstJobDay">Pozisyon</label>
                                            <select onChange={formik.handleChange} name="workTitle" class="form-select">
                                                <option value={formik.values.workTitle}>Seçenekleri Göster</option>
                                                {titles.map((item, index) => {
                                                    return (
                                                        <option value={item}>{item}</option>
                                                    )
                                                })}
                                            </select>
                                            {formik.touched.workTitle && formik.errors.workTitle ? <p className="formikValidate">{formik.errors.workTitle}</p> : null}
                                        </div>
                                        <div className="form-group mt-1 col-md-4 col-sm-12">
                                            <div className="form-group">
                                                <label for="university">Departman</label>
                                                <input type="text" className="form-control" onBlur={formik.handleBlur} id="department" placeholder="ör: NRD2208" name="department" onChange={formik.handleChange} value={formik.values.department} />
                                                {formik.touched.department && formik.errors.department ? <p className="formikValidate">{formik.errors.department}</p> : null}
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="row mt-4"> */}
                                        {/* <div className="form-group mt-1 col-md-8 col-sm-12"> */}
                                            {/* <div className="form-group"> */}
                                                {/* <label for="university">University</label> */}
                                                {/* <input type="text" className="form-control" onBlur={formik.handleBlur} id="university" placeholder="ex: Corban University" name="university" onChange={formik.handleChange} value={formik.values.university} /> */}
                                                {/* {formik.touched.university && formik.errors.university ? <p className="formikValidate">{formik.errors.university}</p> : null} */}
                                            {/* </div> */}
                                        {/* </div> */}
                                        {/* <div className="form-group mt-1 col-md-4 col-sm-12"> */}
                                            {/* <label className="mb-2" for="GraduationTime">Graduation</label> */}
                                            {/* <div className="form-group"> */}
                                                {/* <input type="month" className="form-control" id="GraduationTime" onBlur={formik.handleBlur} name="graduationTime" onChange={formik.handleChange} value={formik.values.graduationTime} /> */}
                                                {/* {formik.touched.graduationTime && formik.errors.graduationTime ? <p className="formikValidate">{formik.errors.graduationTime}</p> : null} */}
                                            {/* </div> */}
                                        {/* </div> */}
                                    {/* </div> */}
                                    {/* <div className="row mt-4"> */}
                                        {/* <div className="form-group mt-1 col-md-4 col-sm-12"> */}
                                            {/* <label for="PreviousJob">Previous Job</label> */}
                                            {/* <input type="text" className="form-control" id="PreviousJob" name="previousJob" placeholder="ex: Corporate consulting" onChange={formik.handleChange} value={formik.values.previousJob} /> */}
                                        {/* </div> */}
                                        {/* <div className="form-group mt-1 col-md-4 col-sm-12"> */}
                                            {/* <label for="PreviousJob">Previous Position</label> */}
                                            {/* <input type="text" className="form-control" id="PreviousJob" name="previousWorkTitle" placeholder="ex: Backend Developer" onChange={formik.handleChange} value={formik.values.previousJobTitle} /> */}
                                        {/* </div> */}
                                        {/* <div className="form-group mt-1 col-md-4 col-sm-12"> */}
                                            {/* <div className="form-group"> */}
                                                {/* <label for="TotalWorkTime">Total Experience</label> */}
                                                {/* <input type="text" className="form-control" id="TotalWorkTime" name="totalWorkTime" placeholder="ex: 2 years " onChange={formik.handleChange} value={formik.values.totalWorkTime} /> */}
                                            {/* </div> */}
                                        {/* </div> */}
                                    {/* </div> */}
                                    {/* <div className="row mt-4">
                                        <div className="form-group mt-1 col-md-12 col-sm-12">
                                            <label for="Skills">Technical Skills</label>
                                            <textarea className="form-control mt-2" id="Skills" name="skills" placeholder=" ex: PHP, Vue.js, AWS.." onBlur={formik.handleBlur} rows="3" onChange={formik.handleChange} value={formik.values.skills}></textarea>
                                            {formik.touched.skills && formik.errors.skills ? <p className="formikValidate">{formik.errors.skills}</p> : null}
                                        </div>
                                    </div> */}
                                    <div className="row mt-4">
                                        <div className="form-group mt-1 col-md-12 col-sm-12">
                                            <label for="Description">Kendinden Bahset</label>
                                            <textarea className="form-control mt-2" name="description" onBlur={formik.handleBlur} id="description" rows="3" onChange={formik.handleChange} value={formik.values.description}></textarea>
                                            {formik.touched.description && formik.errors.description ? <p className="formikValidate">{formik.errors.description}</p> : null}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'center' }} class="form-button mt-4">
                                        {!isLoading ?
                                            <button id="submit" type="submit" class="btn btn-primary">Kaydet</button>
                                            :
                                            <button id="submit" type="submit" class="btn btn-primary">
                                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            </button>
                                        }
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