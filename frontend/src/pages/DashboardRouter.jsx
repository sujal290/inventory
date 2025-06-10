import React from "react";
import EmployeeDashboard from "../components/employee/EmployeeDashboard";
import InventoryDashboard from "../components/inventory/InventoryDashboard";
import GroupADDashboard from "../components/groupad/GroupADDashboard";

export default function DashboardRouter() {
  const role = localStorage.getItem("role");

  if (role === "employee") return <EmployeeDashboard />;
  if (role === "inventory_holder") return <InventoryDashboard />;
  if (role === "group_ad") return <GroupADDashboard />;
  return <div>Invalid role</div>;
}
