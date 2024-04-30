import { useRef } from "react";
import { Community } from "../../interfaces/Community";
import { useInView, motion } from "framer-motion";
import CommunityCard from "./CommunityCard";

interface Props {
  communities: Community[];
}

const CommunityList = ({ communities }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };
  return (
    <ul
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 lg:gap-6 justify-start items-start"
    >
      {communities.map((community, index) => (
        <motion.li
          variants={cardVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          transition={{ duration: 0.4, delay: index * 0.18 }}
          key={community._id}
        >
          <CommunityCard community={community} />
        </motion.li>
      ))}
    </ul>
  );
};

export default CommunityList;
