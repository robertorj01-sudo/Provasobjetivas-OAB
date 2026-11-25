# Security Specification — Juris Tantum (Firebase Firestore)

## 1. Data Invariants
1. **PII Isolation**: Email addresses and private study workspaces live strictly in `/users/{userId}` and its subcollections (`bookmarks`, `examStates`, `simuladoHistory`, `reactions`, `notifications`). Public profiles in `/publicProfiles/{userId}` never store `email`, `phone`, or `address`.
2. **Verified Identity Enforcement**: Every write and authenticated community read requires `request.auth != null && request.auth.token.email_verified == true`.
3. **Immutable Ownership & Timestamps**: `uid`, `userId`, `authorId`, `followerId`, and `createdAt`/`joinedAt` are bound to `request.auth.uid` and `request.time` on creation and locked immutable on updates.
4. **Atomic Relational Sync (`existsAfter` / `getAfter`)**:
   - Liking or saving a `FeedPost` updates `likesCount`/`savesCount` atomically with creating/deleting the `/likes/{uid}` or `/saves/{uid}` child document.
   - Upvoting a `QuestionComment` updates `upvotesCount` atomically with creating/deleting `/upvotes/{uid}`.
   - Following a user creates/deletes `/follows/{followerId}_{followingId}` atomically with updating `followersCount` on the target `/publicProfiles/{targetId}`.
   - Creating a comment or reply atomically increments `commentsCount` or `repliesCount` on its parent document.
5. **Strict Bounds & Anti-Shadow Fields**: Every write validates exact required and allowed keys via `hasAll` + `hasOnly` (on create) and action-scoped `affectedKeys().hasOnly(...)` (on update). Every string and array enforces upper bounds.

## 2. The "Dirty Dozen" Adversarial Payloads
1. **Unverified Email Spoof**: User with `email_verified: false` tries to create `/publicProfiles/{uid}`. Expected: `PERMISSION_DENIED`.
2. **Ghost Field / Privilege Escalation (`isVerified` / `admin`)**: User sends `{ ..., isAdmin: true }` to `/publicProfiles/{uid}`. Expected: `PERMISSION_DENIED`.
3. **Cross-User PII Read**: User B attempts `get` on `/users/{userA}` or `list` on `/users`. Expected: `PERMISSION_DENIED`.
4. **Author Impersonation**: User A creates `/feedPosts/{postId}` with `authorId: "userB"`. Expected: `PERMISSION_DENIED`.
5. **Counter Inflation Without Evidence**: User attempts to set `likesCount: 9999` on `/feedPosts/{postId}` without atomic `+1` and `existsAfter(/likes/{uid})`. Expected: `PERMISSION_DENIED`.
6. **Timestamp Backdating**: User creates `/questionComments/{commentId}` with `createdAt` in the past instead of `request.time`. Expected: `PERMISSION_DENIED`.
7. **Orphaned Subcollection Write**: User creates `/feedPosts/nonexistent/comments/{id}` where parent post does not exist. Expected: `PERMISSION_DENIED`.
8. **ID Poisoning**: User targets `/feedPosts/invalid$id_with_150_chars...` violating `^[a-zA-Z0-9_\-]+$` or `<= 128`. Expected: `PERMISSION_DENIED`.
9. **Denial-of-Wallet String Overflow**: User sends a 50KB `content` string to `/feedPosts/{postId}` (`max 8000`). Expected: `PERMISSION_DENIED`.
10. **Immutable History Tampering**: User attempts to `update` `/users/{uid}/simuladoHistory/{attemptId}` to alter `isApproved: true`. Expected: `PERMISSION_DENIED`.
11. **Follow Spoofing**: User A tries to create `/follows/userB_userC` where `followerId != request.auth.uid`. Expected: `PERMISSION_DENIED`.
12. **Blanket Query Scraping on Private Notifications**: User A queries `/users/userB/notifications`. Expected: `PERMISSION_DENIED`.

## 3. Rules Test Runner Reference
See `firestore.rules` and ESLint validation via `@firebase/eslint-plugin-security-rules`.
