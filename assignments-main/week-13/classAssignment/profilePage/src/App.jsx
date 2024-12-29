import React from "react";
import Header from "./components/Header";
import Sidebar from './components/Sidebar';
import ProfileCard from './components/ProfileCard';
import Greeting from './components/Greeting';
import WebinarList from "./components/WebinarList";
import QuickAction from "./components/QuickAction";

function App() {

  return (
    <>
      <div>
        <Header />
        <div className="flex">
          <Sidebar />
          <div className="flex">
            <div>
              <ProfileCard />
            </div>
            <div>
              <Greeting />
              <WebinarList />
            </div>
            <div><QuickAction /></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App
