export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      // author
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      // photo
      name: 'photo',
      title: 'Photo',
      type: 'image',
    },
    {
      // likes
      name: 'likes',
      title: 'Likes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
    {
      // comments
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [
        {
          name: 'comment',
          title: 'Comment',
          type: 'document',
          fields: [
            {
              name: 'author',
              title: 'Author',
              type: 'reference',
              to: [{type: 'user'}],
            },
            {
              name: 'comment',
              title: 'Comment',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'comments.0.comment',
      authorName: 'author.name',
      authorUsername: 'author.username',
      media: 'photo',
    },
    prepare(selection) {
      const {title, authorName, authorUsername, media} = selection
      return {
        title,
        subtitle: `by ${authorName} (${authorUsername})`,
        media,
      }
    },
  },
}
