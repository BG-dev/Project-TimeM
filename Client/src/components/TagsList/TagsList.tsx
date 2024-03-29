import React from 'react';
import AddTagButton from './AddTagButton';
import Tag from '../Tag';
import ITag from '../../types/tag';
import './TagsList.scss';

interface ITagsListProps {
    tags: ITag[];
    setTags?: React.Dispatch<React.SetStateAction<ITag[]>>;
    isRead?: boolean;
}

function TagsList({ tags, setTags, isRead }: ITagsListProps) {
    return (
        <>
            {!isRead && <p>Tags</p>}
            <ul className="tags-list">
                {tags.map((tag) => (
                    <Tag key={tag.text} tag={tag} />
                ))}
                {!isRead && <AddTagButton tags={tags} setTags={setTags} />}
            </ul>
        </>
    );
}

export default TagsList;
