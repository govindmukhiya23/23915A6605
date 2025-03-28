import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '../components/MainLayout';
import StatCard from '../components/StatCard';
import PostCard from '../components/PostCard';
import LineChart from '../components/charts/LineChart';
import { fetchUsers, fetchPosts, fetchComments, Post, User, getRandomPostImage, getRandomProfileImage } from '../api/socialMedia';

const TrendingPosts: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('24hours');
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [postImages, setPostImages] = useState<{[key: number]: string}>({});
  const [userImages, setUserImages] = useState<{[key: number]: string}>({});
  
  // Fetch users data
  const { data: users } = useQuery({
    queryKey: ['/api/users'],
    queryFn: fetchUsers
  });
  
  // Fetch posts data
  const { data: posts, isLoading: isLoadingPosts } = useQuery({
    queryKey: ['/api/posts'],
    queryFn: fetchPosts
  });
  
  // Calculate total comments and get trending posts
  useEffect(() => {
    if (!posts || !users) return;
    
    const fetchAllComments = async () => {
      // Create a map of users by ID for quick lookup
      const userMap = new Map(users.map(user => [user.id, user]));
      
      // Fetch comments for each post and count them
      const postsWithCommentCounts = await Promise.all(
        posts.map(async (post) => {
          try {
            const comments = await fetchComments(post.id);
            // Add user info and comment count to post
            return {
              ...post,
              user: userMap.get(post.userId),
              commentCount: comments.length
            };
          } catch (error) {
            console.error(`Error fetching comments for post ${post.id}:`, error);
            return {
              ...post,
              user: userMap.get(post.userId),
              commentCount: 0
            };
          }
        })
      );
      
      // Sort by comment count (descending)
      const sortedPosts = [...postsWithCommentCounts].sort((a, b) => 
        (b.commentCount || 0) - (a.commentCount || 0)
      );
      
      // Find the highest comment count
      const maxCommentCount = sortedPosts[0]?.commentCount || 0;
      
      // Get all posts with the maximum comment count
      const maxCommentedPosts = sortedPosts.filter(post => 
        post.commentCount === maxCommentCount
      );
      
      // Generate random images for posts
      const pImages: {[key: number]: string} = {};
      const uImages: {[key: number]: string} = {};
      
      maxCommentedPosts.forEach(post => {
        pImages[post.id] = getRandomPostImage();
        if (post.userId) {
          uImages[post.userId] = getRandomProfileImage();
        }
      });
      
      setPostImages(pImages);
      setUserImages(uImages);
      setTrendingPosts(maxCommentedPosts);
    };
    
    fetchAllComments();
  }, [posts, users]);
  
  // Prepare chart data - comment distribution over time
  const chartData = [
    { name: 'Mon', value: Math.floor(Math.random() * 100) + 50 },
    { name: 'Tue', value: Math.floor(Math.random() * 100) + 50 },
    { name: 'Wed', value: Math.floor(Math.random() * 100) + 50 },
    { name: 'Thu', value: Math.floor(Math.random() * 100) + 50 },
    { name: 'Fri', value: Math.floor(Math.random() * 100) + 50 },
    { name: 'Sat', value: Math.floor(Math.random() * 100) + 50 },
    { name: 'Sun', value: Math.floor(Math.random() * 100) + 50 },
  ];
  
  // Calculate stats
  const totalComments = trendingPosts.reduce((sum, post) => sum + (post.commentCount || 0), 0);
  const avgCommentsPerPost = posts && posts.length > 0 
    ? (totalComments / posts.length).toFixed(2) 
    : '0';
  const maxComments = trendingPosts[0]?.commentCount || 0;
  
  return (
    <MainLayout title="Trending Posts">
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h3 className="text-2xl font-bold">Trending Posts 🔥</h3>
          <div className="mt-2 md:mt-0 flex items-center space-x-2">
            <button className="bg-gray-200 px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg> 
              Filter
            </button>
            <select 
              className="bg-gray-200 px-4 py-2 rounded-lg text-sm text-gray-700"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="24hours">Last 24 hours</option>
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
            </select>
          </div>
        </div>
        
        {/* Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Comments"
            value={totalComments}
            change={{
              value: "15% compared to last week",
              isPositive: true
            }}
          />
          
          <StatCard
            title="Avg. Comments/Post"
            value={avgCommentsPerPost}
            change={{
              value: "2% compared to last week",
              isPositive: false
            }}
          />
          
          <StatCard
            title="Max Comments"
            value={maxComments}
            change={{
              value: "27% compared to last week",
              isPositive: true
            }}
          />
          
          <StatCard
            title="Avg. Response Time"
            value="4.2h"
            change={{
              value: "Improved by 12%",
              isPositive: true
            }}
          />
        </div>
        
        {/* Top Comment Post Cards */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold">Most Commented Posts</h4>
          
          {isLoadingPosts ? (
            <div className="text-center py-10">Loading trending posts...</div>
          ) : trendingPosts.length > 0 ? (
            trendingPosts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                postImage={postImages[post.id]}
                userImage={post.userId ? userImages[post.userId] : undefined}
              />
            ))
          ) : (
            <div className="text-center py-10">No trending posts found</div>
          )}
          
          {/* Comment Distribution Chart */}
          <LineChart 
            data={chartData}
            title="Comment Distribution Over Time"
          />
        </div>
      </section>
    </MainLayout>
  );
};

export default TrendingPosts;
