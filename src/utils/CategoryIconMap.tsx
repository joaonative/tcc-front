import {
  Drama,
  HeartPulse,
  Leaf,
  Music2,
  PartyPopper,
  PlaneLanding,
} from "lucide-react";

export const categoryIconMap: { [key: string]: JSX.Element } = {
  Cultura: <Drama size={24} className="text-purple dark:text-green" />,
  Festa: <PartyPopper size={24} className="text-purple dark:text-green" />,
  Música: <Music2 size={24} className="text-purple dark:text-green" />,
  Natureza: <Leaf size={24} className="text-purple dark:text-green" />,
  Esportes: <PlaneLanding size={24} className="text-purple dark:text-green" />,
  Saúde: <HeartPulse size={24} className="text-purple dark:text-green" />,
};
