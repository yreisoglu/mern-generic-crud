import React from "react";
import { useState } from "react";
import '../UserCreate.css';
import { UserSave } from '../methods/UserSave';

    const UserCreate = () => {
      const [data, setData] = useState({
        name: "",
        surname: "",
        email: "",
        file: "",
        firstJobDay: "",
        totalWorkTime: "",
        university: "",
        graduationTime: "",
        previousJob: "",
        skills: "",
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        UserSave(data).then((res) => {
            console.log('res',res);
        }).catch((err) => {
          console.log(err);
        });
    }

    return (
      <div className="container">
        <div class="form-body">
          <div class="row">
              <div class="form-holder">
                  <div class="form-content">
                      <div class="form-items">
                          <h3>Welcome</h3>
                          <p>TELL US ABOUT YOURSELF</p>
                          <form onSubmit={handleSubmit} class="requires-validation" novalidate>
                          <div className="row">
                              <div className="form-group col-md-4">
                                <label for="name">Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Name" onChange={(e) => setData({...data, name: e.target.value})}/>
                              </div>
                              <div className="form-group col-md-4">
                                <label for="Surname">Surname</label>
                                <input type="text" className="form-control" id="name" placeholder="Surname" onChange={(e) => setData({...data, surname: e.target.value})}/>
                              </div>
                              <div className="form-group col-md-4">
                                  <label for="email">Email</label>
                                  <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={(e) => setData({...data, email: e.target.value})}/>
                              </div>
                          </div>
                          <div className="row">
                              <div className="form-group mt-4 col-md-4">
                                  <div className="form-group">
                                      <label for="file">Photo</label>
                                      <input type="file" className="form-control-file" id="file" onChange={(e) => setData({...data, file: e.target.value})}/>
                                  </div>
                              </div>
                              <div className="form-group mt-5 col-md-4">
                                  <div className="form-group">
                                      <label className="mr-2" for="FirstJobDay">First Job Day</label>
                                      <input type="date" className="form-control-file" id="FirstJobDay" onChange={(e) => setData({...data, firstJobDay: e.target.value})}/>
                                  </div>
                              </div>    
                              <div className="form-group mt-3 col-md-4">    
                                  <div className="form-group">
                                      <label for="TotalWorkTime">Total Work Time</label>
                                      <input type="text" className="form-control" id="TotalWorkTime" placeholder="1 month 2 year" onChange={(e) => setData({...data, totalWorkTime: e.target.value})}/>
                                  </div>
                              </div>    
                          </div>
                          <div className="row">
                              <div className="form-group mt-3 col-md-6">
                                  <div className="form-group">
                                    <label for="university">University</label>
                                    <input type="text" className="form-control" id="university" placeholder="Corban University" onChange={(e) => setData({...data, university: e.target.value})}/>
                                  </div>
                              </div>
                              <div className="form-group mt-5 col-md-6">
                                  <div className="form-group">
                                      <label for="GraduationTime">Graduation Time</label>
                                      <input type="date" className="form-control-file" id="GraduationTime" onChange={(e) => setData({...data, graduationTime: e.target.value})}/>
                                  </div>
                              </div>
                          </div>  
                          <div className="row">     
                              <div className="form-group mt-3 col-md-12">
                                <label for="PreviousJob">Previous Job</label>
                                <input type="text" className="form-control" id="PreviousJob" placeholder="Corporate consulting"  onChange={(e) => setData({...data, previousJob: e.target.value})}/>
                              </div>
                          </div>
                          <div className="row">
                              <div className="form-group mt-3 col-md-6">
                                  <label for="Skills">Skills</label>
                                  <textarea className="form-control" id="Skills" rows="1" onChange={(e) => setData({...data, skills: e.target.value})}></textarea>
                              </div>
                              <div className="form-group mt-3 col-md-6">
                                  <label for="Description">About us</label>
                                  <textarea className="form-control" id="description" rows="1" onChange={(e) => setData({...data, description: e.target.value})}></textarea>
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