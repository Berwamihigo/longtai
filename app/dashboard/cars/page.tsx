'use client';

import { useEffect, useState } from 'react';
import { FaPen, FaPlus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

type Car = {
  id: string;
  carName: string;
  make: string;
  year: number | string;
  price: number | string;
  powerType: string;
  category: string;
  mileage: number | string;
  transmission: string;
  color: string;
  description: string;
  driveType: string;
  engineSize: string;
  fullTank: string;
  mainImageUrl: string;
  seats: string;
  weight: string;
  zeroToSixty: string;
  mpgRange: {
    min: string;
    max: string;
  };
  subImageUrls: string[];
  createdAt?: string;
  customFields?: { [key: string]: string };
};

type EditModalProps = {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (car: Car) => Promise<void>;
};

const EditModal = ({ car, isOpen, onClose, onSave }: EditModalProps) => {
  const [formData, setFormData] = useState<Car>(car || {
    id: '',
    carName: '',
    make: '',
    year: '',
    price: '',
    powerType: '',
    category: '',
    mileage: '',
    transmission: '',
    color: '',
    description: '',
    driveType: '',
    engineSize: '',
    fullTank: '',
    mainImageUrl: '',
    seats: '',
    weight: '',
    zeroToSixty: '',
    mpgRange: { min: '', max: '' },
    subImageUrls: [],
    customFields: {}
  } as Car);
  const [saving, setSaving] = useState(false);
  const [customFieldKey, setCustomFieldKey] = useState('');
  const [customFieldValue, setCustomFieldValue] = useState('');

  useEffect(() => {
    if (car) {
      setFormData(car);
    }
  }, [car]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving car:', error);
    } finally {
      setSaving(false);
    }
  };

  const addCustomField = () => {
    if (customFieldKey && customFieldValue) {
      setFormData(prev => ({
        ...prev,
        customFields: {
          ...(prev.customFields || {}),
          [customFieldKey]: customFieldValue
        }
      }));
      setCustomFieldKey('');
      setCustomFieldValue('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-6 w-full max-w-7xl my-4 relative"
      >
        <div className="sticky top-0 bg-white z-10 pb-4 border-b mb-6">
          <h2 className="text-2xl font-bold">Edit Car</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Car Name</label>
                <input
                  type="text"
                  value={formData.carName || ''}
                  onChange={(e) => setFormData({ ...formData, carName: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Make</label>
                <input
                  type="text"
                  value={formData.make || ''}
                  onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Year</label>
                <input
                  type="number"
                  value={formData.year || ''}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price (RWF)</label>
                <input
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Technical Specifications</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Power Type</label>
                <select
                  value={formData.powerType || ''}
                  onChange={(e) => setFormData({ ...formData, powerType: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select Type</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Gas">Gas</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Engine Size</label>
                <input
                  type="text"
                  value={formData.engineSize || ''}
                  onChange={(e) => setFormData({ ...formData, engineSize: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Transmission</label>
                <select
                  value={formData.transmission || ''}
                  onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select Transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Drive Type</label>
                <input
                  type="text"
                  value={formData.driveType || ''}
                  onChange={(e) => setFormData({ ...formData, driveType: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>

            {/* Additional Specifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Specifications</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Color</label>
                <input
                  type="text"
                  value={formData.color || ''}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Seats</label>
                <input
                  type="text"
                  value={formData.seats || ''}
                  onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                <input
                  type="text"
                  value={formData.weight || ''}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Performance Metrics</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mileage</label>
                <input
                  type="text"
                  value={formData.mileage || ''}
                  onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Tank Capacity (L)</label>
                <input
                  type="text"
                  value={formData.fullTank || ''}
                  onChange={(e) => setFormData({ ...formData, fullTank: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">0-60 mph (seconds)</label>
                <input
                  type="text"
                  value={formData.zeroToSixty || ''}
                  onChange={(e) => setFormData({ ...formData, zeroToSixty: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">MPG Min</label>
                  <input
                    type="text"
                    value={formData.mpgRange?.min || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      mpgRange: { ...formData.mpgRange, min: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">MPG Max</label>
                  <input
                    type="text"
                    value={formData.mpgRange?.max || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      mpgRange: { ...formData.mpgRange, max: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4 col-span-full">
              <h3 className="text-lg font-semibold">Images</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Main Image URL</label>
                <input
                  type="text"
                  value={formData.mainImageUrl || ''}
                  onChange={(e) => setFormData({ ...formData, mainImageUrl: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Additional Image URLs (one per line)</label>
                <textarea
                  value={formData.subImageUrls?.join('\n') || ''}
                  onChange={(e) => setFormData({ ...formData, subImageUrls: e.target.value.split('\n').filter(url => url.trim()) })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 h-32"
                  placeholder="Enter each image URL on a new line"
                />
              </div>
            </div>

            {/* Description */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 h-32"
                placeholder="Enter detailed description of the car"
              />
            </div>

            {/* Custom Fields */}
            <div className="col-span-full space-y-4">
              <h3 className="text-lg font-semibold">Custom Fields</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={customFieldKey}
                  onChange={(e) => setCustomFieldKey(e.target.value)}
                  placeholder="Field Name"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customFieldValue}
                    onChange={(e) => setCustomFieldValue(e.target.value)}
                    placeholder="Field Value"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={addCustomField}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
              </div>
              {/* Display existing custom fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(formData.customFields || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium">{key}: </span>
                      <span>{value}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newCustomFields = { ...formData.customFields };
                        delete newCustomFields[key];
                        setFormData({ ...formData, customFields: newCustomFields });
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/getAllCars');
      const data = await res.json();

      if (data.success) {
        setCars(data.cars);
      } else {
        setError('Failed to fetch cars');
      }
    } catch (err) {
      setError('An error occurred while fetching cars');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCar = (car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleSaveCar = async (carData: Car) => {
    try {
      const { carName, ...updateData } = carData;
      const response = await fetch('/api/updateCar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carName,
          ...updateData
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update car');
      }

      // Close the modal
      setIsModalOpen(false);
      
      // Show success message
      alert('Car updated successfully');
      
      // Refresh the cars list
      await fetchCars();
    } catch (error) {
      console.error('Error updating car:', error);
      alert('Failed to update car: ' + (error as Error).message);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Cars Management</h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center p-6">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Make</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cars.map((car) => (
                  <tr key={car.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{car.carName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{car.make}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{car.year}</td>
                    <td className="px-6 py-4 whitespace-nowrap">RWF {car.price?.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{car.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleEditCar(car)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaPen />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <EditModal
            car={selectedCar}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveCar}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
