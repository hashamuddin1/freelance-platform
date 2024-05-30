import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import FirstPage from "layouts/authentication/first-page";
import Agent from "layouts/completeprofile/Agent";
import Client from "layouts/completeprofile/Client";
import QuizAgent from "layouts/authentication/quizAgent";
import ClientSignup from "layouts/authentication/client-signup";
import ClientSignin from "layouts/authentication/client-signiin";
import AgentDashboard from "layouts/agentdashboard";
import AgentOrder from "layouts/agentOrder";
import BankAccount from "layouts/bankAccount";
import ClientOrder from "layouts/clientOrder";
import ClientCard from "layouts/clientCard";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "",
    name: "Agent Dashboard",
    key: "agentdashboard",
    icon: <Icon fontSize="small">agentdashboard</Icon>,
    route: "/agent-dashboard",
    component: <AgentDashboard />,
  },
  {
    type: "",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "",
    name: "RTL",
    key: "rtl",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/rtl",
    component: <RTL />,
  },
  {
    type: "",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "",
    name: "AgentOrder",
    key: "agentorder",
    icon: <Icon fontSize="small">agentorder</Icon>,
    route: "/agentOrder",
    component: <AgentOrder />,
  },
  {
    type: "",
    name: "BankAccount",
    key: "BankAccount",
    icon: <Icon fontSize="small">bankAccount</Icon>,
    route: "/bankAccount",
    component: <BankAccount />,
  },
  {
    type: "",
    name: "ClientCard",
    key: "ClientCard",
    icon: <Icon fontSize="small">ClientCard</Icon>,
    route: "/ClientCard",
    component: <ClientCard />,
  },
  {
    type: "",
    name: "ClientOrder",
    key: "ClientOrder",
    icon: <Icon fontSize="small">ClientOrder</Icon>,
    route: "/clientOrder",
    component: <ClientOrder />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "",
    name: "First page",
    key: "first-page",
    icon: <Icon fontSize="small">first_page</Icon>,
    route: "/authentication/first-page",
    component: <FirstPage />,
  },
  {
    type: "",
    name: "Agent",
    key: "agent",
    icon: <Icon fontSize="small">agent</Icon>,
    route: "/completeprofile/Agent",
    component: <Agent />,
  },
  {
    type: "",
    name: "QuizAgent",
    key: "quizagent",
    icon: <Icon fontSize="small">quizAgent</Icon>,
    route: "/authentication/quizAgent",
    component: <QuizAgent />,
  },
  {
    type: "",
    name: "Client",
    key: "client",
    icon: <Icon fontSize="small">client</Icon>,
    route: "/completeprofile/Client",
    component: <Client />,
  },
  {
    type: "",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "",
    name: "Client Sign Up",
    key: "client-signup",
    icon: <Icon fontSize="small">ClientSignup</Icon>,
    route: "/authentication/client-signup",
    component: <ClientSignup />,
  },
  {
    type: "",
    name: "Client Sign In",
    key: "client-signin",
    icon: <Icon fontSize="small">ClientSignin</Icon>,
    route: "/authentication/client-signiin",
    component: <ClientSignin />,
  },
];

export default routes;
