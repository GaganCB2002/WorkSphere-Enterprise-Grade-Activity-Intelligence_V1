import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SuperAdminDashboard() {
  const navigate = useNavigate()
  useEffect(() => { navigate('/employees', { replace: true }) }, [navigate])
  return null
}
