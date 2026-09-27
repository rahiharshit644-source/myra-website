import React, { useState } from "react";
import { PERMISSIONS_DATA, PermissionAuditItem } from "../data/permissionsData";
import { Shield, AlertTriangle, Check, ExternalLink, Filter } from "lucide-react";

export const PermissionsView: React.FC = () => {
  const [filterLevel, setFilterLevel] = useState<"all" | "Sensitive" | "Dangerous" | "Standard">("all");

  const filteredPermissions = PERMISSIONS_DATA.filter((p) => {
    if (filterLevel === "all") return true;
    return p.level === filterLevel;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
          <span>Security & System Authorization Audit</span>
          <span aria-hidden="true">·</span>
          <span>com.soltini.app Manifest</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
          Android Permissions & System Access
        </h1>
        <p className="text-base text-neutral-400 mt-2 max-w-3xl leading-relaxed">
          MYRA requests only the permissions required to fulfill concrete user features. Every permission is user-controlled through standard Android Settings screens and can be granted or revoked at any time.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-neutral-900/60 border border-neutral-800 rounded-lg w-fit">
        <button
          onClick={() => setFilterLevel("all")}
          className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
            filterLevel === "all"
              ? "bg-neutral-800 text-neutral-100 shadow-xs"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          All Permissions ({PERMISSIONS_DATA.length})
        </button>
        <button
          onClick={() => setFilterLevel("Sensitive")}
          className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
            filterLevel === "Sensitive"
              ? "bg-neutral-800 text-amber-300 shadow-xs"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          Special / Sensitive Access
        </button>
        <button
          onClick={() => setFilterLevel("Dangerous")}
          className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
            filterLevel === "Dangerous"
              ? "bg-neutral-800 text-rose-300 shadow-xs"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          Runtime Dangerous
        </button>
        <button
          onClick={() => setFilterLevel("Standard")}
          className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
            filterLevel === "Standard"
              ? "bg-neutral-800 text-neutral-200 shadow-xs"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          Standard Permissions
        </button>
      </div>

      {/* Permissions Audit Table */}
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950/80 border-b border-neutral-800 text-neutral-400 font-mono">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Permission & Type</th>
                <th className="py-3.5 px-4 font-semibold">Classes Utilizing</th>
                <th className="py-3.5 px-4 font-semibold">Purpose in MYRA</th>
                <th className="py-3.5 px-4 font-semibold">Impact if Revoked</th>
                <th className="py-3.5 px-4 font-semibold">Android Settings Path</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-850">
              {filteredPermissions.map((perm) => (
                <tr key={perm.permission} className="hover:bg-neutral-900/50 transition-colors">
                  {/* Col 1 */}
                  <td className="py-3 px-4 font-mono">
                    <span className="text-neutral-100 font-medium block">
                      {perm.permission.replace("android.permission.", "")}
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 mt-1">
                      <span>{perm.category}</span>
                      <span aria-hidden="true">·</span>
                      <span
                        className={
                          perm.level === "Sensitive"
                            ? "text-amber-400 font-semibold"
                            : perm.level === "Dangerous"
                            ? "text-rose-400 font-semibold"
                            : "text-neutral-400"
                        }
                      >
                        {perm.level}
                      </span>
                    </div>
                  </td>

                  {/* Col 2 */}
                  <td className="py-3 px-4 font-mono text-[11px] text-neutral-300">
                    <div className="flex flex-wrap gap-1">
                      {perm.usedByClass.map((c) => (
                        <span key={c} className="bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-850">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Col 3 */}
                  <td className="py-3 px-4 text-neutral-300 leading-relaxed font-sans max-w-xs">
                    {perm.purpose}
                  </td>

                  {/* Col 4 */}
                  <td className="py-3 px-4 text-neutral-400 leading-relaxed font-sans max-w-xs">
                    {perm.userImpactIfDenied}
                  </td>

                  {/* Col 5 */}
                  <td className="py-3 px-4 font-mono text-[11px] text-neutral-400">
                    {perm.settingsPath}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
