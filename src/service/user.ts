import { client } from "./sanity";

type OAuthUser = {
  id: string;
  username: string;
  name: string;
  email: string;
  image?: string | null;
};

export async function addUser({ id, username, name, email, image }: OAuthUser) {
  return client.createIfNotExists({
    _type: "user",
    _id: id,
    username,
    name,
    email,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByEmail(email: string) {
  return client.fetch(
    `
    *[_type == "user" && email == "${email}"]
    [0]
    {
      ...,
      "id":_id,
      following[]->{username,image},
      followers[]->{username,image},
      "bookmarks":bookmarks[]->_id
    }
    `,
  );
}

export async function getSearchUsers(keyword?: string) {
  const query = keyword
    ? `&& (name match "${keyword}") || (username match "${keyword}")`
    : "";

  return client.fetch(
    `
      *[_type == "user" ${query}]{
        ...,
        "id":_id,
        "following":count(following),
        "followers":count(followers),
      }
    `,
  );
}

export async function getUserForProfile(username: string) {
  return client
    .fetch(
      `
      *[_type == "user" && username == "${username}"]
      [0]
      {
        ...,
        "id": _id,
        "following": count(following),
        "followers": count(followers),
        "posts": count(*[_type == "post" && author -> username == "${username}"])
      }
    `,
    )
    .then((cV) => ({
      ...cV,
      following: cV.following ?? 0,
      followers: cV.followers ?? 0,
      posts: cV.posts ?? 0,
    }));
}

export async function addBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [
      {
        _ref: postId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function deleteBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref == "${postId}"]`])
    .commit({ autoGenerateArrayKeys: true });
}

export async function follow(loggedInUserId: string, targetUserId: string) {
  return client
    .transaction()
    .patch(loggedInUserId, (user) =>
      user
        .setIfMissing({ following: [] })
        .append("following", [{ _ref: targetUserId, _type: "reference" }]),
    )
    .patch(targetUserId, (user) =>
      user
        .setIfMissing({ followers: [] })
        .append("followers", [{ _ref: loggedInUserId, _type: "reference" }]),
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(loggedInUserId: string, targetUserId: string) {
  return client
    .transaction()
    .patch(loggedInUserId, (user) =>
      user.unset([`following[_ref == "${targetUserId}"]`]),
    )
    .patch(targetUserId, (user) =>
      user.unset([`followers[_ref == "${loggedInUserId}"]`]),
    )
    .commit({ autoGenerateArrayKeys: true });
}
