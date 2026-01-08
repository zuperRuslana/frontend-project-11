export const createPostActions = (watchedObject) => ({
  readPost(postId) {
    const id = postId
    
    if (!watchedObject.ui.readPostsIds.includes(id)) {
      watchedObject.ui.readPostsIds = [...watchedObject.ui.readPostsIds, id]
      console.log('NEW readPostsIds:', watchedObject.ui.readPostsIds)
    } 
  },
})
