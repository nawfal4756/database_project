import { connection } from "./DBConnection";

const SELECT_ACCOUNT_BY_PROVIDER_PROVIDERID =
  "SELECT * FROM account WHERE providerAccountId = ? AND provider = ?;";
const INSERT_ACCOUNT =
  "INSERT INTO account (userId, type, provider, providerAccountId, refresh_token, access_token, expires_at, token_type, scope, id_token, session_state, oauth_token_secret, oauth_token) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
const DELETE_ACCOUNT = "DELETE FROM account WHERE id = ?;";

export const getAccountByProvider = async (providerAccountId, provider) => {
  const [rows, fields] = await connection.execute(
    SELECT_ACCOUNT_BY_PROVIDER_PROVIDERID,
    [providerAccountId, provider]
  );
  return rows;
};

export const insertAccount = async (account) => {
  const [rows, fields] = await connection.execute(INSERT_ACCOUNT, [
    account.userId ? parseInt(account.userId) : null,
    account.type ? account.type : null,
    account.provider ? account.provider : null,
    account.providerAccountId ? account.providerAccountId : null,
    account.refresh_token ? account.refresh_token : null,
    account.access_token ? account.access_token : null,
    account.expires_at ? account.expires_at : null,
    account.token_type ? account.token_type : null,
    account.scope ? account.scope : null,
    account.id_token ? account.id_token : null,
    account.session_state ? account.session_state : null,
    account.oauth_token_secret ? account.oauth_token_secret : null,
    account.oauth_token ? account.oauth_token : null,
  ]);
  return rows;
};

export const deleteAccountById = async (id) => {
  const [rows, fields] = await connection.execute(DELETE_ACCOUNT, [id]);
  return rows;
};
