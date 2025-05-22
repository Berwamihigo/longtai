'use client';

import { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

type TestDriveStatus = 'pending' | 'approved' | 'completed' | 'cancelled';

type TestDriveRequest = {
  id: string;
  additionalNotes: string;
  carId: string;
  carName: string;
  createdAt: string;
  email: string;
  name: string;
  phone: string;
  preferredDate: string;
  status?: TestDriveStatus;
};

type ActionModalProps = {
  testDrive: TestDriveRequest;
  isOpen: boolean;
  onClose: () => void;
  onSave: (testDrive: TestDriveRequest) => Promise<void>;
};

const ActionModal = ({ testDrive, isOpen, onClose, onSave }: ActionModalProps) => {
  const [status, setStatus] = useState<TestDriveStatus>(testDrive.status || 'pending');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSave({ ...testDrive, status });
      onClose();
    } catch (error) {
      setError('Failed to update test drive status. Please try again.');
      console.error('Error updating test drive status:', error);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Update Test Drive Status</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TestDriveStatus)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="approved">Approve</option>
              <option value="completed">Complete</option>
              <option value="cancelled">Cancel</option>
            </select>
          </div>
          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                'Update Status'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default function TestDrivePage() {
  const [testDrives, setTestDrives] = useState<TestDriveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTestDrive, setSelectedTestDrive] = useState<TestDriveRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTestDrives();
  }, []);

  const fetchTestDrives = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/getTestDrives');
      const data = await res.json();

      if (data.success) {
        const transformedData = data.testDrives.map((request: any) => ({
          id: request.id,
          additionalNotes: request.additionalNotes || '',
          carId: request.carId || '',
          carName: request.carName || '',
          createdAt: request.createdAt,
          email: request.email || '',
          name: request.name || '',
          phone: request.phone || '',
          preferredDate: request.preferredDate || '',
          status: request.status || 'pending'
        }));
        setTestDrives(transformedData);
      } else {
        setError('Failed to fetch test drive requests');
      }
    } catch (err) {
      setError('An error occurred while fetching test drive requests');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditTestDrive = (testDrive: TestDriveRequest) => {
    setSelectedTestDrive(testDrive);
    setIsModalOpen(true);
  };

  const handleSaveTestDrive = async (testDriveData: TestDriveRequest) => {
    try {
      const response = await fetch('/api/updateTestDrive', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: testDriveData.id,
          status: testDriveData.status
        }),
      });

      if (!response.ok) throw new Error('Failed to update test drive status');

      await fetchTestDrives();
    } catch (error) {
      console.error('Error updating test drive:', error);
      throw error;
    }
  };

  const getStatusColor = (status: TestDriveRequest['status']) => {
    if (!status) return 'bg-gray-100 text-gray-600';
    
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Test Drive Requests</h1>
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
          <div className="p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        ) : testDrives.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No test drive requests found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preferred Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {testDrives.map((testDrive) => (
                  <tr key={testDrive.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{testDrive.carName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {new Date(testDrive.preferredDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900 font-medium">{testDrive.name}</div>
                      <div className="text-gray-500 text-sm">{testDrive.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{testDrive.phone}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-md truncate">{testDrive.additionalNotes}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(testDrive.status)}`}>
                        {(testDrive.status || 'pending').charAt(0).toUpperCase() + (testDrive.status || 'pending').slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleEditTestDrive(testDrive)}
                        className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-lg hover:bg-blue-50"
                        title="View Details"
                      >
                        <FaPen className="w-4 h-4" />
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
        {selectedTestDrive && (
          <ActionModal
            testDrive={selectedTestDrive}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedTestDrive(null);
            }}
            onSave={handleSaveTestDrive}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
