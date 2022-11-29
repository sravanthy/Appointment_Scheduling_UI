import React from "react";
import { CChartLine } from "@coreui/react-chartjs";
import CIcon from "@coreui/icons-react";
import { cilCalendar, cilEnvelopeClosed } from "@coreui/icons";
import { CCol, CRow, CWidgetStatsD, CNavLink } from "@coreui/react";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const userId = localStorage.getItem("user");
  let [appointmentsCount, setAppointmentsCount] = useState(0);
  let [messagesCount, setMessagesCount] = useState(0);
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  function fetchAppointments() {
    fetch(
      "http://localhost:9095/simplybook/user/" + userId + "/appointments",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data?.error === undefined) {
          setAppointmentsCount(data.length);
        } else setAppointmentsCount(0);
      });
  }
  function fetchMessages() {
    fetch(
      "http://localhost:9095/simplybook/user/" + userId + "/messages",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data?.error === undefined) {
          setMessagesCount(data.length);
        } else setMessagesCount(0);
      });
  }
  useEffect(() => {
    fetchAppointments();
    fetchMessages();
  }, [""]);
  return (
    <>
      <CRow>
        <CCol xs={6}>
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
                title: "Appointments",
                value: <a href="/landing/appointments">{appointmentsCount}</a>,
              },
            ]}
          />
        </CCol>
        <CCol xs={6}>
          <CWidgetStatsD
            className="mb-3"
            icon={
              <CIcon
                className="my-4 text-white"
                icon={cilEnvelopeClosed}
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
                title: "Messages",
                value: <a href="/landing/messages">{messagesCount}</a>,
              },
            ]}
          />
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
