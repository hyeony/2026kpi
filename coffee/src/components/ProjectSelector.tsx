import { useState } from 'react';
import type { Project } from '../types';

interface Props {
  projects: Project[];
  activeProjectId: string | null;
  onSelect: (id: string) => void;
  onAdd: (name: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, name: string) => void;
}

export function ProjectSelector({
  projects,
  activeProjectId,
  onSelect,
  onAdd,
  onDelete,
  onRename,
}: Props) {
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleAdd = () => {
    if (!newName.trim()) return;
    onAdd(newName);
    setNewName('');
    setShowAdd(false);
  };

  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setEditName(project.name);
  };

  const saveEdit = () => {
    if (editingId && editName.trim()) {
      onRename(editingId, editName);
    }
    setEditingId(null);
  };

  return (
    <section className="card project-card">
      <div className="card-header">
        <h2>프로젝트</h2>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => setShowAdd((v) => !v)}
        >
          {showAdd ? '취소' : '+ 새 프로젝트'}
        </button>
      </div>

      {showAdd && (
        <div className="inline-form">
          <input
            type="text"
            placeholder="프로젝트 이름"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            autoFocus
          />
          <button type="button" className="btn btn-primary btn-sm" onClick={handleAdd}>
            추가
          </button>
        </div>
      )}

      {projects.length === 0 ? (
        <p className="empty-hint">프로젝트를 추가해 멤버를 관리하세요.</p>
      ) : (
        <ul className="project-list">
          {projects.map((project) => (
            <li
              key={project.id}
              className={`project-item ${project.id === activeProjectId ? 'active' : ''}`}
            >
              {editingId === project.id ? (
                <div className="inline-form">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                    autoFocus
                  />
                  <button type="button" className="btn btn-primary btn-sm" onClick={saveEdit}>
                    저장
                  </button>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    className="project-select"
                    onClick={() => onSelect(project.id)}
                  >
                    <span className="project-name">{project.name}</span>
                    <span className="project-meta">{project.members.length}명</span>
                  </button>
                  <div className="project-actions">
                    <button
                      type="button"
                      className="btn btn-ghost btn-icon"
                      aria-label="이름 수정"
                      onClick={() => startEdit(project)}
                    >
                      ✎
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost btn-icon danger"
                      aria-label="삭제"
                      onClick={() => {
                        if (confirm(`"${project.name}" 프로젝트를 삭제할까요?`)) {
                          onDelete(project.id);
                        }
                      }}
                    >
                      ×
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
