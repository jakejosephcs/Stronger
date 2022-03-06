import LoginForum from "../components/LoginForum";
import AuthHeader from "../components/shared/AuthHeader";
import Container from "../components/shared/Container";

function Login() {
  return (
    <Container>
      <AuthHeader isLoginHeader={true} />
      <LoginForum />
    </Container>
  );
}

export default Login;
