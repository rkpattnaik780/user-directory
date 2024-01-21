import { useEffect, useState } from "react";
import { User } from "components/User";
import { PostsURL, UsersURL } from "constant";
import "./UserList.css";

export const UserList = () => {

    const [users, setUsers] = useState<any[]>();

    const getUsers = async() => {
        const fetchUsers = await fetch(UsersURL)
        const fetchPosts = await fetch(PostsURL);

        const users = await fetchUsers.json();
        const posts = await fetchPosts.json();

        const usersWithPosts = users.map((user: any) => {
            return {
                name: user.name,
                posts: posts.filter((post: any) => post.userId === user.id).length
            }
        });

        return usersWithPosts;
    }

    useEffect(() => {
        getUsers().then(data => {
            setUsers(data);
        });
    }, []);

    return (
        <>
            <h1 className="user-list-header">Directory</h1>
            {
                users?.map((user, index) => (
                    <User name={user.name} posts={user.posts} key={index} />
                ))
            }
        </>
    );
};