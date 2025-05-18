'use client';

import { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

type MaintenanceStatus = 'pending' | 'verified' | 'postponed' | 'denied';

type MaintenanceRequest = {
  id: string;
  carId: string;
  carName: string;
  requestDate: string;
  description: string;
  status?: MaintenanceStatus;
  requestedBy: string;
};

type ActionModalProps = {
  maintenance: MaintenanceRequest;
  isOpen: boolean;
  onClose: () => void;
  onSave: (maintenance: MaintenanceRequest) => Promise<void>;
};

const ActionModal = ({ maintenance, isOpen, onClose, onSave }: ActionModalProps) => {
  const [status, setStatus] = useState<MaintenanceStatus>(maintenance.status || 'pending');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({ ...maintenance, status });
      onClose();
    } catch (error) {
      console.error('Error updating maintenance status:', error);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Update Maintenance Status</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as MaintenanceStatus)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="verified">Verify</option>
              <option value="postponed">Postpone</option>
              <option value="denied">Deny</option>
            </select>
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
              {saving ? 'Saving...' : 'Update Status'}
            </button>
          </div>
        </form>
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

  useEffect(() => {
    fetchMaintenanceRequests();
  }, []);

  const fetchMaintenanceRequests = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/getMaintenance');
      const data = await res.json();

      if (data.success) {
        setMaintenanceRequests(data.maintenanceRequests);
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
      const response = await fetch(`/api/updateMaintenance/${maintenanceData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(maintenanceData),
      });

      if (!response.ok) throw new Error('Failed to update maintenance status');

      // Refresh the maintenance requests list
      await fetchMaintenanceRequests();
    } catch (error) {
      console.error('Error updating maintenance:', error);
      throw error;
    }
  };

  const getStatusColor = (status: MaintenanceRequest['status']) => {
    if (!status) return 'text-gray-600';
    
    switch (status) {
      case 'verified':
        return 'text-green-600';
      case 'postponed':
        return 'text-yellow-600';
      case 'denied':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Maintenance Requests</h1>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {maintenanceRequests.map((maintenance) => (
                  <tr key={maintenance.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{maintenance.carName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(maintenance.requestDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">{maintenance.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{maintenance.requestedBy}</td>
                    <td className={`px-6 py-4 whitespace-nowrap ${getStatusColor(maintenance.status)}`}>
                      {(maintenance.status || 'pending').charAt(0).toUpperCase() + (maintenance.status || 'pending').slice(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleEditMaintenance(maintenance)}
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
        {isModalOpen && selectedMaintenance && (
          <ActionModal
            maintenance={selectedMaintenance}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveMaintenance}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
