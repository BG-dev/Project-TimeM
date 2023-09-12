import React from "react";
import "./TagsList.scss";
import { AddTagButton, Tag } from "..";

const TagsList = ({ tags, setTags, isRead }) => {
    return (
        <>
            {!isRead && <label>Tags</label>}
            <ul className="tags-list">
                {tags.map((tag, index) => {
                    return <Tag key={tag.text + index} {...tag} />;
                })}
                {!isRead && <AddTagButton tags={tags} setTags={setTags} />}
            </ul>
        </>
    );
};

export default TagsList;
