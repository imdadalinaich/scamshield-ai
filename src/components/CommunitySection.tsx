import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Star,
  Flag,
  Trash2,
  Send,
  PlusCircle,
  EyeOff,
  User,
  ShieldAlert,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import { CommunityPost, CommunityComment, ScamCategory, SupportedLanguage, UserProfile } from '../lib/types';
import {
  fetchCommunityPosts,
  createCommunityPost,
  rateCommunityStory,
  addCommentToStory,
  fetchCommentsForStory,
  reportCommunityStory,
  deleteCommunityPost
} from '../lib/communityService';
import { TRANSLATIONS } from '../lib/translations';

interface CommunitySectionProps {
  user: UserProfile | null;
  onSignInRequired: () => void;
  lang: SupportedLanguage;
  isAdmin: boolean;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  user,
  onSignInRequired,
  lang,
  isAdmin
}) => {
  const t = TRANSLATIONS[lang];
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'topRated' | 'mostDiscussed'>('newest');
  const [visibleCount, setVisibleCount] = useState(20);

  // New post modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ScamCategory>('bank');
  const [story, setStory] = useState('');
  const [avoidedOrLost, setAvoidedOrLost] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Active expanded comments
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [commentsMap, setCommentsMap] = useState<Record<string, CommunityComment[]>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [commentLoading, setCommentLoading] = useState<Record<string, boolean>>({});

  // Hovered stars map for rating micro-interaction
  const [hoveredStars, setHoveredStars] = useState<Record<string, number>>({});

  // Inline reporting modal state
  const [reportingPostId, setReportingPostId] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState('');
  const [reportSubmitting, setReportSubmitting] = useState(false);

  // In-app delete confirmation state
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Toast notice
  const [notice, setNotice] = useState<string | null>(null);

  const loadPosts = async () => {
    setLoading(true);
    const data = await fetchCommunityPosts();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onSignInRequired();
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const created = await createCommunityPost({
        title,
        category,
        story,
        avoidedOrLost,
        isAnonymous
      });

      setPosts([created, ...posts]);
      setShowCreateModal(false);
      setTitle('');
      setStory('');
      setAvoidedOrLost('');
      setNotice('Your experience was posted to the community board!');
      setTimeout(() => setNotice(null), 4000);
    } catch (err: any) {
      setSubmitError(err.message || 'Could not submit post.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRate = async (postId: string, stars: number) => {
    if (!user) {
      onSignInRequired();
      return;
    }

    try {
      await rateCommunityStory(postId, stars);
      setPosts(prev =>
        prev.map(p => {
          if (p.id === postId) {
            return {
              ...p,
              ratingCount: (p.ratingCount || 0) + 1,
              ratingSum: (p.ratingSum || 0) + stars
            };
          }
          return p;
        })
      );
      setNotice(`Rating recorded (${stars} stars). Thank you for voting!`);
      setTimeout(() => setNotice(null), 3000);
    } catch (err: any) {
      setNotice(err.message || 'Could not save rating');
      setTimeout(() => setNotice(null), 3000);
    }
  };

  const handleToggleComments = async (postId: string) => {
    const isExpanded = !expandedComments[postId];
    setExpandedComments(prev => ({ ...prev, [postId]: isExpanded }));

    if (isExpanded && !commentsMap[postId]) {
      const comments = await fetchCommentsForStory(postId);
      setCommentsMap(prev => ({ ...prev, [postId]: comments }));
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!user) {
      onSignInRequired();
      return;
    }
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    setCommentLoading(prev => ({ ...prev, [postId]: true }));
    try {
      const newComment = await addCommentToStory(postId, text);
      setCommentsMap(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), newComment]
      }));
      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
      setPosts(prev =>
        prev.map(p => (p.id === postId ? { ...p, commentCount: (p.commentCount || 0) + 1 } : p))
      );
    } catch (err: any) {
      setNotice(err.message || 'Could not post comment');
      setTimeout(() => setNotice(null), 3000);
    } finally {
      setCommentLoading(prev => ({ ...prev, [postId]: false }));
    }
  };

  const handleSubmitReport = async () => {
    if (!reportingPostId || !user) return;
    if (!reportReason.trim()) return;

    setReportSubmitting(true);
    try {
      const result = await reportCommunityStory(reportingPostId, reportReason.trim());
      if (result.hidden) {
        setPosts(prev => prev.filter(p => p.id !== reportingPostId));
        setNotice('This story has reached 3 reports and has been automatically hidden pending review.');
      } else {
        setNotice('Report submitted for moderator review. Thank you for protecting the community.');
      }
      setReportingPostId(null);
      setReportReason('');
      setTimeout(() => setNotice(null), 4000);
    } catch (err) {
      setNotice('Could not submit report.');
      setTimeout(() => setNotice(null), 3000);
    } finally {
      setReportSubmitting(false);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      await deleteCommunityPost(postId);
      setPosts(prev => prev.filter(p => p.id !== postId));
      setConfirmDeleteId(null);
      setNotice('Story deleted successfully.');
      setTimeout(() => setNotice(null), 3000);
    } catch (err: any) {
      setNotice(err.message || 'Failed to delete post.');
      setTimeout(() => setNotice(null), 3000);
    }
  };

  // Filter and Sort
  const filteredPosts = posts
    .filter(p => filterCategory === 'all' || p.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === 'topRated') {
        const avgA = a.ratingCount > 0 ? a.ratingSum / a.ratingCount : 0;
        const avgB = b.ratingCount > 0 ? b.ratingSum / b.ratingCount : 0;
        return avgB - avgA;
      }
      if (sortBy === 'mostDiscussed') {
        return (b.commentCount || 0) - (a.commentCount || 0);
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="space-y-6">
      
      {/* Community Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-emerald-600" />
            <span>Community Scam Warning Board</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Real experiences from Pakistani citizens. All phone numbers and CNICs are automatically redacted for privacy.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (!user) onSignInRequired();
            else setShowCreateModal(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Share Your Experience</span>
        </motion.button>
      </div>

      {notice && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </motion.div>
      )}

      {/* Filter and Sort Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {/* Category filter */}
        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-600 dark:text-slate-300">Category:</span>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="bank">Payment / Bank / Wallet</option>
            <option value="sms">SMS / Text Message</option>
            <option value="whatsapp">WhatsApp / Tasks</option>
            <option value="job">Fake Job Offers</option>
            <option value="call">Phone Call Frauds</option>
            <option value="prize">Prize / Lottery / BISP</option>
            <option value="shopping">Online Shopping</option>
            <option value="crypto">Investment / Crypto</option>
            <option value="impersonation">Impersonation / Emergency</option>
          </select>
        </div>

        {/* Sorting options */}
        <div className="flex items-center gap-2 text-xs">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-600 dark:text-slate-300">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="topRated">Top Rated</option>
            <option value="mostDiscussed">Most Discussed</option>
          </select>
        </div>
      </div>

      {/* Posts List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(n => (
            <div key={n} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse space-y-3">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
              <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-full" />
              <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <ShieldAlert className="w-10 h-10 text-slate-400 mx-auto" />
          <h4 className="font-bold text-slate-800 dark:text-slate-200">No Stories Shared Yet</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Have you or someone you know encountered a suspicious SMS, call, or job offer? Click "Share Your Experience" above to help protect others in Pakistan.
          </p>
          <button
            onClick={() => {
              if (!user) onSignInRequired();
              else setShowCreateModal(true);
            }}
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Share Your Experience</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.slice(0, visibleCount).map((post, postIndex) => {
            const hasRatings = (post.ratingCount || 0) > 0;
            const avgRating = hasRatings ? (post.ratingSum / post.ratingCount).toFixed(1) : null;
            const isAuthor = user && user.uid === post.authorId;
            const canDelete = isAuthor || isAdmin;
            const comments = commentsMap[post.id] || [];
            const isCommentsOpen = !!expandedComments[post.id];
            const activeHover = hoveredStars[post.id] || 0;

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: postIndex * 0.05, duration: 0.3 }}
                className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-4"
              >
                {/* Post Top Meta */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {post.isAnonymous ? (
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center">
                        <EyeOff className="w-4 h-4" />
                      </div>
                    ) : post.authorPhoto ? (
                      <img src={post.authorPhoto} alt="" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                        {post.authorName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {post.authorName}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {post.category}
                  </span>
                </div>

                {/* Title & Story */}
                <div className="space-y-1.5">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {post.story}
                  </p>
                  {post.avoidedOrLost && (
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-400 mt-2">
                      <strong className="text-slate-900 dark:text-slate-200">Outcome:</strong> {post.avoidedOrLost}
                    </div>
                  )}
                </div>

                {/* Footer Bar: Rating, Comments trigger, Report, Delete */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  
                  {/* Rating Stars & Count */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className={`w-4 h-4 ${hasRatings ? 'fill-amber-500' : ''}`} />
                      <span>{hasRatings ? avgRating : 'No ratings yet'}</span>
                      {hasRatings && (
                        <span className="text-slate-400 font-normal">({post.ratingCount})</span>
                      )}
                    </div>

                    {/* Quick rate 1-5 button group with hover micro-interaction */}
                    <div className="hidden sm:flex items-center gap-0.5 text-slate-300 dark:text-slate-600">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          whileHover={{ scale: 1.25 }}
                          whileTap={{ scale: 0.9 }}
                          onMouseEnter={() => setHoveredStars(prev => ({ ...prev, [post.id]: star }))}
                          onMouseLeave={() => setHoveredStars(prev => ({ ...prev, [post.id]: 0 }))}
                          onClick={() => handleRate(post.id, star)}
                          className={`p-0.5 transition-colors cursor-pointer ${
                            activeHover >= star ? 'text-amber-500 fill-amber-500' : 'hover:text-amber-500'
                          }`}
                          title={`Rate ${star} star`}
                        >
                          <Star className="w-3.5 h-3.5" />
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Comments Toggle & Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleComments(post.id)}
                      className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.commentCount || 0} Comments</span>
                      {isCommentsOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    <button
                      onClick={() => {
                        if (!user) onSignInRequired();
                        else setReportingPostId(post.id);
                      }}
                      className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                      title="Report story"
                    >
                      <Flag className="w-3.5 h-3.5" />
                    </button>

                    {canDelete && (
                      <button
                        onClick={() => setConfirmDeleteId(post.id)}
                        className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                        title="Delete story"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Inline Delete Confirmation */}
                {confirmDeleteId === post.id && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-center justify-between gap-3 text-xs">
                    <span className="text-rose-800 dark:text-rose-200 font-medium">Delete this story permanently?</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold hover:bg-rose-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}

                {/* Expanded Comments Drawer */}
                <AnimatePresence>
                  {isCommentsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 overflow-hidden"
                    >
                      <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        Comments & Advice:
                      </h5>

                      {comments.length === 0 ? (
                        <p className="text-xs text-slate-400">No comments yet. Share your thoughts or advice!</p>
                      ) : (
                        <div className="space-y-2">
                          {comments.map((cm) => (
                            <div key={cm.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs space-y-1">
                              <div className="flex items-center justify-between text-[11px] text-slate-400">
                                <span className="font-bold text-slate-800 dark:text-slate-200">{cm.authorName}</span>
                                <span>{new Date(cm.createdAt).toLocaleDateString()}</span>
                              </div>
                              <p className="text-slate-700 dark:text-slate-300">{cm.comment}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add comment box */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={commentInputs[post.id] || ''}
                          onChange={(e) =>
                            setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))
                          }
                          onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                          placeholder={user ? "Write helpful safety advice..." : "Sign in to comment"}
                          disabled={!user || commentLoading[post.id]}
                          className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddComment(post.id)}
                          disabled={!user || commentLoading[post.id] || !commentInputs[post.id]?.trim()}
                          className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Pagination Load More Button */}
      {filteredPosts.length > visibleCount && (
        <div className="text-center pt-2 pb-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setVisibleCount(prev => prev + 20)}
            className="px-6 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
          >
            Load More Stories ({filteredPosts.length - visibleCount} remaining)
          </motion.button>
        </div>
      )}

      {/* Share Experience Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-600" />
                <span>Share Scam Experience</span>
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitError && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs border border-rose-200">
                {submitError}
              </div>
            )}

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Threat Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ScamCategory)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="bank">Payment / Bank / Wallet (Easypaisa, JazzCash, OTP)</option>
                  <option value="sms">SMS / Text Message</option>
                  <option value="whatsapp">WhatsApp / Online Tasks</option>
                  <option value="job">Fake Job Offer / Advance Fee</option>
                  <option value="call">Phone Call Extortion / Police Impersonation</option>
                  <option value="prize">Prize / Lottery / BISP Relief Fund</option>
                  <option value="shopping">Online Shopping / Courier Scam</option>
                  <option value="crypto">Investment / Crypto / Doubling</option>
                  <option value="impersonation">Emergency / Romance Impersonation</option>
                  <option value="website">Suspicious Website / Fake Portal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Headline (What happened?)
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Received call from fake Meezan security asking for OTP"
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Story & Warning Details
                </label>
                <textarea
                  required
                  rows={4}
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  placeholder="Describe what the scammer said, what channel they contacted you on, and how you responded..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Outcome (Did you avoid it or lose funds?)
                </label>
                <input
                  type="text"
                  value={avoidedOrLost}
                  onChange={(e) => setAvoidedOrLost(e.target.value)}
                  placeholder="e.g. Avoided losing Rs 15,000 by calling official branch hotline"
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="anonymousCheck"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="anonymousCheck" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                  Post anonymously (hide my profile name and photo)
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Sanitizing & Posting...' : 'Publish Warning'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* In-App Report Modal */}
      {reportingPostId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Flag className="w-4 h-4 text-rose-500" />
                <span>Report Community Story</span>
              </h4>
              <button onClick={() => setReportingPostId(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Why are you reporting this story? Posts with 3 reports are automatically hidden for admin review.
            </p>
            <textarea
              rows={3}
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="e.g. Spam, offensive content, fake phone number, or abusive claim..."
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setReportingPostId(null)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitReport}
                disabled={reportSubmitting || !reportReason.trim()}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold disabled:opacity-50"
              >
                {reportSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
