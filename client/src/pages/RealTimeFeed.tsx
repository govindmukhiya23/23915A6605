import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '../components/MainLayout';
import StatCard from '../components/StatCard';
import PostCard from '../components/PostCard';
import { fetchUsers, fetchPosts, User, Post, getRandomPostImage, getRandomProfileImage } from '../api/socialMedia';

const RealTimeFeed: React.FC = () => {
  const [sortOption, setSortOption] = useState('recent');
  const [feedPosts, setFeedPosts] = useState<Post[]>([]);
  const [postImages, setPostImages] = useState<{[key: number]: string}>({});
  const [userImages, setUserImages] = useState<{[key: number]: string}>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Fetch users data
  const { data: users } = useQuery({
    queryKey: ['/api/users'],
    queryFn: fetchUsers
  });
  
  // Fetch posts data
  const { data: posts, isLoading: isLoadingPosts, refetch } = useQuery({
    queryKey: ['/api/posts'],
    queryFn: fetchPosts,
    refetchInterval: 30000 // Refetch every 30 seconds
  });
  
  // Update feed when posts data changes - simplified for beginners
  useEffect(() => {
    if (!posts || !users) return;
    
    // Create a map of users by ID for quick lookup
    const userMap = new Map<number, User>();
    users.forEach(user => userMap.set(user.id, user));
    
    // Add user info to posts
    const postsWithUsers = posts.map(post => ({
      ...post,
      user: userMap.get(post.userId)
    }));
    
    // Sort posts based on selected option - keeping this simple
    let sortedPosts = [...postsWithUsers];
    
    // Simple sort by ID
    sortedPosts.sort((a, b) => b.id - a.id);
    
    // Generate random images - simplified
    const pImages: {[key: number]: string} = {};
    const uImages: {[key: number]: string} = {};
    
    sortedPosts.forEach(post => {
      pImages[post.id] = getRandomPostImage();
      if (post.userId) {
        uImages[post.userId] = getRandomProfileImage();
      }
    });
    
    setPostImages(pImages);
    setUserImages(uImages);
    setFeedPosts(sortedPosts);
  }, [posts, users]);
  
  // Function to refresh data
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };
  
  // Stats for cards
  const newPostsToday = Math.floor(Math.random() * 150) + 50;
  const activeUsers = Math.floor(Math.random() * 400) + 200;
  const engagementRate = (Math.random() * 6 + 2).toFixed(1);
  
  return (
    <MainLayout title="Real-time Feed">
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h3 className="text-2xl font-bold">Real-time Feed 📢</h3>
          <div className="mt-2 md:mt-0 flex space-x-2">
            <button 
              className={`bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 flex items-center ${isRefreshing ? 'opacity-75' : ''}`}
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <select 
              className="bg-gray-200 px-4 py-2 rounded-lg text-sm text-gray-700"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="commented">Most Commented</option>
            </select>
          </div>
        </div>
        
        {/* Feed Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="New Posts Today"
            value={newPostsToday}
            change={{
              value: "18% compared to yesterday",
              isPositive: true
            }}
          />
          
          <StatCard
            title="Active Users"
            value={activeUsers}
            change={{
              value: "7% compared to yesterday",
              isPositive: true
            }}
          />
          
          <StatCard
            title="Engagement Rate"
            value={`${engagementRate}%`}
            change={{
              value: "2% compared to yesterday",
              isPositive: false
            }}
          />
        </div>
        
        {/* Real-time Feed Posts */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h4 className="font-semibold">Latest Posts</h4>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-500">Live Updating</span>
            </div>
          </div>
          
          <div className="divide-y">
            {isLoadingPosts ? (
              <div className="p-8 text-center">Loading posts...</div>
            ) : feedPosts.length > 0 ? (
              feedPosts.map(post => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  isCompact={true}
                  postImage={Math.random() > 0.3 ? postImages[post.id] : undefined} // Only show images for ~70% of posts
                  userImage={post.userId ? userImages[post.userId] : undefined}
                />
              ))
            ) : (
              <div className="p-8 text-center">No posts available</div>
            )}
          </div>
          
          <div className="p-4 border-t text-center">
            <button className="text-blue-600 font-medium hover:text-blue-700">
              Load More Posts
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default RealTimeFeed;
