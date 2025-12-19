import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
// import { getNativeDb } from "../native-db";
import { getClient } from "../db";

export const auth = betterAuth({
  database: mongodbAdapter(await getClient()),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [nextCookies()],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  user: {
    additionalFields: {
      role: {
        type: ["user", "admin", "super_admin"],
        defaultValue: "user",
      },
      isActive: {
        type: "boolean",
        defaultValue: true,
      },
      image: {
        type: "string",
        defaultValue:
          "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
      },
    },
  },
});
