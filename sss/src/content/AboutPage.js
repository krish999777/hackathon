// src/AboutPage.js

import React from 'react';
import { FaUtensils, FaHeart, FaTruck, FaChartLine, FaCamera, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

const FeatureCard = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
    <div className="text-teal-500 text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{children}</p>
  </div>
);

function AboutPage() {
  return (
    <div className="bg-gray-50 font-sans leading-normal tracking-normal">
      <main>
        {/* Hero Section */}
        <section className="bg-teal-600 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Turning Surplus into Sustenance
            </h1>
            <p className="text-lg md:text-xl text-teal-100 max-w-3xl mx-auto">
              Our mission is to fight food waste and hunger by connecting those with excess food to those in need, one rescue at a time.
            </p>
          </div>
        </section>

        {/* The Problem & Our Solution Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">The Paradox of Waste</h2>
                <p className="text-gray-700 mb-4">
                  Globally, a staggering amount of perfectly good food from restaurants and cafes ends up in landfills. At the same time, millions of people face food insecurity. This disconnect is not just a logistical problem—it's a call to action.
                </p>
                <div className="flex justify-center md:justify-start items-center space-x-4 text-red-500">
                    <FaUtensils className="text-3xl" />
                    <span className="text-2xl font-bold">&rarr;</span>
                    <FaHeart className="text-3xl" />
                </div>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1593113589675-78711a1a6f5e?q=80&w=2070" alt="Volunteers distributing food" className="rounded-lg shadow-2xl w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Core Features Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">How Food Rescue Matchmaker Works</h2>
              <p className="text-gray-600 mt-2">A simple, real-time platform to make food rescue efficient and impactful.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard icon={<FaCamera />} title="Real-time Donation Posting">
                Restaurants & cafes can instantly post surplus food donations with photos, descriptions, and pickup details using their device's camera and GPS.
              </FeatureCard>
              <FeatureCard icon={<FaUsers />} title="Instant NGO Notification">
                NGOs and volunteers in the vicinity are immediately notified about new donations, allowing for quick review and acceptance of rescue missions.
              </FeatureCard>
              <FeatureCard icon={<FaTruck />} title="Live Pickup Tracking">
                Once a donation is accepted, donors can track the volunteer's progress in real-time, ensuring a smooth and transparent handover process.
              </FeatureCard>
              <FeatureCard icon={<FaChartLine />} title="Impact Dashboards">
                Visualize your contribution! Our dashboards show key metrics like total meals saved and daily beneficiaries served, tracked with clear, insightful charts.
              </FeatureCard>
              <FeatureCard icon={<FaMapMarkerAlt />} title="Smart Geolocation">
                Leveraging GPS, the platform intelligently matches donors with the nearest available NGOs to minimize travel time and maximize efficiency.
              </FeatureCard>
               <FeatureCard icon={<FaHeart />} title="Community Focused">
                Every feature is designed to strengthen community ties, reduce waste, and ensure that nutritious food reaches the people who need it most.
              </FeatureCard>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gray-800 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Whether you're a restaurant with surplus food or a volunteer ready to make a difference, you can be part of the solution.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                Register as a Donor
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                Become a Volunteer
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AboutPage;