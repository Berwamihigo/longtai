'use client';

import { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

type MaintenanceStatus = 'pending' | 'verified' | 'postponed' | 'denied';

type MaintenanceRequest = {
  id: string;
  additionalNotes: string;
  carModel: string;
  createdAt: string;
  email: string;
  name: string;
  phone: string;
  preferredDate: string;
  serviceType: string;
  status?: MaintenanceStatus;
};

type ActionModalProps = {
  maintenance: MaintenanceRequest;
  isOpen: boolean;
  onClose: () => void;
  onSave: (maintenance: MaintenanceRequest) => Promise<void>;
};

type MaintenanceDetailsModalProps = {
  maintenance: MaintenanceRequest;
  isOpen: boolean;
  onClose: () => void;
};

const ActionModal = ({ maintenance, isOpen, onClose, onSave }: ActionModalProps) => {
  const [status, setStatus] = useState<MaintenanceStatus>(maintenance.status || 'pending');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSave({ ...maintenance, status });
      onClose();
    } catch (error) {
      setError('Failed to update maintenance status. Please try again.');
      console.error('Error updating maintenance status:', error);
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
          <h2 className="text-2xl font-bold text-gray-800">Update Maintenance Status</h2>
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
              onChange={(e) => setStatus(e.target.value as MaintenanceStatus)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="verified">Verify</option>
              <option value="postponed">Postpone</option>
              <option value="denied">Deny</option>
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

const MaintenanceDetailsModal = ({ maintenance, isOpen, onClose }: MaintenanceDetailsModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Maintenance Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{maintenance.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{maintenance.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{maintenance.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Request Date</p>
                <p className="font-medium">{new Date(maintenance.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Vehicle Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Car Model</p>
                <p className="font-medium">{maintenance.carModel}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Service Type</p>
                <p className="font-medium capitalize">{maintenance.serviceType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Preferred Date</p>
                <p className="font-medium">{new Date(maintenance.preferredDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium capitalize">{maintenance.status || 'pending'}</p>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          {maintenance.additionalNotes && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Additional Notes</h3>
              <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                {maintenance.additionalNotes}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default function MaintenancePage() {
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMaintenance, setSelectedMaintenance] = useState<MaintenanceRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedMaintenanceForDetails, setSelectedMaintenanceForDetails] = useState<MaintenanceRequest | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchMaintenanceRequests();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchMaintenanceRequests = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/getMaintenance');
      const data = await res.json();

      if (data.success) {
        const transformedData = data.maintenanceRequests.map((request: any) => ({
          id: request.id,
          additionalNotes: request.additionalNotes || '',
          carModel: request.carModel || '',
          createdAt: request.createdAt,
          email: request.email || '',
          name: request.name || '',
          phone: request.phone || '',
          preferredDate: request.preferredDate || '',
          serviceType: request.serviceType || '',
          status: request.status || 'pending'
        }));
        setMaintenanceRequests(transformedData);
      } else {
        setError('Failed to fetch maintenance requests');
      }
    } catch (err) {
      setError('An error occurred while fetching maintenance requests');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditMaintenance = (maintenance: MaintenanceRequest) => {
    setSelectedMaintenance(maintenance);
    setIsModalOpen(true);
  };

  const handleSaveMaintenance = async (maintenanceData: MaintenanceRequest) => {
    try {
      const response = await fetch('/api/updateMaintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(maintenanceData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update maintenance status');
      }

      setSuccessMessage('Maintenance status updated successfully');
      
      await fetchMaintenanceRequests();
    } catch (error) {
      console.error('Error updating maintenance:', error);
      throw error;
    }
  };

  const getStatusColor = (status: MaintenanceRequest['status']) => {
    if (!status) return 'bg-gray-100 text-gray-600';
    
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-700';
      case 'postponed':
        return 'bg-yellow-100 text-yellow-700';
      case 'denied':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const handleRowClick = (maintenance: MaintenanceRequest) => {
    setSelectedMaintenanceForDetails(maintenance);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Maintenance Requests</h1>
      </div>

      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 text-green-600 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {successMessage}
        </motion.div>
      )}

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
        ) : maintenanceRequests.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No maintenance requests found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Model</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preferred Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {maintenanceRequests.map((maintenance) => (
                  <tr 
                    key={maintenance.id} 
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleRowClick(maintenance)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{maintenance.carModel}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 capitalize">{maintenance.serviceType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {new Date(maintenance.preferredDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900 font-medium">{maintenance.name}</div>
                      <div className="text-gray-500 text-sm">{maintenance.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{maintenance.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(maintenance.status)}`}>
                        {(maintenance.status || 'pending').charAt(0).toUpperCase() + (maintenance.status || 'pending').slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditMaintenance(maintenance);
                        }}
                        className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-lg hover:bg-blue-50"
                        title="Update Status"
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
        {selectedMaintenance && (
          <ActionModal
            maintenance={selectedMaintenance}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedMaintenance(null);
            }}
            onSave={handleSaveMaintenance}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedMaintenanceForDetails && (
          <MaintenanceDetailsModal
            maintenance={selectedMaintenanceForDetails}
            isOpen={isDetailsModalOpen}
            onClose={() => {
              setIsDetailsModalOpen(false);
              setSelectedMaintenanceForDetails(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
