export const createPostActions = (watchedObject) => ({
  readPost(postId) {
    const id = Number(postId);

    if (!watchedObject.ui.readPostsIds.includes(id)) {
      watchedObject.ui.readPostsIds.push(id);
    }
  },
});
