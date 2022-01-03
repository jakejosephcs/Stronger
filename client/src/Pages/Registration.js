import RegistrationForum from "../Components/RegistrationForum";
import AuthHeader from "../Components/AuthHeader";
import Container from "../Components/Container";

function Registration() {
  return (
    <Container>
      <AuthHeader isLoginHeader={false} />
      <RegistrationForum />
    </Container>
  );
}

export default Registration;
