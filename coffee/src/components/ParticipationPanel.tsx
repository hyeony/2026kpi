import type { Member } from '../types';

interface Props {
  members: Member[];
  participatingIds: string[];
  todayDate: string;
  onToggle: (memberId: string) => void;
  onSelectAll: () => void;
  onClear: () => void;
}

export function ParticipationPanel({
  members,
  participatingIds,
  todayDate,
  onToggle,
  onSelectAll,
  onClear,
}: Props) {
  const participatingSet = new Set(participatingIds);

  return (
    <section className="card">
      <div className="card-header">
        <div>
          <h2>오늘 주문 참여</h2>
          <p className="card-subtitle">{todayDate}</p>
        </div>
        <div className="header-actions">
          <button type="button" className="btn btn-ghost btn-sm" onClick={onSelectAll}>
            전체 선택
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={onClear}>
            초기화
          </button>
        </div>
      </div>

      {members.length === 0 ? (
        <p className="empty-hint">먼저 멤버를 추가하세요.</p>
      ) : (
        <ul className="participation-list">
          {members.map((member) => {
            const checked = participatingSet.has(member.id);
            const hasDrinks = member.preferredDrinks.length > 0;
            return (
              <li key={member.id}>
                <label className={`participation-item ${checked ? 'checked' : ''}`}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(member.id)}
                  />
                  <div className="participation-info">
                    <span className="member-name">{member.name}</span>
                    <span className="member-drinks">
                      {hasDrinks
                        ? member.preferredDrinks.join(' · ')
                        : '음료 미설정'}
                    </span>
                  </div>
                  {checked && <span className="check-badge">참여</span>}
                </label>
              </li>
            );
          })}
        </ul>
      )}

      <p className="participation-summary">
        {participatingIds.length} / {members.length}명 참여
      </p>
    </section>
  );
}
