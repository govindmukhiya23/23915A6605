import React from 'react';
import { User } from '../api/socialMedia';

interface UserCardProps {
  user: User;
  position?: number;
  profileImage: string;
}

const UserCard: React.FC<UserCardProps> = ({ user, position, profileImage }) => {
  // Random join date
  const randomMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][Math.floor(Math.random() * 12)];
  const randomYear = 2022 + Math.floor(Math.random() * 2);
  const joinDate = `${randomMonth} ${randomYear}`;

  return (
    <div className="p-3 hover:bg-gray-50 rounded-lg flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
          <img 
            src={profileImage} 
            alt={user.name} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div>
          <h5 className="font-medium">{user.name}</h5>
          <p className="text-xs text-gray-500">Joined {joinDate}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold">{user.postCount}</p>
        <p className="text-xs text-gray-500">posts</p>
      </div>
    </div>
  );
};

export default UserCard;
