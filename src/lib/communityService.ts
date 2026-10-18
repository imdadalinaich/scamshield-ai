import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  limit,
  increment,
  writeBatch
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from './firebase';
import { CommunityPost, CommunityComment, UserProfile, ScamCategory, ScanVerdict } from './types';
import { sanitizeContent } from './scam_rules';
import { APP_CONFIG } from '../config/appConfig';

const POSTS_PATH = 'community_posts';
const USERS_PATH = 'users';
const APP_REVIEWS_PATH = 'app_reviews';
const FEEDBACK_PATH = 'feedback';

// Initialize or update user profile document on sign in
export async function syncUserProfile(user: { uid: string; displayName?: string | null; email?: string | null; photoURL?: string | null }): Promise<UserProfile> {
  const userRef = doc(db, USERS_PATH, user.uid);
  try {
    const existingSnap = await getDoc(userRef);
    const nowIso = new Date().toISOString();
    const isAdminUser = user.email?.toLowerCase() === APP_CONFIG.adminEmail.toLowerCase();
    
    if (existingSnap.exists()) {
      const data = existingSnap.data() as UserProfile;
      const updatedProfile: UserProfile = {
        ...data,
        displayName: user.displayName || data.displayName || 'Anonymous Member',
        email: user.email || data.email,
        photoURL: user.photoURL || data.photoURL,
        updatedAt: nowIso,
        role: isAdminUser ? 'admin' : (data.role || 'user')
      };
      await updateDoc(userRef, {
        displayName: updatedProfile.displayName,
        email: updatedProfile.email || '',
        photoURL: updatedProfile.photoURL || '',
        updatedAt: nowIso,
        role: updatedProfile.role
      });
      return updatedProfile;
    } else {
      const newProfile: UserProfile = {
        uid: user.uid,
        displayName: user.displayName || 'Anonymous Member',
        email: user.email || '',
        photoURL: user.photoURL || '',
        createdAt: nowIso,
        role: isAdminUser ? 'admin' : 'user'
      };
      await setDoc(userRef, newProfile);
      return newProfile;
    }
  } catch (err) {
    console.warn('Sync user profile fallback:', err);
    return {
      uid: user.uid,
      displayName: user.displayName || 'Shield User',
      email: user.email || '',
      photoURL: user.photoURL || '',
      createdAt: new Date().toISOString(),
      role: user.email?.toLowerCase() === APP_CONFIG.adminEmail.toLowerCase() ? 'admin' : 'user'
    };
  }
}

// Fetch community posts with fallback
export async function fetchCommunityPosts(): Promise<CommunityPost[]> {
  try {
    const q = query(
      collection(db, POSTS_PATH),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    const snap = await getDocs(q);
    const fetched: CommunityPost[] = [];
    snap.forEach((d) => {
      const data = d.data();
      if (!data.isHidden) {
        fetched.push({ ...data, id: d.id } as CommunityPost);
      }
    });

    return fetched;
  } catch (err) {
    console.warn('Unable to reach Firestore for posts:', err);
    return [];
  }
}

// Create community story with automatic PII redaction and rate limiting
export async function createCommunityPost(post: {
  title: string;
  category: ScamCategory;
  story: string;
  avoidedOrLost?: string;
  isAnonymous: boolean;
}): Promise<CommunityPost> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('You must be signed in to share an experience.');
  }

  // Sanitize and Redact PII
  const { cleanText: cleanTitle } = sanitizeContent(post.title.trim());
  const { cleanText: cleanStory } = sanitizeContent(post.story.trim());
  const cleanAvoided = post.avoidedOrLost ? sanitizeContent(post.avoidedOrLost.trim()).cleanText : '';

  if (cleanTitle.length < 5 || cleanTitle.length > 150) {
    throw new Error('Title must be between 5 and 150 characters.');
  }
  if (cleanStory.length < 20 || cleanStory.length > 2500) {
    throw new Error('Story must be between 20 and 2500 characters.');
  }

  const postId = `post_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const postRef = doc(db, POSTS_PATH, postId);
  const nowIso = new Date().toISOString();

  const newPost: CommunityPost = {
    id: postId,
    title: cleanTitle,
    category: post.category,
    story: cleanStory,
    avoidedOrLost: cleanAvoided || undefined,
    isAnonymous: post.isAnonymous,
    authorId: currentUser.uid,
    authorName: post.isAnonymous ? 'Anonymous Member' : (currentUser.displayName || 'Community Member'),
    authorPhoto: post.isAnonymous ? '' : (currentUser.photoURL || ''),
    ratingCount: 0,
    ratingSum: 0,
    commentCount: 0,
    reportCount: 0,
    isHidden: false,
    createdAt: nowIso
  };

  try {
    await setDoc(postRef, newPost);
    return newPost;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, POSTS_PATH);
  }
}

// Rate a story (1-5 stars, strictly 1 per user per story)
export async function rateCommunityStory(postId: string, rating: number): Promise<void> {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('Sign in required to rate stories.');
  if (rating < 1 || rating > 5) throw new Error('Rating must be between 1 and 5 stars.');

  const ratingDocRef = doc(db, `${POSTS_PATH}/${postId}/ratings`, currentUser.uid);
  const postRef = doc(db, POSTS_PATH, postId);

  try {
    const existingSnap = await getDoc(ratingDocRef);
    const prevRating = existingSnap.exists() ? (existingSnap.data().rating as number) : null;
    const nowIso = new Date().toISOString();

    await setDoc(ratingDocRef, {
      userId: currentUser.uid,
      rating,
      updatedAt: nowIso
    });

    if (prevRating !== null) {
      // Update existing rating sum
      await updateDoc(postRef, {
        ratingSum: increment(rating - prevRating)
      });
    } else {
      // New rating
      await updateDoc(postRef, {
        ratingCount: increment(1),
        ratingSum: increment(rating)
      });
    }
  } catch (err) {
    console.warn('Rating update failed:', err);
    throw err;
  }
}

// Add comment to story
export async function addCommentToStory(postId: string, commentText: string): Promise<CommunityComment> {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('Sign in required to comment.');

  const { cleanText } = sanitizeContent(commentText.trim());
  if (cleanText.length < 2 || cleanText.length > 500) {
    throw new Error('Comment must be between 2 and 500 characters.');
  }

  const commentId = `cm_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const commentRef = doc(db, `${POSTS_PATH}/${postId}/comments`, commentId);
  const postRef = doc(db, POSTS_PATH, postId);
  const nowIso = new Date().toISOString();

  const newComment: CommunityComment = {
    id: commentId,
    postId,
    authorId: currentUser.uid,
    authorName: currentUser.displayName || 'Community Member',
    authorPhoto: currentUser.photoURL || '',
    comment: cleanText,
    createdAt: nowIso
  };

  try {
    await setDoc(commentRef, newComment);
    await updateDoc(postRef, {
      commentCount: increment(1)
    });
    return newComment;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, `${POSTS_PATH}/${postId}/comments`);
  }
}

