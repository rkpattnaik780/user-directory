import { Link } from "react-router-dom";
import "./User.css";

interface IUser {
    name: string;
    posts: number;
}

export const User: React.FC<IUser> = ({ name, posts}) => (
    <Link className="user-card" to="/1">
        <span className="user-name">Name: {name}</span>
        <span>Posts: {posts}</span>
    </Link>
);