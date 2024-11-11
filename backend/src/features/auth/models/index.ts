import { pgClient } from "../../../database/init";
import { toHash } from "../../../utils/hashes";

interface StoredUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  register_at: Date;
  updated_at: Date;
  last_login: Date;
  is_verified: boolean;
  verification_token: string;
  phone_number?: string;
}

export interface ReturnedStoredUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  registerAt: Date;
  updateAt: Date;
  lastLogin: Date;
  isVerified: boolean;
  verificationToken: string;
}

export interface SafeUser extends Omit<ReturnedStoredUser, "password" | "verificationToken"> {}

export interface NewUserPayload extends Omit<ReturnedStoredUser, "registerAt" | "updateAt" | "isVerified" | "lastLogin"> {}

interface StoredEmailVerification {
  id: number;
  email: string;
  user_id: number;
  is_sent: boolean;
  created_at: Date;
  updated_at: Date;
  attempts: number;
}
export interface ReturnedEmailVerification {
  id: number;
  email: string;
  userId: number;
  isSent: boolean;
  createdAt: Date;
  updatedAt: Date;
  attempts: number;
}
interface EmailVerificationPayload extends Omit<ReturnedEmailVerification, "id" | "createdAt" | "updatedAt" | "attempts"> {}

const storedUserToReturnedStoredUser = (storedUser: StoredUser): SafeUser => {
  return {
    id: storedUser.id,
    firstName: storedUser.first_name,
    lastName: storedUser.last_name,
    email: storedUser.email,
    isVerified: storedUser.is_verified,
    lastLogin: storedUser.last_login,
    registerAt: storedUser.register_at,
    updateAt: storedUser.updated_at,
    phoneNumber: storedUser.phone_number,
  };
};
const storedEmailVerificationsToReturnedEmailVerifications = (emailVerification: StoredEmailVerification): ReturnedEmailVerification => {
  return {
    id: emailVerification.id,
    userId: emailVerification.user_id,
    email: emailVerification.email,
    createdAt: emailVerification.created_at,
    attempts: emailVerification.attempts,
    updatedAt: emailVerification.updated_at,
    isSent: emailVerification.is_sent,
  };
};

export const InsertUserModel = async (user: NewUserPayload): Promise<{ safeUser: SafeUser; verificationToken: StoredUser["verification_token"] }> => {
  try {
    const randomToken = crypto.randomUUID();
    const response = await pgClient.query(
      `INSERT INTO Users 
        (first_name, last_name, email, password, phone_number, verification_token) 
        VALUES
         ($1, $2, $3, $4, $5, $6)
         RETURNING *
         `,
      [user.firstName, user.lastName, user.email, user.password, user.phoneNumber, toHash(randomToken)]
    );

    const storedUser = response.rows[0] as StoredUser;

    return { safeUser: storedUserToReturnedStoredUser(storedUser), verificationToken: randomToken };
  } catch (err) {
    throw err;
  }
};

export const SelectUserModel = async (identifier: string | number): Promise<SafeUser | undefined> => {
  /** if identifier is number field = id, else field = email*/
  const field = typeof identifier === "number" ? "id" : "email";
  try {
    const response = await pgClient.query(
      `SELECT * FROM Users  
          WHERE ${field}=$1`,
      [identifier]
    );
    if (!response.rows.length) return;

    const storedUser = response.rows[0] as StoredUser;

    return storedUserToReturnedStoredUser(storedUser);
  } catch (err) {
    throw err;
  }
};

export const SelectUnsafeUserModel = async (identifier: string | number): Promise<ReturnedStoredUser | undefined> => {
  /** if identifier is number field = id, else field = email*/
  const field = typeof identifier === "number" ? "id" : "email";

  try {
    const response = await pgClient.query(
      `SELECT * FROM Users  
          WHERE ${field}=$1`,
      [identifier]
    );
    if (!response.rows.length) return;

    const storedUser = response.rows[0] as StoredUser;
    return { ...storedUserToReturnedStoredUser(storedUser), password: storedUser.password, verificationToken: storedUser.verification_token };
  } catch (err) {
    throw err;
  }
};

export const UpdateLoginModel = async (identifier: string | number): Promise<SafeUser> => {
  const field = typeof identifier === "number" ? "id" : "email";

  try {
    const response = await pgClient.query(
      `UPDATE Users  
       SET last_login = $1
       WHERE ${field} = $2
       RETURNING *;`,
      [new Date(), identifier]
    );

    if (!response.rows.length) throw new Error(`User with ${field} : ${identifier} not found `);
    const storedUser = response.rows[0] as StoredUser;

    return storedUserToReturnedStoredUser(storedUser);
  } catch (err) {
    throw err;
  }
};
export const UpdateUserIsVerifyModel = async (identifier: string | number): Promise<SafeUser> => {
  const field = typeof identifier === "number" ? "id" : "email";

  try {
    const response = await pgClient.query(
      `UPDATE Users  
       SET is_verified = $1
       WHERE ${field} = $2
       RETURNING *;`,
      [true, identifier]
    );

    if (!response.rows.length) throw new Error(`User with ${field} : ${identifier} not found `);
    const storedUser = response.rows[0] as StoredUser;

    return storedUserToReturnedStoredUser(storedUser);
  } catch (err) {
    throw err;
  }
};

export const NewEmailVerificationModel = async (emailVerificationPayload: EmailVerificationPayload): Promise<ReturnedEmailVerification> => {
  try {
    const response = await pgClient.query(
      `INSERT INTO Email_Verifications
      (email, user_id, is_sent, attempts)
      VALUES 
      ($1,$2,$3,$4)
      RETURNING *
       `,
      [emailVerificationPayload.email, emailVerificationPayload.userId, emailVerificationPayload.isSent, 1]
    );

    const storedEmailVerification = response.rows[0] as StoredEmailVerification;

    return storedEmailVerificationsToReturnedEmailVerifications(storedEmailVerification);
  } catch (err) {
    throw err;
  }
};
export const UpdateEmailVerificationModel = async (emailVerificationPayload: EmailVerificationPayload): Promise<ReturnedEmailVerification> => {
  try {
    const response = await pgClient.query(
      `UPDATE Email_Verifications
      SET updated_at=$1,
      is_sent=$2,
      attempts = attempts + 1
      WHERE email=$3
      RETURNING *
       `,
      [new Date(), emailVerificationPayload.isSent, emailVerificationPayload.email]
    );
    if (!response.rows.length) throw new Error(`Email Verification with email ${emailVerificationPayload.email} not found `);
    const storedEmailVerification = response.rows[0] as StoredEmailVerification;

    return storedEmailVerificationsToReturnedEmailVerifications(storedEmailVerification);
  } catch (err) {
    throw err;
  }
};
export const SelectEmailVerificationModel = async (email: string): Promise<ReturnedEmailVerification | undefined> => {
  try {
    const response = await pgClient.query(
      `
      SELECT * FROM Email_Verifications WHERE email=$1
      `,
      [email]
    );
    const storedEmailVerification = response.rows[0] as StoredEmailVerification | undefined;
    if (!storedEmailVerification) return;

    return storedEmailVerificationsToReturnedEmailVerifications(storedEmailVerification);
  } catch (err) {
    throw err;
  }
};
