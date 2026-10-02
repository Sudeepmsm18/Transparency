import { useState, useEffect } from "react";
import { localDb } from "../services/localDb";
import { Card, CardHeader, CardTitle } from "../components/common/Card";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { Modal } from "../components/common/Modal";
import { Plus, Shield, Trash2 } from "lucide-react";
import { useAuth, ROLES } from "../context/AuthContext";
import { phases, sectors } from "../data/mockData";

export function GuardsPage() {
  const [guards, setGuards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', shift: 'Day', phone: '', photo: '', phase: 'p1', sector: '' });
  const { role, phase } = useAuth();

  useEffect(() => {
    setGuards(localDb.getGuards());
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    localDb.addGuard(formData);
    setGuards(localDb.getGuards());
    setIsModalOpen(false);
    setFormData({ name: '', shift: 'Day', phone: '', photo: '', phase: 'p1', sector: '' });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredGuards = guards.filter(g => phase === 'All' || g.phase === phase || !g.phase);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this guard?")) {
      localDb.deleteGuard(id);
      setGuards(localDb.getGuards());
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Security Guards</h2>
          <p className="text-gray-500 mt-1">Directory of security personnel</p>
        </div>
        {(role === ROLES.SUPER_ADMIN || role === ROLES.VOLUNTEER) && (
          <Button icon={Plus} onClick={() => setIsModalOpen(true)}>Add Guard</Button>
        )}
      </div>

      <Card>
        <CardHeader><CardTitle>Guard Directory</CardTitle></CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-y border-gray-200">
                <th className="py-3 px-6 text-xs text-gray-500">Name</th>
                <th className="py-3 px-6 text-xs text-gray-500">Shift</th>
                <th className="py-3 px-6 text-xs text-gray-500">Phone</th>
                {(role === ROLES.SUPER_ADMIN || role === ROLES.VOLUNTEER) && (
                  <th className="py-3 px-6 text-xs text-gray-500 text-right">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredGuards.map(g => (
                <tr key={g.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-6 font-medium flex items-center">
                    {g.photo ? (
                      <img src={g.photo} alt={g.name} className="w-8 h-8 rounded-full object-cover mr-3 border border-gray-200" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                        <Shield className="w-4 h-4" />
                      </div>
                    )}
                    {g.name}
                  </td>
                  <td className="py-3 px-6 text-sm"><Badge>{g.shift}</Badge></td>
                  <td className="py-3 px-6 text-sm">{g.phone}</td>
                  {(role === ROLES.SUPER_ADMIN || role === ROLES.VOLUNTEER) && (
                    <td className="py-3 px-6 text-right">
                      <button 
                        onClick={() => handleDelete(g.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                        title="Remove Guard"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
              {filteredGuards.length === 0 && (
                <tr>
                  <td colSpan={role === ROLES.SUPER_ADMIN || role === ROLES.VOLUNTEER ? "4" : "3"} className="text-center py-6 text-gray-500">
                    No guards found for this phase.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Security Guard">
        <form onSubmit={handleAdd} className="space-y-4">
          <input required placeholder="Guard Name" className="w-full border rounded p-2" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <select className="w-full border rounded p-2" value={formData.shift} onChange={e => setFormData({...formData, shift: e.target.value})}>
            <option>Day</option><option>Night</option><option>Reliever</option>
          </select>
          <select className="w-full border rounded p-2" value={formData.phase} onChange={e => setFormData({...formData, phase: e.target.value})}>
            {phases.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <select className="w-full border rounded p-2 mt-4" value={formData.sector || ''} onChange={e => setFormData({...formData, sector: e.target.value})}>
            <option value="">None / All Sectors</option>
            {sectors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <input required placeholder="Phone Number" className="w-full border rounded p-2" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
            <input type="file" accept="image/*" className="w-full border rounded p-2 text-sm" onChange={handlePhotoUpload} />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
