'use client';

import React from 'react';
import { Users, Mail, Shield, UserPlus, Search, Filter } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const TEAM_MEMBERS = [
  { id: '1', name: 'Sarah Jenkins', email: 'sarah.j@legal.com', role: 'ADMIN', status: 'Active', cases: 14, avatar: 'SJ' },
  { id: '2', name: 'Michael Ross', email: 'm.ross@legal.com', role: 'LAWYER', status: 'Active', cases: 22, avatar: 'MR' },
  { id: '3', name: 'Rachel Zane', email: 'r.zane@legal.com', role: 'LAWYER', status: 'Pending', cases: 18, avatar: 'RZ' },
  { id: '4', name: 'Harvey Specter', email: 'h.specter@legal.com', role: 'ADMIN', status: 'Inactive', cases: 31, avatar: 'HS' },
  { id: '5', name: 'Donna Paulsen', email: 'd.paulsen@legal.com', role: 'CLIENT', status: 'Active', cases: 2, avatar: 'DP' },
];

export default function TeamPage() {
  const { role } = useAuth();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [roleFilter, setRoleFilter] = React.useState<string>('ALL');
  const [isInviteModalOpen, setIsInviteModalOpen] = React.useState(false);
  const [newMemberEmail, setNewMemberEmail] = React.useState('');
  const [newMemberRole, setNewMemberRole] = React.useState('LAWYER');

  const filteredMembers = React.useMemo(() => {
    return TEAM_MEMBERS.filter(member => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'ALL' || member.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [searchTerm, roleFilter]);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Invitation sent to ${newMemberEmail} as ${newMemberRole}`);
    setIsInviteModalOpen(false);
    setNewMemberEmail('');
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Team Members</h1>
          <p className="text-sm text-slate-500 mt-1">Manage team roles, permissions, and workload distribution.</p>
        </div>
        {role === 'admin' && (
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-purple-500/20 transition-all"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Member
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Members</p>
            <p className="text-2xl font-extrabold text-slate-800 mt-1">{TEAM_MEMBERS.length}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Lawyers</p>
            <p className="text-2xl font-extrabold text-slate-800 mt-1">
              {TEAM_MEMBERS.filter(m => m.role === 'LAWYER').length}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Shield className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Administrators</p>
            <p className="text-2xl font-extrabold text-slate-800 mt-1">
              {TEAM_MEMBERS.filter(m => m.role === 'ADMIN').length}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Shield className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter / Table Container */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search members by name or email..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 focus:outline-none focus:border-purple-500"
            >
              <option value="ALL">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="LAWYER">Lawyer</option>
              <option value="CLIENT">Client</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-6">Member</th>
                <th className="py-3.5 px-6">Role</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Active Cases</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400 text-sm">
                    No team members found matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{member.name}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {member.email}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${member.role === 'ADMIN'
                          ? 'bg-purple-100 text-purple-700'
                          : member.role === 'LAWYER'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${member.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                          member.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                            'bg-slate-50 text-slate-600 border-slate-200'
                        }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-700">{member.cases} cases</td>
                    <td className="py-4 px-6 text-right">
                      {role === 'admin' ? (
                        <button className="text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors">
                          Edit Role
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400 italic">View Only</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Invite Member */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Invite New Team Member</h3>
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newMemberEmail}
                  onChange={e => setNewMemberEmail(e.target.value)}
                  placeholder="colleague@legal.com"
                  className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Assign Role</label>
                <select
                  value={newMemberRole}
                  onChange={e => setNewMemberRole(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="LAWYER">Lawyer</option>
                  <option value="ADMIN">Admin</option>
                  <option value="CLIENT">Client</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-purple-600 text-white rounded-xl hover:bg-purple-700 shadow-md shadow-purple-500/20"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
