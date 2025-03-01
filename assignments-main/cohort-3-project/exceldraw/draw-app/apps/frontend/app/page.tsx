"use client";

import React from 'react';
import "./globals.css";
import { Button } from '@repo/ui/button';
import Link from 'next/link';
import {
  Pencil,
  Share2,
  Users,
  Layers,
  Cloud,
  Sparkles,
  Palette,
  UserPlus,
  LogIn
} from 'lucide-react';

function FeatureCard({ icon: Icon, title, description }: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-indigo-50">
      <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>
      <h3 className="text-xl font-fredoka font-semibold mb-2 text-indigo-900">{title}</h3>
      <p className="text-gray-600 font-jakarta">{description}</p>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-jakarta">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-20 pb-24 text-center">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-8">
              <Palette className="h-5 w-5 text-indigo-600" />
              <span className="text-indigo-600 font-fredoka">The fun way to create diagrams!</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-marker text-gray-900 mb-6 leading-tight">
              Create Beautiful
              <span className="block text-indigo-600">Hand-Drawn Diagrams</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 font-jakarta">
              The free, open-source drawing tool that lets you create amazing diagrams, wireframes,
              and illustrations with the feel of hand-drawn sketches. ✨
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/signup">
                <Button variant="primary">
                  Sign Up <UserPlus className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="signin">
                <Button variant="outline">
                  Sign In <LogIn className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-20">
        <div className="rounded-3xl shadow-2xl overflow-hidden border-8 border-white">
          <img
            src="https://lh6.googleusercontent.com/jDMuhS1pYy1vzAY7v9XXnufGMBu5MOXgqav31UfUSKpazfU_9RtngyZ_fuVa953rFrrnA6J7jH6TzBBlTg8wuNLFxshLXjw9O0rQXZ6A5SwZbSXP1lMORG2g7lzqD3P7a6ZU6Fk"
            alt="Excalidraw Interface"
            className="w-full object-cover"
          />
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-marker text-center mb-4 text-indigo-900">Why Choose Excalidraw?</h2>
        <p className="text-xl text-gray-600 text-center mb-12 font-fredoka">Everything you need to bring your ideas to life</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Pencil}
            title="Natural Drawing"
            description="Create sketches that look hand-drawn with our intuitive drawing tools and natural feel."
          />
          <FeatureCard
            icon={Share2}
            title="Easy Sharing"
            description="Share your drawings instantly with a simple link or export them in various formats."
          />
          <FeatureCard
            icon={Users}
            title="Real-time Collaboration"
            description="Work together with your team in real-time, no matter where they are."
          />
          <FeatureCard
            icon={Layers}
            title="Rich Libraries"
            description="Access a vast collection of ready-to-use components and templates."
          />
          <FeatureCard
            icon={Cloud}
            title="Cloud Storage"
            description="Your drawings are automatically saved and accessible from anywhere."
          />
          <FeatureCard
            icon={Sparkles}
            title="Custom Styling"
            description="Personalize your diagrams with custom colors, fonts, and styles."
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-fredoka font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Enterprise</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-fredoka font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-fredoka font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-fredoka font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">License</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p className="font-fredoka">© 2024 Excalidraw. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;