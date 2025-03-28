import axios from 'axios';

// Define types for our data models
export interface User {
  id: number;
  username: string;
  name: string;
  postCount?: number; // Calculated on frontend
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  content: string;
  timestamp?: string;
  user?: User;
  commentCount?: number; // Calculated on frontend
}

export interface Comment {
  id: number;
  postId: number;
  content: string;
}

// Base API URL
const API_BASE_URL = 'http://20.244.56.144/test';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get('/users');
    return response.data.users || [];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await api.get('/posts');
    return response.data.posts || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const fetchComments = async (postId: number): Promise<Comment[]> => {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data.comments || [];
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    throw error;
  }
};

// Utility function to get a random profile image URL
export const getRandomProfileImage = (): string => {
  const profileImages = [
    'https://randomuser.me/api/portraits/men/1.jpg',
    'https://randomuser.me/api/portraits/women/1.jpg',
    'https://randomuser.me/api/portraits/men/2.jpg',
    'https://randomuser.me/api/portraits/women/2.jpg',
    'https://randomuser.me/api/portraits/men/3.jpg',
    'https://randomuser.me/api/portraits/women/3.jpg',
    'https://randomuser.me/api/portraits/men/4.jpg',
    'https://randomuser.me/api/portraits/women/4.jpg',
    'https://randomuser.me/api/portraits/men/5.jpg',
    'https://randomuser.me/api/portraits/women/5.jpg',
  ];
  
  return profileImages[Math.floor(Math.random() * profileImages.length)];
};

// Utility function to get a random post image URL
export const getRandomPostImage = (): string => {
  const postImages = [
    'https://source.unsplash.com/random/800x600/?technology',
    'https://source.unsplash.com/random/800x600/?nature',
    'https://source.unsplash.com/random/800x600/?food',
    'https://source.unsplash.com/random/800x600/?travel',
    'https://source.unsplash.com/random/800x600/?business',
    'https://source.unsplash.com/random/800x600/?coding',
    'https://source.unsplash.com/random/800x600/?office',
    'https://source.unsplash.com/random/800x600/?workspace',
    'https://source.unsplash.com/random/800x600/?health',
    'https://source.unsplash.com/random/800x600/?fitness',
  ];
  
  return postImages[Math.floor(Math.random() * postImages.length)];
};
