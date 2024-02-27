import { Post } from "./Post";

export default {
    component: Post,
    title: 'Post',
}

export const post = () => (
    <Post title="Hello Storybook" content="Story book rocks! Helps in testing" />
)

