import React from "react";
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
        <Sidebar />
        <div>
          <div>
            <ProfileCard />
            <Greeting />
          </div>
          <div>
            <WebinarList />
            <QuickAction />
          </div>
        </div>
      </div>
    </>
  );
};

export default App
