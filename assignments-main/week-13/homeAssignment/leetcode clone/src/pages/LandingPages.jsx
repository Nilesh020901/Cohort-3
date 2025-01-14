import React from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ProgressCard from "../components/ProgressCard";
import QuestionList from "../components/QuestionList";
import { useRecoilValue } from "recoil";
import { questionState } from "../recoil/atoms";

const LandingPage = () => {
    // const questions = useRecoilValue(questionState);

    return(
        <div className="flex h-screen bg-black-900">
            <Sidebar />
            <div className="grid grid-cols-5 w-full px-10 py-7 gap-10">
                <div className="col-span-2">
                    <Header />
                </div>
                <div className="col-span-3">
                    <QuestionList />
                </div>
                {/* <QuestionList questions={questions} /> */}
            </div>
        </div>
    );
};

export default LandingPage;