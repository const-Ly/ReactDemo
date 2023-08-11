import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useRoutes } from "react-router-dom";

import AutoScrollToTop from "../components/AutoScrollToTop";
import MyLoading from "../components/MyLoading";
const Home = lazy(() => import("../pages/Home/Home"));
const CreateModel = lazy(() => import("../pages/CreateModel"));
const ConversationList = lazy(() => import("../pages/ConversationList"));
const Profile = lazy(() => import("../pages/Profile"));
const ConversationDetail = lazy(() => import("../pages/ConversationDetail"));


function GetRoutes() {
  const routes = useRoutes([
    {
      path:'/',
      element: <Home />
    },
    {
      path:'/profile',
      element: <Profile />
    },
    {
      path:'/create',
      element: <CreateModel />
    },
    {
      path:'/conversationList',
      element: <ConversationList />
    },
    {
      path:'/conversationDetail',
      element: <ConversationDetail />
    },
  ])
  return routes
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
