import { Pencil } from "lucide-react";

import { useAuth } from "../contexts/AuthContext";
import Section from "../components/Section";
import Button from "../components/Button";

export default function ProfilePage() {
  const { userData, logout } = useAuth();
  return (
    <Section title="">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <div className="flex items-end -space-x-8">
            <img
              src={`http://${userData?.id}`}
              onError={(e) => {
                e.target.src = "/default-user.webp";
              }}
              alt=""
              width={128}
              height={128}
              className="object-cover rounded-full border-4 border-purple dark:border-green"
            />
            <button className="p-3 bg-lightGray dark:bg-dark rounded-full shadow-xl">
              <Pencil size={24} className="text-purple dark:text-green" />
            </button>
          </div>
          <h1 className="text-4xl">{userData?.name}</h1>
        </div>
        <Button variant="outline" onClick={() => logout()}>
          Sair
        </Button>
      </div>
    </Section>
  );
}
