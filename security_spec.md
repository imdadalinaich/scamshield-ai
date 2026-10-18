# Security Specification: 360 ScamShield AI

## 1. Data Invariants

1. **User Identity & Role Integrity**:
   - Only authenticated users can write to their own profile `/users/{userId}` where `userId == request.auth.uid`.
   - Users cannot elevate their own role to `admin`. Only predefined admin email `naixhimdadali@gmail.com` has administrator privileges.

2. **Community Post Ownership & Anti-Tamper**:
   - Posts can only be created by signed-in users with `authorId == request.auth.uid`.
   - Post authors can edit or delete their own posts. Non-authors cannot edit posts.
   - Admin can delete any post.
   - Counters (`ratingCount`, `ratingSum`, `commentCount`, `reportCount`) can only be modified within strictly defined numerical boundaries or via atomic updates.
   - Hidden posts (`isHidden == true`) are filtered from public listing unless viewed by the author or admin.

3. **Single Rating Per User Invariant**:
   - Rating document ID is strictly bound to `userId` at `/community_posts/{postId}/ratings/{userId}` ensuring one rating per user per post.
   - Users can only write their own rating (`userId == request.auth.uid`) with valid star rating between 1 and 5.

4. **Comments & Reports Integrity**:
   - Comments can only be created by signed-in users with `authorId == request.auth.uid`.
   - Users can only delete their own comments or admin can delete any comment.
   - Reports are stored at `/community_posts/{postId}/reports/{userId}` preventing multi-voting from a single user.

5. **Scam Hash & Feedback Integrity**:
   - Feedback docs can only record verdict accuracy signals (`isCorrect`, `verdict`, `category`), strictly forbidding raw message text or PII.
   - Known scam hashes record SHA-256 strings (exactly 64 hex characters) and metadata, never raw content.

---

## 2. The "Dirty Dozen" Threat Payloads

1. **Payload 1 (Privilege Escalation on User Profile)**:
   - Attempt by regular user to set `role: "admin"` on `/users/{uid}`.
   - Expected Result: `PERMISSION_DENIED`.

2. **Payload 2 (Ghost Field Injection / Shadow Update)**:
   - Attempt to add an unauthorized field `bypassedSecurity: true` or `isVerified: true` to a community post.
   - Expected Result: `PERMISSION_DENIED` via `hasOnly()` key guard.

3. **Payload 3 (Impersonating Post Author)**:
   - Creating a post with `authorId: "victim_user_123"` while authenticated as `attacker_456`.
   - Expected Result: `PERMISSION_DENIED`.

4. **Payload 4 (Tampering with Another User's Post)**:
   - Attempting to update `title` or `story` of someone else's community post.
   - Expected Result: `PERMISSION_DENIED`.

5. **Payload 5 (Deleting Another User's Post as Non-Admin)**:
   - Attempt by regular user to delete a post belonging to another user.
   - Expected Result: `PERMISSION_DENIED`.

6. **Payload 6 (Oversized Data / Denial-of-Wallet Attack)**:
   - Attempt to send a 2MB string in `story` or a 50KB string in `title`.
   - Expected Result: `PERMISSION_DENIED` via strict `.size() <= 2000` validation.

7. **Payload 7 (Invalid Rating Bounds)**:
   - Attempt to submit a rating with `stars: 99` or `stars: -10`.
   - Expected Result: `PERMISSION_DENIED` (only integers 1 through 5 allowed).

8. **Payload 8 (Rating Document ID Hijack)**:
   - Attempting to submit a rating under `/community_posts/{postId}/ratings/other_user_id`.
   - Expected Result: `PERMISSION_DENIED` (path ID must equal `request.auth.uid`).

9. **Payload 9 (Comment Author Spoofing)**:
   - Submitting a comment where `authorId` does not match `request.auth.uid`.
   - Expected Result: `PERMISSION_DENIED`.

10. **Payload 10 (Direct Unverified Scam Hash Injection)**:
    - Non-admin or untrusted user attempting to mark a hash as `verified: true` directly.
    - Expected Result: `PERMISSION_DENIED`.

11. **Payload 11 (Unauthenticated Write)**:
    - Unauthenticated guest attempting to create a post, comment, or rating.
    - Expected Result: `PERMISSION_DENIED`.

12. **Payload 12 (Direct Arbitrary User Checks Injection)**:
    - Attempting to read another user's personal scan history at `/users/{otherUid}/checks`.
    - Expected Result: `PERMISSION_DENIED`.
