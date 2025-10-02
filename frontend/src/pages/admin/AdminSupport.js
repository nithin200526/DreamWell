import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { adminAPI } from '../../services/api';
import { MessageCircle, Send } from 'lucide-react';
import { formatDateTime } from '../../utils/helpers';
import toast from 'react-hot-toast';

const AdminSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [reply, setReply] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await adminAPI.getAllTickets();
      setTickets(response.data.data);
    } catch (error) {
      toast.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!reply.trim()) return;

    try {
      await adminAPI.replyToTicket(selectedTicket.id, reply);
      toast.success('Reply sent successfully!');
      setReply('');
      setSelectedTicket(null);
      fetchTickets();
    } catch (error) {
      toast.error('Failed to send reply');
    }
  };

  const handleStatusChange = async (ticketId, status) => {
    try {
      await adminAPI.updateTicketStatus(ticketId, status);
      toast.success('Ticket status updated');
      fetchTickets();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const filteredTickets = filterStatus === 'ALL'
    ? tickets
    : tickets.filter(t => t.status === filterStatus);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-3 mb-8">
          <MessageCircle className="w-8 h-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Support Tickets</h1>
        </div>

        {/* Filter */}
        <div className="card mb-6">
          <div className="flex space-x-2">
            {['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === status
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-dark-600'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets List */}
        {filteredTickets.length === 0 ? (
          <div className="card text-center py-16">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Tickets Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {filterStatus === 'ALL' ? 'No support tickets yet' : `No ${filterStatus} tickets`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {ticket.subject}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          ticket.status === 'OPEN'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                            : ticket.status === 'IN_PROGRESS'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                            : ticket.status === 'RESOLVED'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      From: {ticket.name} ({ticket.email})
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {formatDateTime(ticket.createdAt)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      className="btn-primary text-sm"
                    >
                      Reply
                    </button>
                    {ticket.status !== 'CLOSED' && (
                      <button
                        onClick={() => handleStatusChange(ticket.id, 'CLOSED')}
                        className="btn-secondary text-sm"
                      >
                        Close
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 dark:text-gray-300">{ticket.message}</p>
                </div>

                {ticket.adminReply && (
                  <div className="bg-primary-50 dark:bg-primary-900 rounded-lg p-4">
                    <p className="text-sm font-semibold text-primary-700 dark:text-primary-300 mb-2">
                      Admin Reply:
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{ticket.adminReply}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      Replied at: {formatDateTime(ticket.repliedAt)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Reply Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-dark-800 rounded-xl max-w-2xl w-full">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Reply to Ticket
                  </h2>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ✕
                  </button>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <strong>From:</strong> {selectedTicket.name} ({selectedTicket.email})
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <strong>Subject:</strong> {selectedTicket.subject}
                  </p>
                  <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
                    <p className="text-gray-700 dark:text-gray-300">{selectedTicket.message}</p>
                  </div>
                </div>

                <form onSubmit={handleReply}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Reply
                    </label>
                    <textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      rows="6"
                      className="input-field"
                      placeholder="Type your reply here..."
                      required
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button type="submit" className="flex-1 btn-primary flex items-center justify-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>Send Reply</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedTicket(null)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminSupport;
