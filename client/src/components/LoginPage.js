import { useEffect, useState } from "react";
import { isExpired, Login } from "../methods/Account";
import { useNavigate } from "react-router-dom";
import React from "react";
import "../UserCreate.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useStore from "../store";
import { GetExistingDepartments } from "../methods/GetUsers";

const LoginPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [selectedDepartment, setDepartment] = useState("Yok");
  const [departments, setDepartmentList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.document.title = "Giriş Yap";
    isExpired().then((res) => {
      if (!res) {
        navigate("/users");
      }
    });
    GetExistingDepartments()
      .then((res) => {
        const list = ["Yok"].concat(res);
        setDepartmentList(list);
      })
      .catch((err) => console.log(err));
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Kullanıcı adı gereklidir"),
      password: Yup.string().required("Şifre gereklidir"),
    }),
    onSubmit: (values) => {
      localStorage.setItem("department", selectedDepartment);
      setLoading(true);
      Login(values.username, values.password)
        .then((res) => {
          if (res.data.token) {
            setLoading(false);
            localStorage.setItem("jwt", res.data.token);
            navigate("/users");
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error("Hatalı kullanıcı adı ve şifre.", { autoClose: 2000 });
          console.log(err);
        });
    },
  });

  return (
    <div className="container">
      <div className="form-body">
        <div className="row">
          <div className="form-holder">
            <div className="form-content">
              <div className="form-items login">
                <div className="row">
                  <div className="form-group col-md-8">
                    <h3>Giriş Yap</h3>
                  </div>
                  <div style={{ textAlign: "right" }} className="form-group col-md-4">
                    <Link to="/" style={{ background: "#495056" }} class="btn btn-primary">
                      Yeni Form Ekle
                    </Link>
                  </div>
                </div>
                <div className="mt-2 col-md-9">
                  <p style={{ fontSize: 15 }}>
                    Kullanıcı girişi yaparak eklenen formları görüntüleyebilir ve
                    düzenleyebilirsiniz
                  </p>
                </div>

                <form onSubmit={formik.handleSubmit} encType="">
                  <div className="row mt-4">
                    <div className="form-group col-md-12">
                      <label for="name">Kullanıcı Adı</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        onChange={formik.handleChange}
                        value={formik.username}
                        name="username"
                      />
                      {formik.errors.username && formik.errors.username ? (
                        <p className="formikValidate">{formik.errors.username}</p>
                      ) : null}
                    </div>
                    <div className="form-group mt-4 col-md-12">
                      <label for="Surname">Şifre</label>
                      <input
                        type="password"
                        className="form-control"
                        id="surname"
                        onChange={formik.handleChange}
                        value={formik.password}
                        name="password"
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <p className="formikValidate">{formik.errors.password}</p>
                      ) : null}
                    </div>
                    <div className="form-group mt-4 col-md-12 ">
                      <label for="Surname">Departman Filtresi</label>
                      <select
                        className="form-select"
                        onChange={(e) => {
                          setDepartment(e.target.value);
                        }}
                      >
                        {departments.map((item) => {
                          return <option value={item}>{item}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }} class="form-button mt-3">
                    {!isLoading ? (
                      <button
                        style={{ background: "coral " }}
                        id="submit"
                        type="submit"
                        class="btn btn-primary"
                      >
                        Giriş
                      </button>
                    ) : (
                      <button
                        style={{ background: "coral " }}
                        id="submit"
                        type="submit"
                        class="btn btn-primary"
                      >
                        <span
                          class="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className="mt-3">
              <p className="font-weight-light" style={{ fontSize: 18 }}>
                Not: Yeni form eklemek için kullanıcı girişi yapılması gerekmiyor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
