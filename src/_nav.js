import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilCalendarCheck,
  cilEnvelopeClosed,
  cilHome,
  cilList,
  cilUser,
} from "@coreui/icons";
import { CNavItem } from "@coreui/react";
let _nav = [];
if ("ADMIN" === localStorage.getItem("role"))
  _nav = [
    {
      component: CNavItem,
      name: "Dashboard",
      to: "/landing/dashboard",
      icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    },
  ];
else
  _nav = [
    {
      component: CNavItem,
      name: "Dashboard",
      to: "/landing/dashboard",
      icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: "Booking",
      to: "/landing/bookingAppointment",
      icon: <CIcon icon={cilCalendarCheck} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: "Messages",
      to: "/landing/messages",
      icon: <CIcon icon={cilEnvelopeClosed} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: "Appointments",
      to: "/landing/appointments",
      icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: "Profile",
      to: "/landing/profile",
      icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },
  ];

export default _nav;
