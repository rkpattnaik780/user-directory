import { useEffect, useState } from "react";
import { Post } from "../../components/Post/Post";
import { UserDetail } from "../../components/UserDetail/UserDetail";
import { UserHeader } from "../../components/UserHeader/UserHeader";
import "./UserPage.css";
import { PostsURL, UsersURL } from "../../constant/constant";
import { useParams } from 'react-router-dom';

export const UserPage = () => {
    const [posts, setPosts] = useState<any[]>();
    const [userData, setUserData] = useState<any>();
    const { id: userId } = useParams();

    useEffect(() => {
        fetch(PostsURL).then(res => res.json()).then(items => {
            let filteredPosts = items.filter((item: any) => {
                return item.userId == userId;
            });
            setPosts(filteredPosts);
        });
    }, []);

    useEffect(() => {
        fetch(`${UsersURL}/${userId}`).then(res => res.json()).then(data => {
            setUserData(data);
        });
    }, []);

    return (
        <section className="user-page">
            <UserHeader />
            <h1 className="user-page-header">Profile Page</h1>
            <UserDetail userData={userData} />
            <div className="user-posts">
                {
                    posts?.map(post => <Post title={post.title} content={post.body} key={post.id}/>)
                }
            </div>
        </section>
    );
};