import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const { login, isLoggedIn, logout, userData } = useAuth();

  return (
    <>
      <div className="text-white">
        <Button
          variant="primary"
          onClick={() => {
            login();
          }}
        >
          Entrar com o google
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            logout();
          }}
        >
          Sair
        </Button>
        <div>
          {isLoggedIn ? <p>logado como {userData?.email}</p> : <p>deslogado</p>}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
