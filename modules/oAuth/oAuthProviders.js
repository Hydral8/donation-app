import { googleOAuthConfig } from "./oAuthConfigs";
import * as AppAuth from "expo-app-auth";

const googleSignIn = async () => {
  let authState = await AppAuth.authAsync(googleOAuthConfig);
  console.log(authState);
  // const credential = provider.credential(authState.idToken);
  // auth
  //   .signInWithCredential(credential)
  //   .then(res => console.log(res.user))
  //   .catch(err => console.error(err));
  return authState;
};

export { googleSignIn };
