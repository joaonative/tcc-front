import Button from "../components/Button";
import Section from "../components/Section";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const { login, logout } = useAuth();

  return (
    <>
      <Section title="">
        <div className="w-full h-full flex justify-center">
          <div className="flex flex-col justify-center">
            <div className="flex flex-col">
              <h1 className="text-5xl font-prompt text-purple dark:text-green">
                Bem-vindo de volta!
              </h1>
              <Button
                variant="google"
                onClick={() => {
                  login();
                }}
              >
                <img src="google.svg" width={24} height={24}></img>
                Continue com o google
              </Button>
              <Button
                variant="google"
                onClick={() => {
                  logout();
                }}
              >
                <img src="google.svg" width={24} height={24}></img>
                Continue com o google
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default LoginPage;
