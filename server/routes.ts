import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Data for mock Social Media API
interface User {
  id: number;
  username: string;
  name: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  content: string;
}

interface Comment {
  id: number;
  postId: number;
  content: string;
}

// Sample data
const users: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  username: `user${i + 1}`,
  name: `User ${i + 1}`
}));

const posts: Post[] = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  userId: Math.floor(Math.random() * 50) + 1,
  title: `Post ${i + 1} Title`,
  content: `This is the content for post ${i + 1}. It contains some interesting information about various topics.`
}));

const comments: Comment[] = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  postId: Math.floor(Math.random() * 200) + 1,
  content: `Comment ${i + 1} on this post`
}));

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for social media data
  
  // Get all users
  app.get("/api/users", (req, res) => {
    res.json({ users });
  });
  
  // Get all posts
  app.get("/api/posts", (req, res) => {
    res.json({ posts });
  });
  
  // Get comments for a specific post
  app.get("/api/posts/:postId/comments", (req, res) => {
    const postId = parseInt(req.params.postId);
    const postComments = comments.filter(comment => comment.postId === postId);
    res.json({ comments: postComments });
  });

  const httpServer = createServer(app);

  return httpServer;
}
