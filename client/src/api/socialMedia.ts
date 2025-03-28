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

// Sample data for beginner level
const sampleUsers: User[] = [
  { id: 1, username: 'user1', name: 'John Doe', postCount: 35 },
  { id: 2, username: 'user2', name: 'Jane Smith', postCount: 28 },
  { id: 3, username: 'user3', name: 'Mike Johnson', postCount: 21 },
  { id: 4, username: 'user4', name: 'Sarah Williams', postCount: 15 },
  { id: 5, username: 'user5', name: 'David Brown', postCount: 12 }
];

const samplePosts: Post[] = [
  { id: 1, userId: 1, title: 'Getting Started with React', content: 'React is a popular JavaScript library for building user interfaces.', commentCount: 25 },
  { id: 2, userId: 2, title: 'Data Visualization Techniques', content: 'Learn how to present data in a visual and engaging way.', commentCount: 18 },
  { id: 3, userId: 3, title: 'Responsive Design Tips', content: 'Make your website look great on all devices with these responsive design tips.', commentCount: 12 },
  { id: 4, userId: 4, title: 'JavaScript Best Practices', content: 'Follow these best practices to write clean and maintainable JavaScript code.', commentCount: 9 },
  { id: 5, userId: 5, title: 'User Experience Principles', content: 'Improve your app user experience with these fundamental principles.', commentCount: 7 }
];

const sampleComments: Comment[] = [
  { id: 1, postId: 1, content: 'Great introduction to React!' },
  { id: 2, postId: 1, content: 'This helped me understand React basics.' },
  { id: 3, postId: 2, content: 'I love data visualization!' },
  { id: 4, postId: 3, content: 'Responsive design is so important these days.' },
  { id: 5, postId: 4, content: 'JavaScript best practices are crucial for clean code.' }
];

// API functions
export const fetchUsers = async (): Promise<User[]> => {
  // Simplified for beginners - directly return sample data
  return sampleUsers;
};

export const fetchPosts = async (): Promise<Post[]> => {
  // Simplified for beginners - directly return sample data
  return samplePosts;
};

export const fetchComments = async (postId: number): Promise<Comment[]> => {
  // Simplified for beginners - directly return filtered sample data
  return sampleComments.filter(comment => comment.postId === postId);
};

// Utility function to get a random profile image URL
export const getRandomProfileImage = (): string => {
  const profileImages = [
    'https://randomuser.me/api/portraits/men/1.jpg',
    'https://randomuser.me/api/portraits/women/1.jpg',
    'https://randomuser.me/api/portraits/men/2.jpg',
    'https://randomuser.me/api/portraits/women/2.jpg',
    'https://randomuser.me/api/portraits/men/3.jpg'
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
    'https://source.unsplash.com/random/800x600/?business'
  ];
  
  return postImages[Math.floor(Math.random() * postImages.length)];
};
