export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      // id
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      // name
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      // email
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      // image
      name: 'image',
      title: 'Image',
      type: 'string',
    },
    {
      // following
      name: 'following',
      title: 'Following',
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
      // follower
      name: 'follower',
      title: 'Follower',
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
      // bookmarks
      name: 'bookmarks',
      title: 'Bookmarks',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'post'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'username',
    },
  },
}
