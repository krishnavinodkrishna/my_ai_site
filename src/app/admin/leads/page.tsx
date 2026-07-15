import { getAllLeads } from "@/db/queries";

export const dynamic = "force-dynamic"; // always fresh

export default async function AdminLeadsPage() {
  let leads: Awaited<ReturnType<typeof getAllLeads>> = [];
  let dbError = "";

  try {
    leads = await getAllLeads();
  } catch (err) {
    dbError = "Could not connect to the database. Check your TURSO credentials in .env.local.";
    console.error("[AdminLeadsPage]", err);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <p className="text-sm text-white/40 mt-1">
            {dbError ? "Database error" : `${leads.length} waitlist submissions`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-center bg-[#151820] border border-white/5 rounded-xl px-4 py-2">
            <p className="text-lg font-bold text-white">{leads.length}</p>
            <p className="text-[10px] text-white/30">Total</p>
          </div>
          <div className="text-center bg-[#151820] border border-white/5 rounded-xl px-4 py-2">
            <p className="text-lg font-bold text-emerald-400">
              {leads.filter((l) => l.email).length}
            </p>
            <p className="text-[10px] text-white/30">With Email</p>
          </div>
        </div>
      </div>

      {dbError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-4 text-red-400 text-sm">
          ⚠️ {dbError}
        </div>
      )}

      <div className="bg-[#151820] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["#", "Name", "Phone", "Email", "Source", "Submitted At"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-3 text-[10px] font-bold text-white/30 uppercase tracking-widest whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 && !dbError ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-white/30 text-sm">
                    No leads yet. Submissions from the waitlist modal will appear here.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-white/5 hover:bg-white/2 transition-colors"
                  >
                    <td className="px-6 py-4 text-xs text-white/30 font-mono">{lead.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-[11px] font-bold flex-shrink-0">
                          {lead.name[0]?.toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-white">{lead.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-white/70 font-mono whitespace-nowrap">
                      {lead.phone}
                    </td>
                    <td className="px-6 py-4 text-xs text-white/50">
                      {lead.email ?? <span className="text-white/20">—</span>}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold bg-violet-500/10 text-violet-400 px-2 py-1 rounded-full">
                        {lead.source ?? "unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-white/40 whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
