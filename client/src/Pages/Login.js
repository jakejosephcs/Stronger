import LoginForum from "../Components/LoginForum";
import AuthHeader from "../Components/AuthHeader";
import Container from "../Components/Container";

function Login() {
  return (
    <Container>
      <AuthHeader isLoginHeader={true} />
      <LoginForum />
    </Container>
  );
}

export default Login;
