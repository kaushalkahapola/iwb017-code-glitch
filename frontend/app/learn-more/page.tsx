import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaExchangeAlt, FaUsers, FaLightbulb, FaHandshake } from 'react-icons/fa';
import Link from 'next/link';

const LearnMorePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 px-4 md:px-6">
        <h1 className="text-4xl font-bold mb-8 text-green-600 text-center">Discover TaskSwap</h1>
        
        <section className="mb-16 text-center">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Revolutionizing Community Collaboration</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            TaskSwap is an innovative platform designed to empower communities through skill exchange. 
            Connect with neighbors, share expertise, and get things done – all while building lasting relationships.
          </p>
        </section>

        <section className="mb-16 grid md:grid-cols-2 gap-8 w-[70%] mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <FaExchangeAlt className="text-4xl text-green-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">How It Works</h3>
            <ol className="list-decimal list-inside text-gray-600 space-y-2">
              <li>Create your unique profile</li>
              <li>Post tasks or browse opportunities</li>
              <li>Connect and agree on exchanges</li>
              <li>Complete tasks and earn credits</li>
              <li>Rate experiences and build reputation</li>
            </ol>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <FaUsers className="text-4xl text-green-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Community Benefits</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Foster local connections</li>
              <li>Share and acquire new skills</li>
              <li>Save money on services</li>
              <li>Contribute to a sharing economy</li>
              <li>Build a supportive network</li>
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Why Choose TaskSwap?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FaLightbulb />, title: "Innovative", description: "A fresh approach to community collaboration" },
              { icon: <FaUsers />, title: "Community-Driven", description: "Powered by people, for people" },
              { icon: <FaExchangeAlt />, title: "Skill Exchange", description: "Learn, teach, and grow together" },
              { icon: <FaHandshake />, title: "Trust & Safety", description: "Built-in rating system for peace of mind" },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-3xl text-green-500 mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Ready to Transform Your Community?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join TaskSwap today and start making a difference in your neighborhood. 
            Together, we can build stronger, more connected communities.
          </p>
          <Link href="/register">
            <button className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg">
              Get Started Now
            </button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LearnMorePage;
