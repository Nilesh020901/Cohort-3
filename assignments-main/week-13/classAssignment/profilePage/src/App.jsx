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
        <div className="flex h-screen bg-slate-50 pb-5">
          <div className="h-screen">
            <Sidebar />
          </div>
          <div>
            <div><Header /></div>
            <div className="grid grid-cols-9 gap-8 w-full px-10 ">
              <div className="col-span-9 md:col-span-2">
                <ProfileCard />
              </div>
              <div className="col-span-9 md:col-span-7">
                <Greeting />
                <div className="grid grid-cols-7 gap-8">
                  <WebinarList />
                  <QuickAction />
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default App
