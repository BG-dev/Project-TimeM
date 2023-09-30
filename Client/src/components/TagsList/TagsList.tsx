import React from "react";
import "./TagsList.scss";
import { AddTagButton, Tag } from "..";
import ITag from "../../types/tag";

interface ITagsListProps {
    tags: ITag[];
    setTags?: React.Dispatch<React.SetStateAction<ITag[]>>;
    isRead?: boolean;
}

const TagsList = ({ tags, setTags, isRead }: ITagsListProps) => {
    return (
        <>
            {!isRead && <label>Tags</label>}
            <ul className="tags-list">
                {tags.map((tag, index) => {
                    return <Tag key={tag.text + index} tag={tag} />;
                })}
                {!isRead && <AddTagButton tags={tags} setTags={setTags} />}
            </ul>
        </>
    );
};

export default TagsList;
