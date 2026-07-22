import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }
}

export default function DashboardShell({ title, subtitle, children, userName }) {
  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  })

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-xl font-semibold text-primary">{title}</h1>
        <p className="text-sm text-secondary mt-0.5">
          {userName ? `Welcome back, ${userName.split(' ')[0]} \u00B7 ` : ''}{dateStr}
        </p>
      </motion.div>
      {children}
    </motion.div>
  )
}

export { containerVariants, itemVariants }
