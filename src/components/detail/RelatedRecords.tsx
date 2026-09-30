import React from 'react';
import { FileText, Users, Briefcase, FileSignature } from 'lucide-react';

const mockRecords = [
  { id: '1', type: 'document', name: 'Client_Contract_Signed.pdf', date: '2026-09-28' },
  { id: '2', type: 'document', name: 'Court_Filing_V2.docx', date: '2026-09-29' },
  { id: '3', type: 'client', name: 'Ahmed Trading LLC (Parent)', date: 'Linked 2026-01-15' },
  { id: '4', type: 'case', name: 'CAS-0899 (Previous Dispute)', date: 'Closed 2025-11-20' },
];

export function RelatedRecords() {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Related Records</h3>
        <button className="text-sm text-blue-400 hover:text-blue-300">Link Record</button>
      </div>

      <div className="space-y-3">
        {mockRecords.map(record => (
          <div key={record.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-800 bg-slate-900/50 hover:bg-slate-800/50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors">
                {record.type === 'document' && <FileText className="w-4 h-4" />}
                {record.type === 'client' && <Users className="w-4 h-4" />}
                {record.type === 'case' && <Briefcase className="w-4 h-4" />}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-200">{record.name}</p>
                <p className="text-xs text-slate-500">{record.date}</p>
              </div>
            </div>
            <button className="text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
