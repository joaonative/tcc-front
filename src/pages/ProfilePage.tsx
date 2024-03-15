import { useAuth } from "../contexts/AuthContext";
import Section from "../components/Section";
import Button from "../components/Button";

const ProfilePage = () => {
  const { userData, logout } = useAuth();
  return (
    <Section title="Perfil">
      <div>logado como: {userData?.email}</div>
      <Button variant="outline" onClick={() => logout()}>
        Sair
      </Button>
    </Section>
  );
};

export default ProfilePage;
