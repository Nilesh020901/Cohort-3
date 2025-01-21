import React from "react";

interface CardProps {
    title: string;
    link: string;
    tags: string[];
    dateAdded: string;
    type: "twitter" | "youtube" | "podcast" | "code" | "document" | "ebook" | "image" | "link"
}