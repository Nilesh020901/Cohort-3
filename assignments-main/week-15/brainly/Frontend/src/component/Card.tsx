import React from "react";
import { TweetIcon } from "../icons/TweetIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { PodcastIcon } from "../icons/AudioIcon";
import { CodeSnippetIcon } from "../icons/CodeSnippetIcon";
import { DocumentsIcon } from "../icons/DocumentsIcon";
import { EBookIcon } from "../icons/EbookIcon";
import { ImageIcon } from "../icons/ImageIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { MemoryIcon } from "../icons/MemoryIcon";

interface CardProps {
    title: string;
    link?: string;
    tags: string[];
    dateAdded: string;
    type: "twitter" | "youtube" | "podcast" | "code" | "document" | "ebook" | "image" | "link";
}

const iconMap: Record<string, JSX.Element> = {
    twitter: <TweetIcon />,
    youtube: <YoutubeIcon />,
    podcast: <PodcastIcon />,
    code: <CodeSnippetIcon />,
    document: <DocumentsIcon />,
    ebook: <EBookIcon />,
    image: <ImageIcon />,
    link: <LinkIcon />,
}

export const Card: React.FC<CardProps> = ({ title, link, tags, dateAdded, type }) => {
    const renderIcon = () => iconMap[type] || <MemoryIcon />
};

return (
    <div></div>
)