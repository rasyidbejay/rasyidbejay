import { motion } from 'framer-motion'
import { ScrollTrigger } from '../lib/motion'

const ease = [0.76, 0, 0.24, 1]

// Curtain wipe between routes. The curtain covers on exit and lifts on enter.
export default function PageTransition({ children }) {
  return (
    <>
      <motion.div
        className="curtain"
        initial={{ scaleY: 1, originY: 0 }}
        animate={{ scaleY: 0, originY: 0, transition: { duration: 0.8, ease, delay: 0.08 } }}
        exit={{ scaleY: 1, originY: 1, transition: { duration: 0.6, ease } }}
        onAnimationComplete={() => ScrollTrigger.refresh()}
        aria-hidden="true"
      />
      <motion.div
        className="page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.01, delay: 0.1 } }}
        exit={{ opacity: 1, transition: { duration: 0.6 } }}
      >
        {children}
      </motion.div>
    </>
  )
}
