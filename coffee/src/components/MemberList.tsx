import { useState } from 'react';
import type { Member } from '../types';

interface Props {
  members: Member[];
  onAdd: (name: string, drinks: string[]) => void;
  onUpdate: (id: string, name: string, drinks: string[]) => void;
  onDelete: (id: string) => void;
}

function MemberForm({
  initialName = '',
  initialDrinks = ['', ''],
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initialName?: string;
  initialDrinks?: string[];
  submitLabel: string;
  onSubmit: (name: string, drinks: string[]) => void;
  onCancel?: () => void;
}) {
  const [name, setName] = useState(initialName);
  const [drink1, setDrink1] = useState(initialDrinks[0] ?? '');
  const [drink2, setDrink2] = useState(initialDrinks[1] ?? '');

  const handleSubmit = () => {
    if (!name.trim()) return;
    const drinks = [drink1.trim(), drink2.trim()].filter(Boolean);
    onSubmit(name, drinks);
  };

  return (
    <div className="member-form">
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="선호 음료 1"
        value={drink1}
        onChange={(e) => setDrink1(e.target.value)}
      />
      <input
        type="text"
        placeholder="선호 음료 2 (선택)"
        value={drink2}
        onChange={(e) => setDrink2(e.target.value)}
      />
      <div className="form-actions">
        {onCancel && (
          <button type="button" className="btn btn-ghost btn-sm" onClick={onCancel}>
            취소
          </button>
        )}
        <button type="button" className="btn btn-primary btn-sm" onClick={handleSubmit}>
          {submitLabel}
        </button>
      </div>
    </div>
  );
}

export function MemberList({ members, onAdd, onUpdate, onDelete }: Props) {
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <section className="card">
      <div className="card-header">
        <h2>멤버</h2>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => {
            setShowAdd((v) => !v);
            setEditingId(null);
          }}
        >
          {showAdd ? '취소' : '+ 멤버 추가'}
        </button>
      </div>

      {showAdd && (
        <MemberForm
          submitLabel="추가"
          onSubmit={(name, drinks) => {
            onAdd(name, drinks);
            setShowAdd(false);
          }}
          onCancel={() => setShowAdd(false)}
        />
      )}

      {members.length === 0 ? (
        <p className="empty-hint">멤버를 추가하고 선호 음료를 최대 2개까지 설정하세요.</p>
      ) : (
        <ul className="member-list">
          {members.map((member) => (
            <li key={member.id} className="member-item">
              {editingId === member.id ? (
                <MemberForm
                  initialName={member.name}
                  initialDrinks={[
                    member.preferredDrinks[0] ?? '',
                    member.preferredDrinks[1] ?? '',
                  ]}
                  submitLabel="저장"
                  onSubmit={(name, drinks) => {
                    onUpdate(member.id, name, drinks);
                    setEditingId(null);
                  }}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <>
                  <div className="member-info">
                    <span className="member-name">{member.name}</span>
                    <span className="member-drinks">
                      {member.preferredDrinks.length > 0
                        ? member.preferredDrinks.join(' · ')
                        : '음료 미설정'}
                    </span>
                  </div>
                  <div className="member-actions">
                    <button
                      type="button"
                      className="btn btn-ghost btn-icon"
                      aria-label="수정"
                      onClick={() => setEditingId(member.id)}
                    >
                      ✎
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost btn-icon danger"
                      aria-label="삭제"
                      onClick={() => {
                        if (confirm(`"${member.name}" 멤버를 삭제할까요?`)) {
                          onDelete(member.id);
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
