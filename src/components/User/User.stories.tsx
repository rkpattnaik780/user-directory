import { User } from './User';
import { MemoryRouter } from "react-router";

export default {
  component: User,
  title: 'User',
}

export const user = () => (
    <MemoryRouter>
        <User
            name='Ramakrishna Pattnaik'
            posts={78}
        />
    </MemoryRouter>
  );