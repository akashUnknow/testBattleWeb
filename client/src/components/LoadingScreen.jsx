// src/components/LoadingScreen.jsx
import { Loader2 } from 'lucide-react';

export const LoadingScreen = ({ message = "Loading..." }) => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
    <div className="text-center">
      <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
      <p className="text-lg text-gray-700 font-medium">{message}</p>
    </div>
  </div>
);