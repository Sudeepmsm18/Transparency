import { useState, useEffect } from "react";
import { localDb } from "../services/localDb";
import { Card, CardContent, CardHeader, CardTitle } from "../components/common/Card";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { Modal } from "../components/common/Modal";
import { Plus, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { phases, sectors } from "../data/mockData";

export function PatrolsPage() {
  const { phase, sector } = useAuth();
  const [patrols, setPatrols] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Format current date and time for default values
  const now = new Date();
  const defaultDate = now.toISOString().split('T')[0];
  const defaultTime = now.toTimeString().slice(0, 5);

  const [formData, setFormData] = useState({ guard: '', route: '', status: 'Completed', notes: '', date: defaultDate, time: defaultTime, phase: 'p1', sector: '' });

  useEffect(() => {
    setPatrols(localDb.getPatrols());
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    localDb.addPatrol(formData);
    setPatrols(localDb.getPatrols());
    setIsModalOpen(false);
    
    const now = new Date();
    setFormData({ guard: '', route: '', status: 'Completed', notes: '', date: now.toISOString().split('T')[0], time: now.toTimeString().slice(0, 5), phase: 'p1', sector: '' });
  };

  const filteredPatrols = patrols.filter(p => phase === 'All' || p.phase === phase || !p.phase);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Guard Rounds</h2>
          <p className="text-gray-500 mt-1">Log and monitor guard patrolling routes</p>
        </div>
        <Button icon={Plus} onClick={() => setIsModalOpen(true)}>Log Round</Button>
      </div>

      <Card>
        <CardHeader><CardTitle>Rounds Log</CardTitle></CardHeader>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-y border-gray-200">
              <th className="py-3 px-6 text-xs text-gray-500">Date & Time</th>
              <th className="py-3 px-6 text-xs text-gray-500">Guard</th>
              <th className="py-3 px-6 text-xs text-gray-500">Route / Area</th>
              <th className="py-3 px-6 text-xs text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatrols.map(p => (
              <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-6 text-sm">{p.date} {p.time}</td>
                <td className="py-3 px-6 font-medium">{p.guard}</td>
                <td className="py-3 px-6 text-sm">{p.route}</td>
                <td className="py-3 px-6 text-sm"><Badge variant={p.status === 'Completed' ? 'success' : 'danger'}>{p.status}</Badge></td>
              </tr>
            ))}
            {filteredPatrols.length === 0 && <tr><td colSpan="4" className="text-center py-6 text-gray-500">No rounds found for this phase.</td></tr>}
          </tbody>
        </table>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log Guard Round">
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input required type="date" className="w-full border rounded p-2" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            <input required type="time" className="w-full border rounded p-2" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
          </div>
          <input required placeholder="Guard Name" className="w-full border rounded p-2" value={formData.guard} onChange={e => setFormData({...formData, guard: e.target.value})} />
          <input required placeholder="Route (e.g. Peripheral, Phase 1)" className="w-full border rounded p-2" value={formData.route} onChange={e => setFormData({...formData, route: e.target.value})} />
          <select className="w-full border rounded p-2" value={formData.phase} onChange={e => setFormData({...formData, phase: e.target.value})}>
            {phases.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <select className="w-full border rounded p-2 mt-4" value={formData.sector || ''} onChange={e => setFormData({...formData, sector: e.target.value})}>
            <option value="">None / All Sectors</option>
            {sectors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <select className="w-full border rounded p-2 mt-4" value={formData.sector || ''} onChange={e => setFormData({...formData, sector: e.target.value})}>
            <option value="">None / All Sectors</option>
            {sectors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <select className="w-full border rounded p-2" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
            <option>Completed</option><option>Missed / Incomplete</option>
          </select>
          <textarea placeholder="Notes (Optional)" className="w-full border rounded p-2" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}></textarea>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
