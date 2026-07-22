import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
export default function DataTable({
  columns,
  data,
  loading = false,
  sortable = true,
  selectable = false,
  searchable = false,
  pageSize = 20,
  emptyMessage = 'No data found',
  onSelectionChange,
  onRowClick,
  actions,
  stickyHeader = true,
}) {
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState(new Set())
  const [columnWidths, setColumnWidths] = useState({})
  const [hiddenCols, setHiddenCols] = useState(new Set())
  const [colMenuOpen, setColMenuOpen] = useState(false)
  const thRefs = useRef({})
  const colMenuRef = useRef(null)
  const tableRef = useRef(null)

  const visibleColumns = useMemo(
    () => columns.filter(c => !c.hidden && !hiddenCols.has(c.key)),
    [columns, hiddenCols]
  )

  const sortedData = useMemo(() => {
    if (!sortKey) return data
    return [...data].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (aVal == null) return 1
      if (bVal == null) return -1
      if (typeof aVal === 'number') return sortDir === 'asc' ? aVal - bVal : bVal - aVal
      return sortDir === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal))
    })
  }, [data, sortKey, sortDir])

  const filteredData = useMemo(() => {
    if (!search.trim()) return sortedData
    const q = search.toLowerCase()
    return sortedData.filter(row =>
      columns.some(col => {
        const val = row[col.key]
        return val != null && String(val).toLowerCase().includes(q)
      })
    )
  }, [sortedData, search, columns])

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize))
  const pagedData = filteredData.slice(page * pageSize, (page + 1) * pageSize)

  useEffect(() => {
    if (page >= totalPages) setPage(Math.max(0, totalPages - 1))
  }, [totalPages, page])

  useEffect(() => {
    function handleClickOutside(e) {
      if (colMenuRef.current && !colMenuRef.current.contains(e.target)) setColMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleSort = useCallback((key) => {
    if (!sortable) return
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }, [sortable, sortKey])

  const toggleSelect = useCallback((id) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      onSelectionChange?.(Array.from(next))
      return next
    })
  }, [onSelectionChange])

  const toggleSelectAll = useCallback(() => {
    if (selected.size === pagedData.length) {
      setSelected(new Set())
      onSelectionChange?.([])
    } else {
      const ids = new Set(pagedData.map(r => r.id ?? r._id))
      setSelected(ids)
      onSelectionChange?.(Array.from(ids))
    }
  }, [pagedData, selected, onSelectionChange])

  const allSelected = pagedData.length > 0 && selected.size === pagedData.length

  const startResize = useCallback((key, e) => {
    e.preventDefault()
    const startX = e.clientX
    const startWidth = thRefs.current[key]?.offsetWidth || 100

    function onMouseMove(e) {
      const diff = e.clientX - startX
      setColumnWidths(prev => ({
        ...prev,
        [key]: Math.max(60, startWidth + diff)
      }))
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }, [])

  const exportCSV = useCallback(() => {
    const headers = visibleColumns.map(c => c.label || c.key).join(',')
    const rows = filteredData.map(row =>
      visibleColumns.map(c => {
        const val = row[c.key]
        const str = val != null ? String(val).replace(/"/g, '""') : ''
        return `"${str}"`
      }).join(',')
    )
    const csv = [headers, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'export.csv'
    a.click()
    URL.revokeObjectURL(url)
  }, [visibleColumns, filteredData])

  if (loading) {
    return (
      <div className="bg-surface-elevated border border-subtle rounded-lg overflow-hidden">
        <div className="p-4 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4">
              {visibleColumns.map((c, j) => (
                <div key={j} className="skeleton h-5 flex-1" />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface-elevated border border-subtle rounded-lg overflow-hidden">
      {/* Toolbar */}
      {(searchable || actions) && (
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-subtle bg-surface-secondary">
          {searchable && (
            <motion.div 
              initial={false}
              animate={{ width: search ? 300 : 200 }}
              className="flex items-center gap-2 border border-slate-200 dark:border-slate-700/60 rounded-lg px-3 py-1.5 bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500 transition-all duration-200"
            >
              <svg className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(0) }}
                placeholder="Search..."
                className="flex-1 bg-transparent border-0 outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </motion.div>
          )}
          <div className="flex items-center gap-1">
            {actions}
            <button
              onClick={exportCSV}
              className="px-2.5 py-1.5 text-xs font-medium text-secondary hover:text-primary hover:bg-surface-hover rounded transition-colors"
              title="Export CSV"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
            <div ref={colMenuRef} className="relative">
              <button
                onClick={() => setColMenuOpen(!colMenuOpen)}
                className="px-2.5 py-1.5 text-xs font-medium text-secondary hover:text-primary hover:bg-surface-hover rounded transition-colors"
                title="Toggle columns"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
                </svg>
              </button>
              {colMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-surface-elevated border border-subtle rounded-lg shadow-lg z-50 py-1">
                  {columns.map(col => (
                    <label key={col.key} className="flex items-center gap-2 px-3 py-1.5 text-sm text-primary hover:bg-surface-hover cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!hiddenCols.has(col.key)}
                        onChange={() => setHiddenCols(prev => {
                          const next = new Set(prev)
                          if (next.has(col.key)) next.delete(col.key)
                          else next.add(col.key)
                          return next
                        })}
                        className="w-3.5 h-3.5 rounded border-border-strong text-[var(--color-brand-500)] focus:ring-[var(--color-brand-500)]"
                      />
                      {col.label || col.key}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto" ref={tableRef}>
        <table className="w-full border-collapse text-sm">
          {/* Header */}
          <thead>
            <tr className={stickyHeader ? 'sticky top-0 z-10' : ''} style={{ backgroundColor: 'var(--color-surface-secondary)' }}>
              {selectable && (
                <th className="w-10 px-3 py-2.5 border-b border-subtle">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="w-3.5 h-3.5 rounded border-border-strong text-[var(--color-brand-500)] focus:ring-[var(--color-brand-500)]"
                  />
                </th>
              )}
              {visibleColumns.map(col => (
                <th
                  key={col.key}
                  ref={el => thRefs.current[col.key] = el}
                  onClick={() => col.sortable !== false && toggleSort(col.key)}
                  className={`px-3 py-2.5 text-xs font-semibold text-secondary uppercase tracking-wider border-b border-subtle select-none ${col.sortable !== false && sortable ? 'cursor-pointer hover:text-primary' : ''}`}
                  style={{
                    width: columnWidths[col.key] || col.width,
                    minWidth: col.minWidth || 80,
                    textAlign: col.align || 'left',
                  }}
                >
                  <div className="flex items-center gap-1">
                    <span className="truncate">{col.label || col.key}</span>
                    {sortKey === col.key && (
                      <svg className={`w-3 h-3 flex-shrink-0 transition-transform ${sortDir === 'desc' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                      </svg>
                    )}
                    {/* Resize handle */}
                    <div
                      onMouseDown={(e) => startResize(col.key, e)}
                      className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-[var(--color-brand-400)] opacity-0 hover:opacity-100"
                    />
                  </div>
                </th>
              ))}
              <th className="w-10 px-3 py-2.5 border-b border-subtle" />
            </tr>
          </thead>

          {/* Body */}
          <tbody className="relative">
            <AnimatePresence mode="popLayout">
            {pagedData.length === 0 ? (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="empty"
              >
                <td colSpan={visibleColumns.length + (selectable ? 2 : 1)} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-8 h-8 text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <span className="text-sm text-secondary">{emptyMessage}</span>
                  </div>
                </td>
              </motion.tr>
            ) : (
              pagedData.map((row, i) => {
                const rowId = row.id ?? row._id ?? i
                return (
                  <motion.tr
                    layout="position"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.15, delay: i * 0.03, ease: "easeOut" }}
                    key={rowId}
                    onClick={() => onRowClick?.(row)}
                    className={`group border-b border-subtle last:border-0 transition-colors duration-200 ${selected.has(rowId) ? 'bg-brand-50 dark:bg-brand-950/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      } ${onRowClick ? 'cursor-pointer' : ''}`}
                  >
                    {selectable && (
                      <td className="px-3 py-2.5">
                        <input
                          type="checkbox"
                          checked={selected.has(rowId)}
                          onChange={() => toggleSelect(rowId)}
                          onClick={e => e.stopPropagation()}
                          className="w-3.5 h-3.5 rounded border-border-strong text-[var(--color-brand-500)] focus:ring-[var(--color-brand-500)]"
                        />
                      </td>
                    )}
                    {visibleColumns.map(col => (
                      <td
                        key={col.key}
                        className="px-3 py-2.5 text-sm text-primary whitespace-nowrap"
                        style={{ textAlign: col.align || 'left' }}
                      >
                        {col.render ? col.render(row[col.key], row) : formatCell(row[col.key])}
                      </td>
                    ))}
                    <td className="px-3 py-2.5 text-right">
                      <button className="text-tertiary hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </td>
                  </motion.tr>
                )
              })
            )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-subtle bg-surface-secondary text-xs text-secondary">
          <span>
            {filteredData.length > 0
              ? `${page * pageSize + 1}–${Math.min((page + 1) * pageSize, filteredData.length)} of ${filteredData.length}`
              : '0 results'}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className={`px-2 py-1 rounded transition-colors ${page === 0 ? 'text-tertiary cursor-not-allowed' : 'text-secondary hover:text-primary hover:bg-surface-hover'}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let pageNum
              if (totalPages <= 7) {
                pageNum = i
              } else if (page < 3) {
                pageNum = i
              } else if (page > totalPages - 4) {
                pageNum = totalPages - 7 + i
              } else {
                pageNum = page - 3 + i
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-7 h-7 rounded text-xs font-medium transition-colors ${pageNum === page ? 'bg-[var(--color-brand-500)] text-white' : 'text-secondary hover:text-primary hover:bg-surface-hover'}`}
                >
                  {pageNum + 1}
                </button>
              )
            })}
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className={`px-2 py-1 rounded transition-colors ${page >= totalPages - 1 ? 'text-tertiary cursor-not-allowed' : 'text-secondary hover:text-primary hover:bg-surface-hover'}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function formatCell(value) {
  if (value == null) return <span className="text-tertiary">—</span>
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  return value
}

export function StatusBadge({ status, variant }) {
  const colors = variant || {
    Active: ['bg-[var(--color-success-50)]', 'text-[var(--color-success-700)]', 'bg-[var(--color-success-500)]'],
    Inactive: ['bg-[var(--color-error-50)]', 'text-[var(--color-error-700)]', 'bg-[var(--color-error-500)]'],
    Pending: ['bg-[var(--color-warning-50)]', 'text-[var(--color-warning-700)]', 'bg-[var(--color-warning-500)]'],
    Open: ['bg-[var(--color-info-50)]', 'text-[var(--color-info-700)]', 'bg-[var(--color-info-500)]'],
    Closed: ['bg-[var(--color-neutral-100)]', 'text-[var(--color-neutral-600)]', 'bg-[var(--color-neutral-400)]'],
    Approved: ['bg-[var(--color-success-50)]', 'text-[var(--color-success-700)]', 'bg-[var(--color-success-500)]'],
    Rejected: ['bg-[var(--color-error-50)]', 'text-[var(--color-error-700)]', 'bg-[var(--color-error-500)]'],
    On_Track: ['bg-[var(--color-success-50)]', 'text-[var(--color-success-700)]', 'bg-[var(--color-success-500)]'],
    Delayed: ['bg-[var(--color-warning-50)]', 'text-[var(--color-warning-700)]', 'bg-[var(--color-warning-500)]'],
    Blocked: ['bg-[var(--color-error-50)]', 'text-[var(--color-error-700)]', 'bg-[var(--color-error-500)]'],
  }
  const key = status?.replace(/\s+/g, '_')
  const [bg, text, dot] = colors[key] || colors.Pending

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${bg} ${text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  )
}
