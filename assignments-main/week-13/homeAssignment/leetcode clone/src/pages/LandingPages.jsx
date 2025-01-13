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
        <div className="flex h-screen bg-zinc-900">
            <Sidebar />
            <div className="flex-1 bg-gray-900 p-4">
                <Header />
                <div className="flex mt-4">
                    <ProgressCard />
                </div>
                {/* <QuestionList questions={questions} /> */}
            </div>
        </div>
    );
};

export default LandingPage;