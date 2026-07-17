import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const StaffContext = createContext(null)

export const API = 'https://rasha-backend.onrender.com'

export function StaffProvider({ children }) {
  const [lang, setLang] = useState('en')
  const [toast, setToast] = useState(null)
  const [staffToken, setStaffTokenState] = useState(() => localStorage.getItem('rasha_staff_token'))
  const [staffRole, setStaffRole] = useState(() => localStorage.getItem('rasha_staff_role') || 'staff')
  const [staffPermissions, setStaffPermissions] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rasha_staff_perms') || '{}') } catch { return {} }
  })
  const [staffName, setStaffName] = useState(() => localStorage.getItem('rasha_staff_name') || '')

  const toggleLang = () => {
    const next = lang === 'en' ? 'ar' : 'en'
    setLang(next)
    document.documentElement.lang = next
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr'
  }

  const t = (en, ar) => lang === 'ar' ? ar : en

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type, id: Date.now() })
  }, [])

  const setStaffToken = (tok, role = 'staff', permissions = {}, name = '') => {
    setStaffTokenState(tok)
    setStaffRole(role)
    setStaffPermissions(permissions)
    setStaffName(name)
    if (tok) {
      localStorage.setItem('rasha_staff_token', tok)
      localStorage.setItem('rasha_staff_role', role)
      localStorage.setItem('rasha_staff_perms', JSON.stringify(permissions))
      localStorage.setItem('rasha_staff_name', name)
    } else {
      localStorage.removeItem('rasha_staff_token')
      localStorage.removeItem('rasha_staff_role')
      localStorage.removeItem('rasha_staff_perms')
      localStorage.removeItem('rasha_staff_name')
    }
  }

  const isSuperAdmin = staffRole === 'super_admin'
  const hasPerm = (perm) => isSuperAdmin || !!staffPermissions[perm]

  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(null), 3500)
    return () => clearTimeout(id)
  }, [toast])

  return (
    <StaffContext.Provider value={{
      lang, toggleLang, t, toast, showToast,
      staffToken, setStaffToken, staffRole, staffPermissions, staffName,
      isSuperAdmin, hasPerm
    }}>
      {children}
    </StaffContext.Provider>
  )
}

export const useStaff = () => useContext(StaffContext)
