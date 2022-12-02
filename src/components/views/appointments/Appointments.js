import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
} from "@coreui/react";
import { useState, useEffect, useMemo } from "react";
import Pagination from "../../Pagination";
import moment from "moment";
let PageSize = 5;
const Appointments = () => {
  const userId = localStorage.getItem("user");
  const [currentPage, setCurrentPage] = useState(1);
  const [appointments, setAppointmentData] = useState([]);
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  function fetchData() {
    fetch(
      "http://localhost:9095/simplybook/user/" + userId + "/appointments",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setAppointmentData(data);
      });
  }
  useEffect(() => {
    fetchData();
  }, [""]);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (
      (appointments && appointments.length === 0) ||
      appointments?.length === undefined
    ) {
    } else {
      return appointments.slice(firstPageIndex, lastPageIndex);
    }
  }, [currentPage, appointments]);
  if (appointments.error !== null && appointments.error !== undefined) {
    return (
      <>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong> No Appointments</strong>
              </CCardHeader>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  } else {
    return (
      <>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Appointments</strong>
              </CCardHeader>
              <CCardBody>
                <CTable hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Sl No</CTableHeaderCell>
                      <CTableHeaderCell>Reason</CTableHeaderCell>
                      <CTableHeaderCell>Service</CTableHeaderCell>
                      <CTableHeaderCell>Location</CTableHeaderCell>
                      <CTableHeaderCell>Booking Date</CTableHeaderCell>
                      <CTableHeaderCell>Time Slot</CTableHeaderCell>
                      <CTableHeaderCell>Status</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {currentTableData?.map((item) => {
                      var statusOption = "";
                      let appointmentDate = moment(
                        new Date(item.appointmentDate),
                        moment.ISO_8601
                      ).format("MM/DD/YYYY");
                      let todayDate = moment(
                        new Date(),
                        moment.ISO_8601
                      ).format("MM/DD/YYYY");
                      if (appointmentDate < todayDate) {
                        item.status = "CLOSED";
                        statusOption = (
                          <CTableDataCell>
                            <CBadge color="danger" shape="rounded-pill">
                              {item.status}
                            </CBadge>
                          </CTableDataCell>
                        );
                      } else if (new Date(appointmentDate >= todayDate)) {
                        statusOption = (
                          <CTableDataCell>
                            <CBadge color="success" shape="rounded-pill">
                              {item.status}
                            </CBadge>
                          </CTableDataCell>
                        );
                      }
                      return (
                        <CTableRow key="{item.id}">
                          <CTableDataCell>{item.id}</CTableDataCell>
                          <CTableDataCell>{item.reason}</CTableDataCell>
                          <CTableDataCell>{item.serviceCode}</CTableDataCell>
                          <CTableDataCell>{item.locationCode}</CTableDataCell>
                          <CTableDataCell>
                            {item.appointmentDate.substring(0, 10)}{" "}
                          </CTableDataCell>
                          <CTableDataCell>
                            {item.appointmentTime}
                          </CTableDataCell>
                          {statusOption}
                        </CTableRow>
                      );
                    })}
                  </CTableBody>
                </CTable>
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={appointments.length}
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
};
export default Appointments;
