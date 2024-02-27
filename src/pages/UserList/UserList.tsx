import { useEffect, useState } from "react";
import { User } from "components/User";
import { PostsURL, UsersURL } from "constant";
import "./UserList.css";
import { useFetchUsers } from "hooks/useFetchUsers";

const getUsers = async(users) => {
    const fetchPosts = await fetch(PostsURL);

    const posts = await fetchPosts.json();

    const usersWithPosts = users.map((user: any) => {
        return {
            name: user.name,
            posts: posts.filter((post: any) => post.userId === user.id).length
        }
    });

    return usersWithPosts;
}

export const UserList = () => {

    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

    const [users, _] = useFetchUsers(UsersURL);

    useEffect(() => {
        getUsers(users).then(data => {
            setFilteredUsers(data);
        });
    }, [users]);

    return (
        <>
            <h1 className="user-list-header">Directory</h1>
            {
                filteredUsers?.map((user, index) => (
                    <User name={user.name} posts={user.posts} key={index} />
                ))
            }
        </>
    );
};