import "./Post.css";

interface IPost {
    title: string;
    content: string;
}

export const Post: React.FC<IPost> = ({ title, content }) => (
    <div className="post">
        <h1>
            {title}
        </h1>
        <p>
            {content}
        </p>
    </div>
);