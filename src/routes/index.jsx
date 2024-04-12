import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, useRoutes, Navigate } from "react-router-dom";

import AutoScrollToTop from "../components/AutoScrollToTop";
import MyLoading from "../components/MyLoading";
import AuthRoute from "../components/AuthRoute";
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const CreateModel = lazy(() => import("../pages/CreateModel"));
const ConversationList = lazy(() => import("../pages/ConversationList"));
const Profile = lazy(() => import("../pages/Profile"));
const ConversationDetail = lazy(() => import("../pages/ConversationDetail"));

function GetRoutes() {
  const routes = useRoutes([
    {
      path: "/login",
      element: (
        <Login />
      ),
    },
    {
      path: "/",
      element: (
        <AuthRoute>
          <Home />
        </AuthRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <AuthRoute>
          <Profile />
        </AuthRoute>
      ),
    },
    {
      path: "/create",
      element: (
        <AuthRoute>
          <CreateModel />
        </AuthRoute>
      ),
    },
    {
      path: "/conversationList",
      element: (
        <AuthRoute>
          <ConversationList />
        </AuthRoute>
      ),
    },
    {
      path: "/conversationDetail/:agentId",
      element: (
        <AuthRoute>
          <ConversationDetail />
        </AuthRoute>
      ),
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);
  return routes;
}

const AppRouter = () => {
  return (
    <Suspense fallback={<MyLoading />}>
      <Router>
        <AutoScrollToTop>
          <GetRoutes />
          {/* <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/create" element={<CreateModel />} />
            <Route path="/conversationList" element={<ConversationList />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/conversationDetail/:agentId"
              element={<ConversationDetail />}
            />
          </Routes> */}
        </AutoScrollToTop>
      </Router>
    </Suspense>
  );
};

export default AppRouter;
