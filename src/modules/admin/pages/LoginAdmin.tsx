import { useLanguageAwareNavigate } from "@/i18n";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
// import { useAuth } from "@/hooks/auth/Context";
// import { supabase } from "@/api/supabase";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "@/hooks/Context";
const LoginAdmin = () => {
  const navigate = useLanguageAwareNavigate();
  // const { session } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [loggedIn, setLoggedIn] = useState<boolean | null>(
    localStorage.getItem("loggedIn")
      ? localStorage.getItem("loggedIn") === "true"
        ? true
        : false
      : null
  );
  // async function signInWithEmail() {
  //   let session: any;
  //   await supabase.auth
  //     .signInWithPassword({
  //       email: email,
  //       password: password,
  //     })
  //     .then((response) => {
  //       if (response.error) {
  //         setMessage(response.error.message);
  //       } else {
  //         session = response.data.session;
  //         console.log("session", session);
  //         navigate("/dashboard");
  //       }
  //     });
  // }
  const signInWithEmail = () => {
    if (email === "test@test.test" && password === "asdasd") {
      setMessage("");
      setLoggedIn(true);
      localStorage.setItem("loggedIn", "true");
      navigate("/dashboard");
    } else {
      setMessage("Invalid email or password");
    }
  };
  if (loggedIn) {
    navigate("/dashboard");
  }
  return (
    <Card
      className="flex flex-col items-center justify-center p-8 w-full max-w-screen-lg sm:w-96 h-screen mx-auto"
      color="transparent"
      shadow={false}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <Typography
        variant="h4"
        color="blue-gray"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Sign in
      </Typography>
      <Typography
        color="gray"
        className="mt-1 font-normal"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Welcome! Enter your details to get to dashboard.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography
            variant="h6"
            color="blue-gray"
            className="-mb-3"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Your Email
          </Typography>
          <Input
            value={email}
            size="lg"
            placeholder="eg: name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Typography
            variant="h6"
            color="blue-gray"
            className="-mb-3"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Password
          </Typography>
          <Input
            value={password}
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>{message}</div>

        <Button
          className="mt-6 text-black bg-gradient-to-r from-light-blue-500 to-blue-500 hover:from-light-blue-400 hover:to-black-400"
          fullWidth
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          onClick={signInWithEmail}
        >
          sign in
        </Button>
      </form>
    </Card>
  );
};

export default LoginAdmin;
