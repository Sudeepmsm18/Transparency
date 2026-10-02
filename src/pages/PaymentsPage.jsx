import { useState, useEffect } from "react";
import { localDb } from "../services/localDb";
import { Card, CardContent, CardHeader, CardTitle } from "../components/common/Card";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { Modal } from "../components/common/Modal";
import { useToast } from "../context/ToastContext";
import { Search, Plus, IndianRupee, CreditCard, Receipt } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { phases, sectors } from "../data/mockData";

export function PaymentsPage() {
  const { phase } = useAuth();
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToast } = useToast();
  
  const [formData, setFormData] = useState({
    houseId: '', ownerName: '', amount: '', purpose: 'Maintenance Fee', status: 'Paid', method: 'UPI', proofPhoto: null, phase: 'p1', sector: ''
  });

  const [selectedProof, setSelectedProof] = useState(null);

  useEffect(() => {
    setPayments(localDb.getPayments());
  }, []);

  const handleAddPayment = (e) => {
    e.preventDefault();
    const newPayment = {
      ...formData,
      date: new Date().toISOString().split('T')[0]
    };
    localDb.addPayment(newPayment);
    setPayments(localDb.getPayments());
    setIsModalOpen(false);
    
    addToast(`Payment of ₹${formData.amount} recorded for ${formData.houseId}.`, 'success');
    addToast(`WhatsApp receipt sent to ${formData.ownerName}.`, 'whatsapp');

    setFormData({ houseId: '', ownerName: '', amount: '', purpose: 'Maintenance Fee', status: 'Paid', method: 'UPI', proofPhoto: null, phase: 'p1', sector: '' });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, proofPhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid": return <Badge variant="success">Paid</Badge>;
      case "Pending": return <Badge variant="warning">Pending</Badge>;
      case "Overdue": return <Badge variant="danger">Overdue</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const totalCollected = payments.filter(p => p.status === 'Paid' && (phase === 'All' || p.phase === phase || !p.phase)).reduce((sum, p) => sum + Number(p.amount), 0);
  const pendingAmount = payments.filter(p => p.status !== 'Paid' && (phase === 'All' || p.phase === phase || !p.phase)).reduce((sum, p) => sum + Number(p.amount), 0);

  const filteredPayments = payments.filter((p) => {
    const matchesSearch = p.houseId.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPhase = phase === 'All' || p.phase === phase || !p.phase;
    const matchesStatus = statusFilter === 'All' || 
                          (statusFilter === 'Paid' && p.status === 'Paid') || 
                          (statusFilter === 'Unpaid' && p.status !== 'Paid');
    return matchesSearch && matchesPhase && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payments & Collection</h2>
          <p className="text-gray-500 mt-1">Manage maintenance fees and association collections</p>
        </div>
        <Button icon={Plus} onClick={() => setIsModalOpen(true)}>Record Payment</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
              <IndianRupee className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Collected</p>
              <h3 className="text-2xl font-bold text-gray-900">₹{totalCollected.toLocaleString()}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-orange-100 rounded-lg text-orange-600">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Pending Dues</p>
              <h3 className="text-2xl font-bold text-gray-900">₹{pendingAmount.toLocaleString()}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <CardTitle>Payment History</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input 
                type="text"
                placeholder="Search by house or name..."
                className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white w-full sm:w-auto mt-3 sm:mt-0 sm:ml-3"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid / Pending</option>
            </select>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-y border-gray-200">
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">House / Owner</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Purpose & Date</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{payment.houseId}</div>
                    <div className="text-sm text-gray-500">{payment.ownerName}</div>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">
                    ₹{Number(payment.amount).toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900">{payment.purpose}</div>
                    <div className="text-xs text-gray-500">{payment.date} via {payment.method}</div>
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(payment.status)}
                  </td>
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    {payment.proofPhoto && (
                      <button 
                        onClick={() => setSelectedProof(payment.proofPhoto)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3 underline"
                      >
                        Proof
                      </button>
                    )}
                    <Button variant="ghost" size="sm">Receipt</Button>
                  </td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500">
                    No payments found for this phase.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record Payment">
        <form onSubmit={handleAddPayment} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">House ID *</label>
              <input required type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={formData.houseId} onChange={e => setFormData({...formData, houseId: e.target.value})} placeholder="e.g. P1-104" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Owner Name *</label>
              <input required type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={formData.ownerName} onChange={e => setFormData({...formData, ownerName: e.target.value})} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Amount (₹) *</label>
              <input required type="number" min="0" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Status *</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Purpose</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})}>
              <option value="Maintenance Fee">Maintenance Fee</option>
              <option value="Event Contribution">Event Contribution</option>
              <option value="Fine">Fine / Penalty</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Phase *</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={formData.phase} onChange={e => setFormData({...formData, phase: e.target.value})}>
              {phases.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="space-y-1 mt-4">
            <label className="text-sm font-medium text-gray-700">Sector (Optional)</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={formData.sector || ''} onChange={e => setFormData({...formData, sector: e.target.value})}>
              <option value="">None / All Sectors</option>
              {sectors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Payment Proof (Photo/Screenshot)</label>
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white" />
            {formData.proofPhoto && (
              <div className="mt-2 border rounded p-1 inline-block bg-gray-50">
                <img src={formData.proofPhoto} alt="Proof" className="h-24 object-contain" />
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Payment</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!selectedProof} onClose={() => setSelectedProof(null)} title="Payment Proof">
        <div className="flex justify-center p-2 bg-gray-50 rounded-lg">
          {selectedProof && (
            <img src={selectedProof} alt="Payment Proof" className="max-w-full max-h-[70vh] object-contain rounded shadow-sm border border-gray-200" />
          )}
        </div>
      </Modal>
    </div>
  );
}
