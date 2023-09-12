import "./Tag.scss";

const Tag = ({ text, color }) => {
    const bgColor = `#${color}`;
    return (
        <li className={"tag"} style={{ backgroundColor: bgColor }}>
            <span className="tag__text">{`#${text}`}</span>
        </li>
    );
};

export default Tag;
