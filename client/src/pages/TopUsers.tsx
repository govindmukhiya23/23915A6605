import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '../components/MainLayout';
import StatCard from '../components/StatCard';
import UserCard from '../components/UserCard';
import BarChart from '../components/charts/BarChart';
import { fetchUsers, fetchPosts, User, getRandomProfileImage } from '../api/socialMedia';

const TopUsers: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('7days');
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [userImages, setUserImages] = useState<{[key: number]: string}>({});
  
  // Fetch users data
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['/api/users'],
    queryFn: fetchUsers
  });
  
  // Fetch posts data
  const { data: posts, isLoading: isLoadingPosts } = useQuery({
    queryKey: ['/api/posts'],
    queryFn: fetchPosts
  });
  
  useEffect(() => {
    if (users && posts) {
      // Calculate post count for each user
      const userPostCounts = users.map(user => {
        const postCount = posts.filter(post => post.userId === user.id).length;
        return {
          ...user,
          postCount
        };
      });
      
      // Sort users by post count (descending)
      const sortedUsers = [...userPostCounts].sort((a, b) => (b.postCount || 0) - (a.postCount || 0));
      
      // Get top 5 users
      const top5Users = sortedUsers.slice(0, 5);
      
      // Generate random profile images for users
      const images: {[key: number]: string} = {};
      top5Users.forEach(user => {
        images[user.id] = getRandomProfileImage();
      });
      
      setUserImages(images);
      setTopUsers(top5Users);
    }
  }, [users, posts]);
  
  // Prepare data for charts
  const chartData = topUsers.map(user => ({
    name: user.name?.split(' ')[0] || 'User',
    value: user.postCount || 0
  }));
  
  // Calculate stats
  const totalUsers = users?.length || 0;
  const totalPosts = posts?.length || 0;
  const avgPostsPerUser = totalUsers > 0 ? (totalPosts / totalUsers).toFixed(2) : '0';
  const topUserPosts = topUsers[0]?.postCount || 0;
  
  return (
    <MainLayout title="Top Users">
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h3 className="text-2xl font-bold">Top Users 🏆</h3>
          <div className="mt-2 md:mt-0">
            <button className="bg-gray-200 px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Data
            </button>
          </div>
        </div>
        
        {/* Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Users"
            value={totalUsers}
            change={{
              value: "12% compared to last week",
              isPositive: true
            }}
          />
          
          <StatCard
            title="Total Posts"
            value={totalPosts}
            change={{
              value: "8% compared to last week",
              isPositive: true
            }}
          />
          
          <StatCard
            title="Avg. Posts per User"
            value={avgPostsPerUser}
            change={{
              value: "3% compared to last week",
              isPositive: false
            }}
          />
          
          <StatCard
            title="Top User Posts"
            value={topUserPosts}
            change={{
              value: "18% compared to last week",
              isPositive: true
            }}
          />
        </div>
        
        {/* Top Users Chart & List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Users Chart */}
          <div className="lg:col-span-2">
            <BarChart 
              data={chartData}
              title="User Activity Distribution"
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange}
            />
          </div>
          
          {/* Top Users List */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h4 className="font-semibold">Top 5 Users by Posts</h4>
            </div>
            <div className="p-2">
              <div className="space-y-1">
                {isLoadingUsers || isLoadingPosts ? (
                  <div className="p-4 text-center">Loading top users...</div>
                ) : (
                  topUsers.map((user, index) => (
                    <UserCard 
                      key={user.id}
                      user={user}
                      position={index + 1}
                      profileImage={userImages[user.id]}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default TopUsers;
