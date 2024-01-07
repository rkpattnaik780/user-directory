import "./UserDetail.css";

interface IUserDetail {
    userData: any;
}

export const UserDetail:React.FC<IUserDetail> = ({ userData }) => (
    <div className="user-detail">
        <div>
            <p>{userData?.name}</p>
            <p>{userData?.username} | {userData?.company.catchPhrase}</p>
        </div>
        <div>
            <p>{`${userData?.address.street}, ${userData?.address.suite}, ${userData?.address.city}, ${userData?.address.zipcode}`}</p>
            <p>{userData?.email} | {userData?.phone}</p>
        </div>
    </div>
);