import { Routes, Route } from 'react-router-dom';
import { UserList } from './pages/UserList/UserList';
import { UserPage } from './pages/UserPage/UserPage';

export const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/:id" element={<UserPage />} />
    </Routes>
);