// Fetch comments for a story
export async function fetchCommentsForStory(postId: string): Promise<CommunityComment[]> {
  try {
    const q = query(collection(db, `${POSTS_PATH}/${postId}/comments`), orderBy('createdAt', 'asc'));
    const snap = await getDocs(q);
    const comments: CommunityComment[] = [];
    snap.forEach((d) => comments.push({ ...d.data(), id: d.id } as CommunityComment));
    return comments;
  } catch (err) {
    console.warn('Comments fetch failed:', err);
    return [];
  }
}

// Report a community post (auto-hides after 3 reports)
export async function reportCommunityStory(postId: string, reason: string): Promise<{ hidden: boolean }> {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('Sign in required to report content.');

  const reportDocRef = doc(db, `${POSTS_PATH}/${postId}/reports`, currentUser.uid);
  const postRef = doc(db, POSTS_PATH, postId);

  try {
    await setDoc(reportDocRef, {
      userId: currentUser.uid,
      reason: reason.slice(0, 200),
      createdAt: new Date().toISOString()
    });

    await updateDoc(postRef, {
      reportCount: increment(1)
    });

    const updatedSnap = await getDoc(postRef);
    const currentReports = (updatedSnap.data()?.reportCount || 0) as number;
    if (currentReports >= 3) {
      await updateDoc(postRef, { isHidden: true });
      return { hidden: true };
    }
    return { hidden: false };
  } catch (err) {
    console.warn('Report story failed:', err);
    throw err;
  }
}

// Delete post (author or admin)
export async function deleteCommunityPost(postId: string): Promise<void> {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('Unauthorized');

  const postRef = doc(db, POSTS_PATH, postId);
  try {
    await deleteDoc(postRef);
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `${POSTS_PATH}/${postId}`);
  }
}

// Save result feedback ("Was this result correct?")
export async function submitResultFeedback(verdict: string, category: string, isCorrect: boolean): Promise<void> {
  const feedbackId = `fb_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  try {
    await setDoc(doc(db, FEEDBACK_PATH, feedbackId), {
      verdict,
      category,
      isCorrect,
      createdAt: new Date().toISOString()
    });
  } catch (err) {
    console.warn('Feedback submit fallback:', err);
  }
}

// Submit or update app review (1 per user)
export async function submitAppReview(stars: number, review: string): Promise<void> {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('Sign in required to review the app.');

  const reviewRef = doc(db, APP_REVIEWS_PATH, currentUser.uid);
  try {
    await setDoc(reviewRef, {
      userId: currentUser.uid,
      userName: currentUser.displayName || 'Community Member',
      userPhoto: currentUser.photoURL || '',
      stars,
      review: review.slice(0, 300),
      createdAt: new Date().toISOString()
    });
  } catch (err) {
    console.warn('App review submit failed:', err);
    throw err;
  }
}

// Fetch app review aggregate
export async function fetchAppReviewsAggregate(): Promise<{ average: number; count: number }> {
  try {
    const snap = await getDocs(collection(db, APP_REVIEWS_PATH));
    if (snap.empty) return { average: 0, count: 0 };
    let total = 0;
    snap.forEach(d => {
      total += (d.data().stars || 5);
    });
    return {
      average: Number((total / snap.size).toFixed(1)),
      count: snap.size
    };
  } catch (err) {
    return { average: 0, count: 0 };
  }
}

// Fetch Admin Moderation Dashboard data
export async function fetchAdminDashboardData(): Promise<{
  totalPosts: number;
  reportedPosts: CommunityPost[];
  categoryBreakdown: Record<string, number>;
}> {
  try {
    const snap = await getDocs(collection(db, POSTS_PATH));
    let totalPosts = 0;
    const reportedPosts: CommunityPost[] = [];
    const categoryBreakdown: Record<string, number> = {};

    snap.forEach((d) => {
      totalPosts++;
      const data = d.data() as CommunityPost;
      data.id = d.id;
      categoryBreakdown[data.category] = (categoryBreakdown[data.category] || 0) + 1;
      if ((data.reportCount || 0) > 0 || data.isHidden) {
        reportedPosts.push(data);
      }
    });

    return { totalPosts, reportedPosts, categoryBreakdown };
  } catch (err) {
    console.warn('Admin dashboard fetch fallback:', err);
    return {
      totalPosts: 0,
      reportedPosts: [],
      categoryBreakdown: {}
    };
  }
}
