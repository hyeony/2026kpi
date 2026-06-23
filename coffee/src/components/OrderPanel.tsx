import { useState } from 'react';
import type { DrinkCount, OrderItem } from '../lib/order';
import { formatOrderText } from '../lib/order';

interface Props {
  projectName: string;
  todayDate: string;
  orderItems: OrderItem[];
  aggregated: DrinkCount[];
}

export function OrderPanel({
  projectName,
  todayDate,
  orderItems,
  aggregated,
}: Props) {
  const [copied, setCopied] = useState(false);
  const orderText = formatOrderText(projectName, orderItems, aggregated, todayDate);
  const totalCups = aggregated.reduce((sum, d) => sum + d.count, 0);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = orderText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="card order-card">
      <div className="card-header">
        <div>
          <h2>주문 리스트</h2>
          <p className="card-subtitle">참여 멤버 기준 자동 생성</p>
        </div>
        <button
          type="button"
          className={`btn btn-primary btn-sm ${copied ? 'success' : ''}`}
          onClick={handleCopy}
          disabled={orderItems.length === 0}
        >
          {copied ? '복사됨 ✓' : '문구 복사'}
        </button>
      </div>

      {orderItems.length === 0 ? (
        <p className="empty-hint">
          오늘 참여한 멤버가 없거나 선호 음료가 없습니다.
        </p>
      ) : (
        <>
          <div className="order-section">
            <h3>멤버별</h3>
            <ul className="order-by-member">
              {orderItems.map(({ member, drinks }) => (
                <li key={member.id}>
                  <span className="order-member">{member.name}</span>
                  <span className="order-drinks">{drinks.join(', ')}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-section">
            <h3>음료별 집계</h3>
            <ul className="order-aggregate">
              {aggregated.map(({ drink, count }) => (
                <li key={drink}>
                  <span>{drink}</span>
                  <span className="count-badge">×{count}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="order-total">총 {totalCups}잔</p>

          <pre className="order-preview" aria-label="복사될 주문 문구">
            {orderText}
          </pre>
        </>
      )}
    </section>
  );
}
