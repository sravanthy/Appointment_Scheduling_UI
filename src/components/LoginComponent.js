import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginComponent.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { useEffect } from "react";
export default function LoginComponent(props) {
  const [formData, setFormData] = useState({});
  let [userNameError, setUserNameError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [validUserError, setValidUserError] = useState("");
  let [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
    validateForm();
  };
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  useEffect(() => {
    formData.userName = "";
    formData.password = "";
    setUserNameError("");
    setPasswordError("");
  }, [""]);
  const handleSubmit = async (evt) => {
    validateForm();
    if (userNameError === "" && passwordError === "") {
      try {
        fetch(
          "http://localhost:9095/simplybook/user/" +
            formData.userName +
            "/" +
            formData.password,
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            if (!data) {
              setValidUserError("User not found !!");
            } else {
              localStorage.setItem("user", formData.userName);
              fetchData();
            }
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      evt.preventDefault();
    }
  };
  const requestUserOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  function fetchData() {
    fetch(
      "http://localhost:9095/simplybook/user/" + formData.userName,
      requestUserOptions
    )
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("firstName", data.firstName);
        localStorage.setItem("lastName", data.lastName);
        localStorage.setItem("role", data.userRole);
        if (data.userRole === "ADMIN")
          navigate("/landing/dashboardA", { replace: true }, {});
        else navigate("/landing/dashboard", { replace: true }, {});
      });
  }

  const validateForm = () => {
    const { userName, password } = formData;
    setUserNameError("");
    setPasswordError("");
    setValidUserError("");
    if (!userName) {
      setUserNameError("UserName is required");
    } else if (userName.length < 6) {
      setUserNameError("UserName should be minimum 6 characters");
    } else if (userName.indexOf(" ") >= 0) {
      setUserNameError("UserName cannot contain spaces");
    } else {
      setUserNameError("");
    }
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password should be minimum 6 characters");
    } else if (password.indexOf(" ") >= 0) {
      setPasswordError("Password cannot contain spaces");
    } else {
      setPasswordError("");
    }

    if (userNameError === "" && passwordError === "") {
      setDisable(false);
    }
  };
  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer className="containerCss login">
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CForm>
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">
                        Sign In to your account
                      </p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Username"
                          name="userName"
                          autoComplete="off"
                          value={formData.userName || ""}
                          onChange={handleChange}
                          onBlur={handleChange}
                        />
                      </CInputGroup>
                      <Form.Text style={{ color: "red" }}>
                        {userNameError}
                      </Form.Text>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={formData.password || ""}
                          autoComplete="off"
                          onChange={handleChange}
                          onBlur={handleChange}
                        />
                      </CInputGroup>
                      <Form.Text style={{ color: "red" }}>
                        {passwordError}
                      </Form.Text>
                      <CRow>
                        <CCol xs={6}>
                          <CButton
                            color="primary"
                            className="px-4"
                            disabled={disable}
                            onClick={handleSubmit}
                          >
                            Login
                          </CButton>
                        </CCol>
                        {/* <CCol xs={6} className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol> */}
                        <Form.Text style={{ color: "red" }}>
                          {validUserError}
                        </Form.Text>
                      </CRow>
                    </CCardBody>
                  </CCard>
                  <CCard
                    className="text-white bg-primary py-5"
                    style={{ width: "44%" }}
                  >
                    <CCardBody className="text-center">
                      <div>
                        <h2>Sign up</h2>
                        <p>What are you waiting for? Sign up is Free !</p>
                        <Link to="/signup">
                          <CButton
                            color="primary"
                            className="mt-3"
                            active
                            tabIndex={-1}
                          >
                            Register Now!
                          </CButton>
                        </Link>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CForm>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
}
