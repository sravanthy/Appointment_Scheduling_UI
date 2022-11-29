import "./RegisterComponent.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilPhone, cilUser } from "@coreui/icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

export default function RegisterComponent() {
  const [formData, setFormData] = useState({});
  let [validUserError, setValidUserError] = useState("");
  let [userNameError, setUserNameError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [firstNameError, setFirstNameError] = useState("");
  let [lastNameError, setLastNameError] = useState("");
  let [emailAddressError, setEmailAddressError] = useState("");
  let [phoneNumberError, setPhoneNumberError] = useState("");
  let [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: null,
      firstName: formData.firstName,
      lastName: formData.lastName,
      emailAddress: formData.emailAddress,
      phone: formData.phone,
      userName: formData.userName,
      password: formData.password,
      userRole: "USER",
    }),
  };
  const handleChange = ({ target }) => {
    if (target.name === "phone") {
      target.value = formatPhoneNumber(target.value);
    }
    if (target.name === "emailAddress") {
      setEmailAddressError(isValidEmail(target.value));
    }
    validateForm();
    setFormData({ ...formData, [target.name]: target.value });
  };
  const handleSubmit = async (evt) => {
    validateForm();

    try {
      fetch("http://localhost:9095/simplybook/user/", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data?.error === "User already exists...") {
            setValidUserError("User already exists !!");
          } else {
            navigate("/login", { replace: true }, {});
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  function isValidEmail(val) {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(val)) {
      return "Invalid Email Address";
    }
  }
  const validateForm = () => {
    const { userName, password, firstName, lastName, phone, emailAddress } =
      formData;
    setUserNameError("");
    setPasswordError("");
    setFirstNameError("");
    setLastNameError("");
    setEmailAddressError("");
    setPhoneNumberError("");
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
    if (!firstName) {
      setFirstNameError("First Name is required");
    } else {
      setFirstNameError("");
    }
    if (!lastName) {
      setLastNameError("Last Name is required");
    } else {
      setLastNameError("");
    }
    if (!emailAddress) {
      setEmailAddressError("Email Address is required");
    } else {
      setEmailAddressError(isValidEmail(emailAddress));
    }
    if (!phone) {
      setPhoneNumberError("Phone Number is required");
    } else {
      setPhoneNumberError("");
    }

    if (
      userNameError === "" &&
      passwordError === "" &&
      firstNameError === "" &&
      lastNameError === "" &&
      phoneNumberError === "" &&
      emailAddressError === ""
    ) {
      console.log("No errors");
      setDisable(false);
    }
  };
  function formatPhoneNumber(value) {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;

    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }
  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer className="containerCss">
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Register</h1>
                    <p className="text-medium-emphasis">Create your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="FirstName"
                        autoComplete="off"
                        name="firstName"
                        value={formData.firstName || ""}
                        onChange={handleChange}
                        onBlur={handleChange}
                      />
                    </CInputGroup>
                    <Form.Text style={{ color: "red" }}>
                      {firstNameError}
                    </Form.Text>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="LastName"
                        autoComplete="off"
                        name="lastName"
                        value={formData.lastName || ""}
                        onChange={handleChange}
                        onBlur={handleChange}
                      />
                    </CInputGroup>
                    <Form.Text style={{ color: "red" }}>
                      {lastNameError}
                    </Form.Text>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Email Address"
                        autoComplete="off"
                        name="emailAddress"
                        value={formData.emailAddress || ""}
                        onChange={handleChange}
                        onBlur={handleChange}
                      />
                    </CInputGroup>
                    <Form.Text style={{ color: "red" }}>
                      {emailAddressError}
                    </Form.Text>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilPhone} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Phone Number"
                        autoComplete="off"
                        name="phone"
                        value={formData.phone || ""}
                        onChange={handleChange}
                        onBlur={handleChange}
                      />
                    </CInputGroup>
                    <Form.Text style={{ color: "red" }}>
                      {phoneNumberError}
                    </Form.Text>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="User Name"
                        autoComplete="off"
                        name="userName"
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
                        autoComplete="off"
                        name="password"
                        value={formData.password || ""}
                        onChange={handleChange}
                        onBlur={handleChange}
                      />
                    </CInputGroup>
                    <Form.Text style={{ color: "red" }}>
                      {passwordError}
                    </Form.Text>
                    <div className="d-grid">
                      <CButton
                        color="success"
                        className="px-4"
                        onClick={handleSubmit}
                        disabled={disable}
                      >
                        Create Account
                      </CButton>
                    </div>
                    <Form.Text style={{ color: "red" }}>
                      {validUserError}
                    </Form.Text>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
}
