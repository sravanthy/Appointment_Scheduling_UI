import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CToast,
  CToastBody,
  CToastClose,
} from "@coreui/react";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
const Profile = () => {
  const [userData, setUserData] = useState([]);
  const userId = localStorage.getItem("user");
  let [toastShow, setToastShow] = useState(false);
  const [formData, setFormData] = useState({});
  let [passwordError, setPasswordError] = useState("");
  let [firstNameError, setFirstNameError] = useState("");
  let [lastNameError, setLastNameError] = useState("");
  let [emailAddressError, setEmailAddressError] = useState("");
  let [phoneNumberError, setPhoneNumberError] = useState("");
  let [disable, setDisable] = useState(true);
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  function fetchData() {
    fetch("http://localhost:9095/simplybook/user/" + userId, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        let userObj = {
          firstName: data.firstName,
          lastName: data.lastName,
          emailAddress: data.emailAddress,
          phone: data.phone,
          password: data.password,
        };
        setFormData(userObj);
      });
  }
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
  function isValidEmail(val) {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(val)) {
      return "Invalid Email Address";
    } else return "";
  }
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
  const validateForm = () => {
    const { password, firstName, lastName, phone, emailAddress } = formData;
    setPasswordError("");
    setFirstNameError("");
    setLastNameError("");
    setEmailAddressError("");
    setPhoneNumberError("");
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
      passwordError === "" &&
      firstNameError === "" &&
      lastNameError === "" &&
      phoneNumberError === "" &&
      emailAddressError === ""
    ) {
      setDisable(false);
      setToastShow(false);
    }
  };
  const requestPostOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userData.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      emailAddress: formData.emailAddress,
      phone: formData.phone,
      userName: userData.userName,
      password: formData.password,
    }),
  };
  const handleSubmit = (evt) => {
    validateForm();
    try {
      fetch("http://localhost:9095/simplybook/user/", requestPostOptions)
        .then((response) => response.json())
        .then((data) => {
          setDisable(true);
          setToastShow(true);
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [""]);
  return (
    <>
      <CToast
        autohide={true}
        visible={toastShow}
        color="success"
        className="text-white align-items-center"
      >
        <div className="d-flex">
          <CToastBody>Profile Information edited successfully!!</CToastBody>
          <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Edit Profile Information</strong>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3">
                <CCol xs={6}>
                  <CFormLabel htmlFor="userName">User Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="userName"
                    readOnly
                    value={userData.userName}
                  />
                </CCol>
                <CCol md={6}></CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="firstName">First Name</CFormLabel>
                  <CFormInput
                    type="text"
                    name="firstName"
                    value={formData.firstName || ""}
                    onChange={handleChange}
                    onBlur={handleChange}
                  />
                </CCol>
                <Form.Text style={{ color: "red" }}>{firstNameError}</Form.Text>
                <CCol md={6}>
                  <CFormLabel htmlFor="lastName">Last Name</CFormLabel>
                  <CFormInput
                    type="text"
                    name="lastName"
                    value={formData.lastName || ""}
                    onChange={handleChange}
                    onBlur={handleChange}
                  />
                </CCol>
                <Form.Text style={{ color: "red" }}>{lastNameError}</Form.Text>
                <CCol md={6}>
                  <CFormLabel htmlFor="emailAddress">Email Address</CFormLabel>
                  <CFormInput
                    type="email"
                    name="emailAddress"
                    placeholder="user@gmail.com"
                    value={formData.emailAddress || ""}
                    onChange={handleChange}
                    onBlur={handleChange}
                  />
                </CCol>
                <Form.Text style={{ color: "red" }}>
                  {emailAddressError}
                </Form.Text>
                <CCol md={6}>
                  <CFormLabel htmlFor="phoneNumber">Phone Number</CFormLabel>
                  <CFormInput
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    onBlur={handleChange}
                  />
                </CCol>
                <Form.Text style={{ color: "red" }}>
                  {phoneNumberError}
                </Form.Text>
                <CCol xs={6}>
                  <CFormLabel htmlFor="password">Password</CFormLabel>
                  <CFormInput
                    type="text"
                    name="password"
                    value={formData.password || "" || userData.password}
                    onChange={handleChange}
                    onBlur={handleChange}
                  />
                </CCol>
                <Form.Text style={{ color: "red" }}>{passwordError}</Form.Text>
                <CCol xs={12}>
                  <CButton
                    color="primary"
                    className="px-4"
                    onClick={handleSubmit}
                    disabled={disable}
                  >
                    Edit Profile
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Profile;
