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
  CFormSelect,
  CToast,
  CToastBody,
  CToastClose,
} from "@coreui/react";
import moment from "moment";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import DatePicker from "react-date-picker";

const BookAppointment = (props) => {
  const [dateValue, setDateValue] = useState(new Date());
  const userId = localStorage.getItem("user");
  const [formData, setFormData] = useState({});
  let [passwordError, setPasswordError] = useState("");
  let [firstNameError, setFirstNameError] = useState("");
  let [lastNameError, setLastNameError] = useState("");
  let [emailAddressError, setEmailAddressError] = useState("");
  let [phoneNumberError, setPhoneNumberError] = useState("");
  let [disable, setDisable] = useState(true);
  let [reasonCode, setReasonCode] = useState("");
  let [serviceCodes, setServiceCodes] = useState({});
  let [timeRanges, setTimeRanges] = useState([]);
  let [timeRange, setTimeRange] = useState("");
  let [serviceCode, setServiceCode] = useState("");
  let [locationCodes, setLocationCodes] = useState({});
  let [locationCode, setLocationCode] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = useState([new Date(), new Date()]);

  const dateOnChange = (stat) => {
    setDateValue(stat);
  };
  const handleChange = ({ target }) => {
    //validateForm();
    setFormData({ ...formData, [target.name]: target.value });
  };
  useEffect(() => {
    if (formData.reasonCode != "" && formData?.reasonCode !== undefined)
      fetchServiceCodes();
    if (formData.serviceCode != "" && formData?.serviceCode !== undefined)
      fetchLocationCodes();
    if (formData.locationCode != "" && formData?.locationCode !== undefined)
      fetchTimeRanges();
  }, [formData.reasonCode, formData.serviceCode, formData.locationCode]);

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  let timeRangeArr = [];
  function fetchTimeRanges() {
    try {
      if (formData?.locationCode != "" && formData?.locationCode !== undefined)
        fetch(
          "http://localhost:9095/simplybook/timeranges/" +
            formData.locationCode,
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            if (!data.error)
              Object.entries(data).forEach(([key, value]) => {
                timeRangeArr.push(key + " " + value);
              });
            setTimeRanges(timeRangeArr);
          });
    } catch (err) {
      console.log(err);
    }
  }
  function fetchServiceCodes() {
    try {
      if (formData?.reasonCode != "" && formData?.reasonCode !== undefined)
        fetch(
          "http://localhost:9095/simplybook/services/" + formData.reasonCode,
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            setServiceCodes(data);
          });
    } catch (err) {
      console.log(err);
    }
  }
  function fetchLocationCodes() {
    try {
      if (formData?.serviceCode != "" && formData?.serviceCode !== undefined)
        fetch(
          "http://localhost:9095/simplybook/service/" +
            formData.serviceCode +
            "/locations",
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            if (!data.error) setLocationCodes(data);
          });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    //fetchData();
  }, [""]);
  const navigate = useNavigate();
  const requestPostOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userId,
      reason: formData.reasonCode,
      reasonCode: formData.reasonCode,
      serviceCode: formData.serviceCode,
      locationCode: formData.locationCode,
      appointmentDate: new Date(dateValue).toISOString().replace("T", " "),
      appointmentTime: formData.timeRange,
      status: "OPEN",
    }),
  };
  const handleSubmit = async (evt) => {
    //validateForm();

    try {
      fetch(
        "http://localhost:9095/simplybook/user/appointment",
        requestPostOptions
      )
        .then((response) => response.json())
        .then((data) => {
          if (data?.error) {
            // setValidUserError("User already exists !!");
          } else {
            navigate("/landing/dashboard", { replace: true }, {});
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Book an Appointment</strong>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="reasonCode">
                    Select the Reason
                  </CFormLabel>
                  <CFormSelect
                    size="lg"
                    className="mb-3"
                    name="reasonCode"
                    onChange={handleChange}
                    onBlur={handleChange}
                    aria-label="Select Reason"
                  >
                    <option value="">Open this select menu</option>
                    <option value="HOSPITAL">Hospital</option>
                    <option value="BANK">Bank</option>
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="appointmentDateTime">
                    Pick the Date & Time slot
                  </CFormLabel>
                  <div>
                    <DatePicker
                      onChange={dateOnChange}
                      value={dateValue}
                      minDate={new Date()}
                      onKeyDown={(e) => {
                        e.preventDefault();
                      }}
                    />
                    <CFormSelect
                      size="lg"
                      className="mb-3"
                      name="timeRange"
                      onChange={handleChange}
                      onBlur={handleChange}
                      aria-label="Select Time Slot"
                    >
                      <option value="">Time Range</option>
                      {timeRanges.map((item) => {
                        return (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </CFormSelect>
                  </div>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="serviceCode">
                    Select the Service
                  </CFormLabel>
                  <CFormSelect
                    size="lg"
                    className="mb-3"
                    name="serviceCode"
                    onChange={handleChange}
                    onBlur={handleChange}
                    aria-label="Select Service"
                  >
                    <option value="">Open this select menu</option>
                    {Object.keys(serviceCodes).map((item) => {
                      return (
                        <option key={item} value={item}>
                          {serviceCodes[item]}
                        </option>
                      );
                    })}
                  </CFormSelect>
                </CCol>
                <CCol md={6}></CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="locationCode">
                    Select the Location
                  </CFormLabel>
                  <CFormSelect
                    size="lg"
                    className="mb-3"
                    name="locationCode"
                    onChange={handleChange}
                    onBlur={handleChange}
                    aria-label="Select Location"
                  >
                    <option value="">Open this select menu</option>
                    {Object.keys(locationCodes).map((item) => {
                      return (
                        <option key={item} value={item}>
                          {locationCodes[item]}
                        </option>
                      );
                    })}
                  </CFormSelect>
                </CCol>

                <CCol xs={12}>
                  <CButton
                    color="primary"
                    className="px-4"
                    onClick={handleSubmit}
                    disabled={false}
                  >
                    Book Appointment
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

export default BookAppointment;
