import React from "react";

const UserCreate = () => {
    return (
        <div className="container">
            <h2> Tell us about yourself </h2>
            <form>
            <div className="row">
                <div className="form-group col-md-6">
                  <label for="name">Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Name"/>
                </div>
                <div className="form-group col-md-6">
                  <label for="Surname">Surname</label>
                  <input type="text" className="form-control" id="name" placeholder="Surname"/>
                </div>
            </div>
            <div className="form-group">
              <label for="email">Email</label>
              <input type="email" className="form-control" id="email" placeholder="name@example.com"/>
            </div>
            <div className="form-group">
                <label for="file">Photo</label>
                <input type="file" className="form-control-file" id="file"/>
            </div>
            <div className="form-group">
                <label for="FirstJobDay">First Job Day</label>
                <input type="date" className="form-control-file" id="FirstJobDay"/>
            </div>
            <div className="form-group">
              <label for="TotalWorkTime">Total Work Time</label>
              <input type="text" className="form-control" id="TotalWorkTime" placeholder="1 month 2 year"/>
            </div>
            <div className="row">
                <div className="form-group col-md-6">
                    <div className="form-group">
                      <label for="university">University</label>
                      <input type="text" className="form-control" id="university" placeholder="Corban University"/>
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <div className="form-group">
                            <label for="GraduationTime">Graduation Time</label>
                            <input type="date" className="form-control-file" id="GraduationTime"/>
                    </div>
                </div>
            </div>        
            <div className="form-group">
              <label for="PreviousJob">Previous Job</label>
              <input type="text" className="form-control" id="PreviousJob" placeholder="Corporate consulting"/>
            </div>
            <div className="form-group">
                <label for="Skills">Skills</label>
                <textarea className="form-control" id="Skills" rows="3"></textarea>
            </div>
            <div className="form-group">
                <label for="Description">About us</label>
                <textarea className="form-control" id="description" rows="3"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default UserCreate;