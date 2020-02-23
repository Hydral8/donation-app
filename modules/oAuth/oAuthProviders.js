import { googleOAuthConfig } from "./oAuthConfigs";
import * as AppAuth from "expo-app-auth";

const googleSignIn = async () => {
  let authState = await AppAuth.authAsync({
    issuer: "https://accounts.google.com",
    scopes: ["profile", "email"],
    clientId:
      "423009903286-cp54kq0m3ellnovk2qs8p66acj34nf3j.apps.googleusercontent.com"
  });
  console.log(authState);
  // const credential = provider.credential(authState.idToken);
  // auth
  //   .signInWithCredential(credential)
  //   .then(res => console.log(res.user))
  //   .catch(err => console.error(err));
  return authState;
};

export { googleSignIn };
