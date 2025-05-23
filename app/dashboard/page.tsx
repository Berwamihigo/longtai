'use client';

import { useEffect, useState } from 'react';
import { FaCar, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';

type Car = {
  name: string;
  id: string;
};

type Client = {
  name: string;
  email: string;
  createdAt: string;
};

export default function Dashboard() {
  const [cars, setCars] = useState<Car[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cars
        const carsRes = await fetch('/api/getAllCars');
        const carsData = await carsRes.json();

        // Fetch clients
        const clientsRes = await fetch('/api/getAllClients');
        const clientsData = await clientsRes.json();

        if (carsData.success && clientsData.success) {
          setCars(carsData.cars);
          setClients(clientsData.clients);
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError('An error occurred while fetching data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="flex-1 p-6 lg:p-8">
        {/* Header */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-800 mb-8"
        >
          Dashboard Overview
        </motion.h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Cars Stats */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl shadow-inner">
                <FaCar className="text-2xl text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-600">Total Cars</h2>
                <p className="text-3xl font-bold text-gray-800">{cars.length}</p>
              </div>
            </div>
          </motion.div>

          {/* Clients Stats */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl shadow-inner">
                <FaUsers className="text-2xl text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-600">Total Clients</h2>
                <p className="text-3xl font-bold text-gray-800">{clients.length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cars List */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Available Cars</h2>
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center p-6">{error}</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {cars.map((car) => (
                  <motion.div
                    key={car.id}
                    whileHover={{ scale: 1.01 }}
                    className="p-4 hover:bg-gray-50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="font-medium text-gray-800">{car.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Clients List */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Registered Clients</h2>
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-500 border-t-transparent"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center p-6">{error}</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {clients.map((client) => (
                  <motion.div
                    key={client.email}
                    whileHover={{ scale: 1.01 }}
                    className="p-4 hover:bg-gray-50 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">{client.name}</span>
                      <span className="text-sm text-gray-500">{client.email}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Joined: {new Date(client.createdAt).toLocaleDateString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}