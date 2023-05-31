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
