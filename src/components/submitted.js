import React from 'react'
import { motion, AnimatePresence } from "framer-motion";

const Submitted = () => {
  return (
    <motion.h2
        className="text-center text-xl font-bold text-green-600 mt-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Thank you for your time! Redirecting...
      </motion.h2>
  )
}

export default Submitted