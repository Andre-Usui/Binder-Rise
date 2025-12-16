import Feed from "./Feed/Feed";
import Landing from "./Landing/Landing";
import { useDisciplines } from '../DisciplinesContext.jsx'
import { AnimatePresence, motion } from 'motion/react';



export default function Body() {
  const { disc } = useDisciplines();

  const variants = {
    enter: {
      x: "100%",
      opacity: 0,
      position: "absolute", // evita empurrar layout
      width: "100%",
    },
    center: {
      x: 0,
      opacity: 1,
      position: "relative",
      width: "100%",
    },
    exit: {
      x: "-100%",
      opacity: 0,
      position: "absolute",
      width: "100%",
    },
  };

  return (
    <>
      <AnimatePresence mode="sync">
        {disc === "landing" ? (
          <motion.div
            key="landing"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <Landing />
          </motion.div>
        ) : disc === "null" ? null : (
          <motion.div
            key={`feed-${disc?.discipline_id ?? "default"}`}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <Feed />
          </motion.div>
        )}
      </AnimatePresence>

    </>
  )
}