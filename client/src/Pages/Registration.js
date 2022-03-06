import RegistrationForum from "../components/RegistrationForum";
import AuthHeader from "../components/shared/AuthHeader";
import Container from "../components/shared/Container";

function Registration() {
  return (
    <Container>
      <AuthHeader isLoginHeader={false} />
      <RegistrationForum />
    </Container>
  );
}

export default Registration;
