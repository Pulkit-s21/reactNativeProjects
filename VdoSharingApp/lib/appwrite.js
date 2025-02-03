import {
  Client,
  Account,
  ID,
  Models,
  Avatars,
  Databases,
  Query,
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

// parameters need to be exactly the same as in appwrite or else they give error
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
      config.videosCollectionId
    )
    return posts.documents
  } catch (err) {
    console.error(err)
  }
}
