import { useState, useEffect } from "react";
import { localDb } from "../services/localDb";
import { Card, CardContent, CardHeader, CardTitle } from "../components/common/Card";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { Modal } from "../components/common/Modal";
import { Plus, ShieldCheck } from "lucide-react";

export function PatrolsPage() {
  const [patrols, setPatrols] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ guard: '', route: '', status: 'Completed', notes: '' });

  useEffect(() => {
    setPatrols(localDb.getPatrols());
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    localDb.addPatrol({ ...formData, time: new Date().toLocaleTimeString() });
    setPatrols(localDb.getPatrols());
    setIsModalOpen(false);
    setFormData({ guard: '', route: '', status: 'Completed', notes: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Security Patrols</h2>
          <p className="text-gray-500 mt-1">Log and monitor guard patrolling routes</p>
        </div>
        <Button icon={Plus} onClick={() => setIsModalOpen(true)}>Log Patrol</Button>
      </div>

      <Card>
        <CardHeader><CardTitle>Patrol Log</CardTitle></CardHeader>
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
            {patrols.map(p => (
              <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-6 text-sm">{p.date} {p.time}</td>
                <td className="py-3 px-6 font-medium">{p.guard}</td>
                <td className="py-3 px-6 text-sm">{p.route}</td>
                <td className="py-3 px-6 text-sm"><Badge variant={p.status === 'Completed' ? 'success' : 'danger'}>{p.status}</Badge></td>
              </tr>
            ))}
            {patrols.length === 0 && <tr><td colSpan="4" className="text-center py-6 text-gray-500">No patrols logged yet.</td></tr>}
          </tbody>
        </table>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log Patrol">
        <form onSubmit={handleAdd} className="space-y-4">
          <input required placeholder="Guard Name" className="w-full border rounded p-2" value={formData.guard} onChange={e => setFormData({...formData, guard: e.target.value})} />
          <input required placeholder="Route (e.g. Peripheral, Phase 1)" className="w-full border rounded p-2" value={formData.route} onChange={e => setFormData({...formData, route: e.target.value})} />
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
