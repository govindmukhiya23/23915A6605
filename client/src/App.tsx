import React from 'react';
import { Switch, Route } from 'wouter';
import { queryClient } from './lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import NotFound from '@/pages/not-found';
import TopUsers from './pages/TopUsers';
import TrendingPosts from './pages/TrendingPosts';
import RealTimeFeed from './pages/RealTimeFeed';

function Router() {
  return (
    <Switch>
      <Route path="/" component={TopUsers} />
      <Route path="/trending" component={TrendingPosts} />
      <Route path="/feed" component={RealTimeFeed} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
