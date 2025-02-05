import {
  Client,
  Account,
  ID,
  Models,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite"

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.killer.VideoSharing",
  projectId: "6793a1f5001596e7e91a",
  databaseId: "6793a3fe001bcc96c680",
  userCollectionId: "6793a41d002a809ca443",
  videosCollectionId: "6793a4390004c7f5d1bd",
  storageId: "6793a5ba002673679403",
}

const client = new Client()

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform)

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)
const storage = new Storage(client)

// parameters need to be exactly the same as in appwrite or else they give error

// Sign Up
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    )

    if (!newAccount) throw Error

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    )

    return newUser
  } catch (error) {
    throw new Error(error)
  }
}

// Sign In
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password)

    return session
  } catch (error) {
    throw new Error(error)
  }
}

// Sign Out
export const signOut = async () => {
  try {
    const session = await account.deleteSession("current")
    return session
  } catch (err) {
    throw new Error(err)
  }
}

// fetch current user
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()
    if (!currentAccount) throw Error

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    )

    if (!currentUser) throw Error

    return currentUser.documents[0]
  } catch (err) {
    console.error(err)
  }
}

// fetch all posts
export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.orderDesc("$createdAt")]
    )
    return posts.documents
  } catch (err) {
    console.error(err)
  }
}

export const getLatestPosts = async () => {
  try {
    const latestPosts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    )

    return latestPosts.documents // * important
  } catch (err) {
    console.error(err)
  }
}

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.search("title", query)]
    )

    return posts.documents // * important
  } catch (err) {
    console.error(err)
  }
}

export const getUserPosts = async (userId) => {
  try {
    const userPosts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      // [Query.search("creator", userId)] Appwrite does not support full-text search on relationships.
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")] // Change it to filter by the related document's ID
    )

    return userPosts.documents // * important
  } catch (err) {
    console.error(err)
  }
}

export const getFilePreview = async (fileId, type) => {
  let fileUrl

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(config.storageId, fileId)
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      ) // check getFilePreview for required params
    } else {
      throw new Error("Invalid file type")
    }

    if (!fileUrl) throw Error

    return fileUrl
  } catch (err) {
    throw new Error(err)
  }
}

export const uploadFile = async (file, type) => {
  if (!file) return

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  }
  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    )

    const fileUrl = await getFilePreview(uploadedFile.$id, type)
    console.log(object)
    return fileUrl
  } catch (err) {
    throw new Error(err)
  }
}

export const createPost = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ])

    const newPost = await databases.createDocument(
      config.databaseId,
      config.videosCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    )

    return newPost
  } catch (err) {
    throw new Error(err)
  }
}
