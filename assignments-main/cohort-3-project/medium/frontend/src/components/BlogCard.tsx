import { Link } from 'react-router-dom';
import Avatar from 'Avataar';
import ShareBtn from './ShareBtn';
import Preview from './Preview';
import EditBtn from './EditBtn';
import DeleteBtn from './DeleteBtn';

interface BlogCardProps {
    authorName: string;
    authorId: string;
    title: string;
    content: string;
    id: string;
    publisedDate: string;
}

export default function BlogCard({
    authorName,
    authorId,
    title,
    content,
    id,
    publisedDate,
}: BlogCardProps) {
    return (
        <div className='pb-3 border-b border-slate-200'>
            <div className='flex items-center justify-center gap-2 hover:scale-105'>
                <Avataar name={authorName} />
                <div className='text-base first-letter:uppercase'>
                    {authorName}{" "}
                </div>
            </div>
        </div>
    )
}


