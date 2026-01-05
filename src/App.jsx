import { Routes, Route } from "react-router-dom";
// import Otp from "./pages/auth/Otp";
// import { ContextProvider } from "./context/Context";
import LandingPage from "./pages/auth/LandingPage";
import Login from "./pages/auth/Login";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import TaskManager from "./pages/dashboard/TaskManager";
import Estates from "./components/estates/Estates";
import Notification from "./pages/dashboard/Notification";
import Payment from "./pages/dashboard/Payment";
import Feedback from "./pages/dashboard/Feedback";
import Employees from "./pages/dashboard/Employees";
import ScrollTop from "./components/top/ScrollTop";
import UserDetails from "./components/user/UserDetails";
import UserFeedback from "./components/feedback/UserFeedback";
import Prototype from "./pages/dashboard/Prototype";
import Leads from "./pages/dashboard/Leads";
import Invoice from "./pages/dashboard/Invoice";
import Subscribers from "./pages/dashboard/Subscribers";
import EstateLayOut from "./layout/EstateLayOut";
import Configuration from "./pages/dashboard/Configuration";

function App() {
  return (
    // <ContextProvider>
    <>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="admin-login" element={<Login />} />
        <Route path="" element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/task-manager" element={<TaskManager />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/estates" element={<EstateLayOut />}>
            <Route path="" element={<Estates />} />
            <Route path="prototypes" element={<Prototype />} />
          </Route>
          <Route path="/leads" element={<Leads />} />
          <Route path="/invoices" element={<Invoice />} />
          <Route path="/subscribers" element={<Subscribers />} />
          <Route path="/configuration" element={<Configuration />} />
          <Route path="/user/:userId" element={<UserDetails />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/feedback/:feedbackId" element={<UserFeedback />} />
        </Route>
      </Routes>
    </>
    // </ContextProvider>
  );
}

export default App;
