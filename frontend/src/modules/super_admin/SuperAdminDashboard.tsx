import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const SuperAdminDashboard: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/employees', { replace: true })
  }, [navigate])

  return null
}

export default SuperAdminDashboard
