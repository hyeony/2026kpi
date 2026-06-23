import { useState } from 'react'
import type { Project } from '../types'
import { ChevronIcon, EditIcon, FolderIcon, PlusIcon, TrashIcon } from './Icons'

interface Props {
  projects: Project[]
  activeProjectId: string | null
  onSelect: (id: string) => void
  onCreate: (name: string) => void
  onDelete: (id: string) => void
  onRename: (id: string, name: string) => void
}

export function ProjectSelector({
  projects,
  activeProjectId,
  onSelect,
  onCreate,
  onDelete,
  onRename,
}: Props) {
  const [open, setOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

  const active = projects.find((p) => p.id === activeProjectId)

  const handleCreate = () => {
    if (!newName.trim()) return
    onCreate(newName)
    setNewName('')
    setOpen(false)
  }

  const startEdit = (project: Project) => {
    setEditingId(project.id)
    setEditName(project.name)
  }

  const commitEdit = () => {
    if (editingId && editName.trim()) {
      onRename(editingId, editName)
    }
    setEditingId(null)
    setEditName('')
  }

  return (
    <div className="project-selector">
      <button
        type="button"
        className={`project-trigger${open ? ' is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="project-trigger__icon">
          <FolderIcon size={18} />
        </span>
        <span className="project-trigger__text">
          <span className="project-trigger__label">프로젝트</span>
          <span className="project-trigger__name">{active?.name ?? '프로젝트를 선택하세요'}</span>
        </span>
        <ChevronIcon className={`project-trigger__chevron${open ? ' is-flipped' : ''}`} />
      </button>

      {open && (
        <>
          <div className="project-backdrop" onClick={() => setOpen(false)} />
          <div className="project-panel">
            {projects.length === 0 ? (
              <p className="project-empty">아직 프로젝트가 없어요</p>
            ) : (
              <ul className="project-list">
                {projects.map((project) => (
                  <li key={project.id} className="project-item">
                    {editingId === project.id ? (
                      <div className="inline-edit">
                        <input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && commitEdit()}
                          autoFocus
                        />
                        <button type="button" className="btn btn--sm btn--cta" onClick={commitEdit}>
                          저장
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          type="button"
                          className={`project-item__select${project.id === activeProjectId ? ' is-active' : ''}`}
                          onClick={() => {
                            onSelect(project.id)
                            setOpen(false)
                          }}
                        >
                          <span className="project-item__name">{project.name}</span>
                          <span className="project-item__count">{project.members.length}명</span>
                        </button>
                        <div className="project-item__actions">
                          <button type="button" className="icon-btn" onClick={() => startEdit(project)} title="이름 변경">
                            <EditIcon size={15} />
                          </button>
                          <button
                            type="button"
                            className="icon-btn icon-btn--danger"
                            onClick={() => {
                              if (confirm(`"${project.name}" 프로젝트를 삭제할까요?`)) {
                                onDelete(project.id)
                              }
                            }}
                            title="삭제"
                          >
                            <TrashIcon size={15} />
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <div className="project-create">
              <input
                placeholder="새 프로젝트 이름"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              />
              <button type="button" className="btn btn--cta" onClick={handleCreate}>
                <PlusIcon size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
