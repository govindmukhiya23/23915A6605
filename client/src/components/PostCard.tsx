import React from 'react';
import { Post, getRandomProfileImage } from '../api/socialMedia';

interface PostCardProps {
  post: Post;
  isCompact?: boolean;
  postImage?: string;
  userImage?: string;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  isCompact = false,
  postImage,
  userImage = getRandomProfileImage()
}) => {
  // Generate random tag
  const tags = ['#technology', '#travel', '#food', '#coding', '#wellness', '#business'];
  const randomTag = tags[Math.floor(Math.random() * tags.length)];
  
  // Generate random tag color
  const tagColors = [
    'bg-blue-100 text-blue-800', 
    'bg-green-100 text-green-800',
    'bg-yellow-100 text-yellow-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
    'bg-indigo-100 text-indigo-800'
  ];
  const randomTagColor = tagColors[Math.floor(Math.random() * tagColors.length)];
  
  // Generate random time
  const timeOptions = ['2 minutes ago', '15 minutes ago', '32 minutes ago', '1 hour ago', '2 days ago', '1 day ago'];
  const randomTime = timeOptions[Math.floor(Math.random() * timeOptions.length)];
  
  // Generate random engagement counts
  const likesCount = Math.floor(Math.random() * 3000) + 20;
  const sharesCount = Math.floor(Math.random() * 1000) + 3;
  
  if (isCompact) {
    return (
      <div className="p-4 hover:bg-gray-50">
        <div className="flex">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            <img src={userImage} alt={post.user?.name || 'User'} className="w-full h-full object-cover" />
          </div>
          <div className="ml-3 flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-medium">{post.user?.name || 'User'}</h5>
                <p className="text-xs text-gray-500">Posted {randomTime}</p>
              </div>
              <div>
                <span className={`inline-block ${randomTagColor} px-2 py-1 rounded-full text-xs`}>
                  {randomTag}
                </span>
              </div>
            </div>
            <p className="mt-2">{post.content}</p>
            {postImage && (
              <img src={postImage} alt="Post content" className="mt-3 rounded-lg w-full max-h-96 object-cover" />
            )}
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span>{post.commentCount || 0}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{likesCount}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>{sharesCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="md:flex">
        <div className="md:w-1/3">
          <img 
            src={postImage} 
            alt="Post content" 
            className="w-full h-48 md:h-full object-cover" 
          />
        </div>
        <div className="p-6 md:w-2/3">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
              <img 
                src={userImage} 
                alt={post.user?.name || 'User'} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h5 className="font-medium">{post.user?.name || 'User'}</h5>
              <p className="text-xs text-gray-500">Posted {randomTime}</p>
            </div>
          </div>
          
          <h4 className="text-xl font-bold mb-2">{post.title}</h4>
          <p className="text-gray-600 mb-4">{post.content}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span className="font-semibold">{post.commentCount || 0}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{likesCount}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>{sharesCount}</span>
              </div>
            </div>
            
            <div>
              <span className={`inline-block ${randomTagColor} px-2 py-1 rounded-full text-xs font-medium`}>
                {randomTag}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
