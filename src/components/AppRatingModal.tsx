import React, { useState } from 'react';
import { Star, X, Check, Heart } from 'lucide-react';
import { submitAppReview } from '../lib/communityService';
import { UserProfile } from '../lib/types';

interface AppRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onSignInRequired: () => void;
  onSuccess: () => void;
}

export const AppRatingModal: React.FC<AppRatingModalProps> = ({
  isOpen,
  onClose,
  user,
  onSignInRequired,
  onSuccess
}) => {
  const [stars, setStars] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onSignInRequired();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await submitAppReview(stars, review);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Could not submit review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 text-center">
        
        <div className="flex justify-end">
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-500 flex items-center justify-center shadow-inner">
          <Star className="w-8 h-8 fill-amber-500" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            Rate 360 ScamShield AI
          </h3>
          <p className="text-xs text-slate-500">
            Your honest feedback helps improve community cyber protection.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs border border-rose-200">
            {error}
          </div>
        )}

        {/* 1-5 Stars Selector */}
        <div className="flex items-center justify-center gap-2 py-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onMouseEnter={() => setHoveredStar(s)}
              onMouseLeave={() => setHoveredStar(0)}
              onClick={() => setStars(s)}
              className="p-1.5 transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  (hoveredStar || stars) >= s
                    ? 'text-amber-500 fill-amber-500'
                    : 'text-slate-300 dark:text-slate-700'
                }`}
              />
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            rows={3}
            value={review}
            onChange={(e) => setReview(e.target.value.slice(0, 300))}
            placeholder="Share what worked well or what can be improved (optional)..."
            className="w-full p-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit App Review'}
          </button>
        </form>

      </div>
    </div>
  );
};
