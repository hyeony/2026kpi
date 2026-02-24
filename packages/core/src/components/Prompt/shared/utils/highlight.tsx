import React from 'react';

export const getHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) return <span>{text}</span>;

    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
        <span>
      {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
              <mark key={i} style={{ backgroundColor: 'transparent', color: '#1677ff', fontWeight: 'bold' }}>
                  {part}
              </mark>
          ) : (
              part
          )
      )}
    </span>
    );
};