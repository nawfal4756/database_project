import {
  deleteAccountById,
  getAccountByProvider,
  insertAccount,
} from "../Database/AccountCommands";
import {
  deleteSessionById,
  getSessionById,
  getSessionBySessionToken,
  insertSession,
  updateSessionById,
} from "../Database/SessionCommands";
import {
  deleteUserById,
  getUserByEmail,
  getUserByEmailWE,
  getUserById,
  insertUser,
  updateUserById,
} from "../Database/UserCommands";

export default function MySQLAdapter(client, options = {}) {
  return {
    async createUser(user) {
      console.log("Create User");
      const result = await getUserByEmail(user);
      if (result.length > 0) {
        return result[0];
      }

      const newUser = await insertUser(user);
      return { id: newUser.insertId };
    },
    async getUser(id) {
      console.log("Get User By ID");
      const tempId = parseInt(id);
      const user = await getUserById(tempId);
      console.log(user[0]);
      return user[0];
    },
    async getUserByEmail(email) {
      console.log("Get User By Email");
      const user = await getUserByEmailWE(email);
      console.log("EmailUser", user[0]);
      return user[0];
    },
    async getUserByAccount({ providerAccountId, provider }) {
      console.log("Get User By Account");
      const account = await getAccountByProvider(providerAccountId, provider);
      if (account.length <= 0) {
        console.log("Returned from User By Account");
        return;
      }

      const user = await getUserById(account[0].userId);
      console.log("AccountUser", user[0]);
      return user[0];
    },
    async updateUser(updatedUser) {
      console.log("Update User");
      const id = parseInt(updatedUser.id);
      const user = await getUserById(id);

      if (user.length <= 0) {
        throw new Error("User does not exist");
      }

      const response = await updateUserById(updatedUser);
      console.log(response[0]);
      return response[0];
    },
    async deleteUser(userId) {
      console.log("Delete User");
      return await deleteUserById(parseInt(userId));
    },
    async linkAccount(account) {
      console.log("Link Account");
      const accountInserted = await insertAccount(account);
      return { id: accountInserted.insertId };
    },
    async unlinkAccount({ providerAccountId, provider }) {
      console.log("Unlink Account");
      const account = await getAccountByProvider(providerAccountId, provider);

      if (account.length <= 0) {
        return;
      }

      return await deleteAccountById(parseInt(account[0].id));
    },
    async createSession({ sessionToken, userId, expires }) {
      console.log("Create Session");
      await insertSession(sessionToken, userId, expires);
      console.log("Session Created");
      return { sessionToken };
    },
    async getSessionAndUser(sessionToken) {
      console.log("Get Session and User");
      const session = await getSessionBySessionToken(sessionToken);
      if (session.length <= 0) {
        return;
      }

      const user = await getUserById(parseInt(session[0].userId));
      if (user.length <= 0) {
        return;
      }

      return { session: session[0], user: user[0] };
    },
    async updateSession({ sessionToken }) {
      console.log("Update Session");
      const session = await getSessionBySessionToken(sessionToken);
      if (session.length <= 0) {
        throw new Error("Session cannot be found!");
      }

      const updated = await updateSessionById(parseInt(session[0].id));
      return updated[0];
    },
    async deleteSession(sessionToken) {
      console.log("Delete Session");
      console.log("Session Token", sessionToken);
      const session = await getSessionBySessionToken(sessionToken);
      console.log("Session", session);
      if (session.length <= 0) {
        return;
      }

      return await deleteSessionById(parseInt(session[0].id));
    },
  };
}
