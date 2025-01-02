import { atom } from "recoil";

export const questionState = atom({
    key: "questionState",
    default: [
        { id: 1, title: "Best Time to Buy and Sell Stock", difficulty: "Easy" },
        { id: 2, title: "Merge Sorted Array", difficulty: "Easy" },
        { id: 3, title: "Reverse Linked List", difficulty: "Medium" },
    ],
});