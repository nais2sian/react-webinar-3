export function buildCommentsTree(comments) {
  const map = {};
  const roots = [];

  if (!Array.isArray(comments)) {
    console.error('Expected an array, got:', comments);
    return roots;
  }
  const sortedComments = [...comments].sort(
    (a, b) => new Date(a.dateCreate) - new Date(b.dateCreate),
  );
  sortedComments.forEach(comment => {
    map[comment._id] = { ...comment, replies: [] };
  });
  sortedComments.forEach(comment => {
    if (comment.parent && comment.parent._type === 'article') {
      roots.push(map[comment._id]);
    } else if (comment.parent && comment.parent._type === 'comment') {
      if (map[comment.parent._id]) {
        map[comment.parent._id].replies.push(map[comment._id]);
      } else {
        roots.push(map[comment._id]);
      }
    }
  });
  const sortReplies = comment => {
    if (comment.replies && comment.replies.length > 0) {
      comment.replies.sort((a, b) => new Date(a.dateCreate) - new Date(b.dateCreate));
      comment.replies.forEach(reply => sortReplies(reply));
    }
  };
  roots.forEach(rootComment => sortReplies(rootComment));
  return roots;
}
