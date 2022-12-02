import React from "react";
import { CChartLine } from "@coreui/react-chartjs";
import CIcon from "@coreui/icons-react";
import { cilCalendar, cilHospital, cilAddressBook } from "@coreui/icons";
import { CCol, CRow, CWidgetStatsD, CNavLink } from "@coreui/react";
import { useState, useEffect } from "react";
import moment from "moment";
const Dashboard_Admin = () => {
  const userId = localStorage.getItem("user");
  let [appointmentsCount, setAppointmentsCount] = useState(0);
  let [messagesCount, setMessagesCount] = useState(0);
  let [locations, setLocations] = useState(0);
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  function fetchAppointments() {
    let appointmentsData = [];
    fetch(
      "http://localhost:9095/simplybook/user/" + userId + "/appointments",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data?.error === undefined) {
          data.map((item) => {
            let appointmentDate = moment(
              new Date(item.appointmentDate),
              moment.ISO_8601
            ).format("MM/DD/YYYY");
            let todayDate = moment(new Date(), moment.ISO_8601).format(
              "MM/DD/YYYY"
            );
            if (appointmentDate >= todayDate) {
              appointmentsData.push(item);
            }
          });
          setAppointmentsCount(appointmentsData.length);
        } else setAppointmentsCount(0);
      });
  }
  function fetchServices() {
    fetch("http://localhost:9095/simplybook/services/HOSPITAL", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMessagesCount(Object.keys(data).length);
      });
  }
  function fetchLocations() {
    fetch("http://localhost:9095/simplybook/locationsA", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setLocations(Object.keys(data).length);
      });
  }
  useEffect(() => {
    fetchAppointments();
    fetchServices();
    fetchLocations();
  }, [""]);
  return (
    <>
      <CRow>
        <CCol xs={3}>
          <CWidgetStatsD
            className="mb-3"
            icon={
              <CIcon
                className="my-4 text-white"
                icon={cilCalendar}
                height={52}
              />
            }
            chart={
              <CChartLine
                className="position-absolute w-100 h-100"
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                  ],
                  datasets: [
                    {
                      backgroundColor: "rgba(255,255,255,.2)",
                      borderColor: "rgba(255,255,255,.55)",
                      pointHoverBackgroundColor: "#fff",
                      borderWidth: 2,
                      data: [65, 59, 84, 84, 51, 55, 40],
                      fill: true,
                    },
                  ],
                }}
                options={{
                  elements: {
                    line: {
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                      hoverBorderWidth: 3,
                    },
                  },
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      display: false,
                    },
                  },
                }}
              />
            }
            style={{ "--cui-card-cap-bg": "#ff4500" }}
            values={[
              {
                title: "Open Appointments",
                value: <a href="/landing/appointments">{appointmentsCount}</a>,
              },
            ]}
          />
        </CCol>

        <CCol xs={3}>
          <CWidgetStatsD
            className="mb-3"
            icon={
              <CIcon
                className="my-4 text-white"
                icon={cilHospital}
                height={52}
              />
            }
            chart={
              <CChartLine
                className="position-absolute w-100 h-100"
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                  ],
                  datasets: [
                    {
                      backgroundColor: "rgba(255,255,255,.1)",
                      borderColor: "rgba(255,255,255,.55)",
                      pointHoverBackgroundColor: "#fff",
                      borderWidth: 2,
                      data: [1, 13, 9, 17, 34, 41, 38],
                      fill: true,
                    },
                  ],
                }}
                options={{
                  elements: {
                    line: {
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                      hoverBorderWidth: 3,
                    },
                  },
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      display: false,
                    },
                  },
                }}
              />
            }
            style={{ "--cui-card-cap-bg": "#00aced" }}
            values={[
              {
                title: "Services",
                value: <a href="/landing/services">{messagesCount}</a>,
              },
            ]}
          />
        </CCol>
        <CCol xs={3}>
          <CWidgetStatsD
            className="mb-3"
            icon={
              <CIcon
                className="my-4 text-white"
                icon={cilAddressBook}
                height={52}
              />
            }
            chart={
              <CChartLine
                className="position-absolute w-100 h-100"
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                  ],
                  datasets: [
                    {
                      backgroundColor: "rgba(255,255,255,.2)",
                      borderColor: "rgba(255,255,255,.55)",
                      pointHoverBackgroundColor: "#fff",
                      borderWidth: 2,
                      data: [65, 59, 84, 84, 51, 55, 40],
                      fill: true,
                    },
                  ],
                }}
                options={{
                  elements: {
                    line: {
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                      hoverBorderWidth: 3,
                    },
                  },
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      display: false,
                    },
                  },
                }}
              />
            }
            style={{ "--cui-card-cap-bg": "grey" }}
            values={[
              {
                title: "Covered Locations",
                value: <a href="/landing/locations">{locations}</a>,
              },
            ]}
          />
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard_Admin;
