import React, { useState, useEffect } from 'react';
import { ShieldAlert, Trash2, CheckCircle2, AlertTriangle, BarChart3, FileText, Flag } from 'lucide-react';
import { CommunityPost } from '../lib/types';
import { fetchAdminDashboardData, deleteCommunityPost } from '../lib/communityService';

interface AdminDashboardProps {
  adminEmail: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ adminEmail }) => {
  const [data, setData] = useState<{
    totalPosts: number;
    reportedPosts: CommunityPost[];
    categoryBreakdown: Record<string, number>;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    const result = await fetchAdminDashboardData();
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (postId: string) => {
    try {
      await deleteCommunityPost(postId);
      setData(prev => prev ? {
        ...prev,
        reportedPosts: prev.reportedPosts.filter(p => p.id !== postId),
        totalPosts: Math.max(0, prev.totalPosts - 1)
      } : null);
      setDeletingId(null);
      setNotice('Post removed by administrator.');
      setTimeout(() => setNotice(null), 3000);
    } catch (err: any) {
      setNotice(err.message || 'Failed to delete post.');
      setTimeout(() => setNotice(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs font-semibold text-slate-500 animate-pulse">
        Loading Admin Telemetry & Moderation Queue...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Admin Header */}
      <div className="p-6 rounded-3xl bg-indigo-950 text-white space-y-2 border border-indigo-900 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-extrabold tracking-tight">Admin Moderation Center</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-800 text-indigo-200 font-bold">
            {adminEmail}
          </span>
        </div>
        <p className="text-xs text-indigo-300">
          Super-admin access to delete abusive reports, monitor scan category volumes, and inspect flagged community content.
        </p>
      </div>

      {notice && (
        <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-800 dark:text-indigo-200 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-600" />
          <span>{notice}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Community Stories</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{data?.totalPosts || 0}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Reported / Flagged Items</span>
          <p className="text-2xl font-black text-rose-600">{data?.reportedPosts.length || 0}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Moderator Status</span>
          <p className="text-2xl font-black text-emerald-600">Active</p>
        </div>
      </div>

      {/* Category Threat Volumes */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-emerald-600" />
          <span>Threat Volume By Category</span>
        </h3>

        {Object.keys(data?.categoryBreakdown || {}).length === 0 ? (
          <p className="text-xs text-slate-400">No threat entries categorized yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {Object.entries(data?.categoryBreakdown || {}).map(([cat, count]) => (
              <div key={cat} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                <span className="font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">{cat}</span>
                <strong className="text-slate-900 dark:text-white font-bold">{count}</strong>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Flagged Queue */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Flag className="w-4 h-4 text-rose-500" />
          <span>Flagged & Reported Stories Queue</span>
        </h3>

        {(!data?.reportedPosts || data.reportedPosts.length === 0) ? (
          <p className="text-xs text-slate-500">No community stories are currently pending moderation review. All clear!</p>
        ) : (
          <div className="space-y-3">
            {data.reportedPosts.map((post) => (
              <div key={post.id} className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{post.title}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300">
                      {post.reportCount || 0} Reports
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">{post.story}</p>
                </div>

                {deletingId === post.id ? (
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setDeletingId(null)}
                      className="px-2.5 py-1 rounded-lg border border-slate-300 text-xs text-slate-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold"
                    >
                      Confirm
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeletingId(post.id)}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
