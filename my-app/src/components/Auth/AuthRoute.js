import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";

function AuthRoute({ auth: license, component: Component, render, ...rest }) {
  const [cookies] = useCookies(["user"]);
  let auth = "";
  if (cookies.user !== undefined) {
    auth = cookies.user.authority;
  }
  function id_verification(license) {
    for (var i = 0; i < license.length; i++) {
      if (license[i] === auth) {
        return true;
      }
    }
    console.log(`Allow member : [${license}] But you are ${auth}`);
    return false;
  }
  const verified = id_verification(license);
  return (
    <>
      <Route
        {...rest}
        render={props =>
          verified ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
        }
      />
    </>
  );
}

export default AuthRoute;
