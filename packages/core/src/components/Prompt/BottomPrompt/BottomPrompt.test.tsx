import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BottomPrompt } from './index';
import { PromptListItem } from './BottomPrompt.types';

// 스타일 주입은 테스트 대상 밖 → no-op으로 처리
vi.mock('@hnineds/core', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@hnineds/core')>();
    return { ...actual, useComponentStyle: vi.fn() };
});

// ── 픽스처 ────────────────────────────────────────────────────────────────────

const HISTORY: PromptListItem[] = [
    { id: 'h1', content: '첫 번째 히스토리' },
    { id: 'h2', content: '두 번째 히스토리' },
];

const BOOKMARKS: PromptListItem[] = [
    { id: 'b1', content: '첫 번째 북마크' },
    { id: 'b2', content: '두 번째 북마크' },
];

// ── 테스트 ───────────────────────────────────────────────────────────────────

describe('BottomPrompt', () => {
    beforeEach(() => vi.clearAllMocks());

    // ── 렌더링 ─────────────────────────────────────────────────────────────

    describe('렌더링', () => {
        it('textarea, 전송 버튼, 파일 첨부 버튼, 북마크 버튼이 렌더링된다', () => {
            render(<BottomPrompt />);

            expect(screen.getByRole('textbox')).toBeInTheDocument();
            expect(screen.getByTitle('전송')).toBeInTheDocument();
            expect(screen.getByTitle('파일 첨부')).toBeInTheDocument();
            expect(screen.getByTitle('북마크')).toBeInTheDocument();
        });

        it('placeholder prop이 적용된다', () => {
            render(<BottomPrompt placeholder="검색어를 입력하세요" />);
            expect(screen.getByPlaceholderText('검색어를 입력하세요')).toBeInTheDocument();
        });

        it('placeholder 기본값이 적용된다', () => {
            render(<BottomPrompt />);
            expect(screen.getByPlaceholderText('질문을 입력하세요...')).toBeInTheDocument();
        });
    });

    // ── 텍스트 입력 ────────────────────────────────────────────────────────

    describe('텍스트 입력', () => {
        it('textarea 입력 시 onChange가 호출된다', async () => {
            const onChange = vi.fn();
            render(<BottomPrompt value="" onChange={onChange} />);

            await userEvent.type(screen.getByRole('textbox'), 'hello');

            // controlled component: 키 입력마다 단일 문자로 호출됨
            expect(onChange).toHaveBeenCalledTimes(5);
            expect(onChange.mock.calls.map((c) => c[0])).toEqual(['h', 'e', 'l', 'l', 'o']);
        });
    });

    // ── 전송 ───────────────────────────────────────────────────────────────

    describe('전송', () => {
        it('value가 비어있으면 전송 버튼이 비활성화된다', () => {
            render(<BottomPrompt value="" />);
            expect(screen.getByTitle('전송')).toBeDisabled();
        });

        it('value가 공백만 있으면 전송 버튼이 비활성화된다', () => {
            render(<BottomPrompt value="   " />);
            expect(screen.getByTitle('전송')).toBeDisabled();
        });

        it('value가 있으면 전송 버튼이 활성화된다', () => {
            render(<BottomPrompt value="안녕하세요" />);
            expect(screen.getByTitle('전송')).not.toBeDisabled();
        });

        it('전송 버튼 클릭 시 onSend가 value와 함께 호출된다', async () => {
            const onSend = vi.fn();
            render(<BottomPrompt value="테스트 메시지" onSend={onSend} />);

            await userEvent.click(screen.getByTitle('전송'));

            expect(onSend).toHaveBeenCalledOnce();
            expect(onSend).toHaveBeenCalledWith('테스트 메시지');
        });

        it('Enter 키로 전송 시 onSend가 호출된다', () => {
            const onSend = vi.fn();
            render(<BottomPrompt value="엔터 전송" onSend={onSend} />);

            fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

            expect(onSend).toHaveBeenCalledOnce();
            expect(onSend).toHaveBeenCalledWith('엔터 전송');
        });

        it('Shift+Enter는 onSend를 호출하지 않는다', () => {
            const onSend = vi.fn();
            render(<BottomPrompt value="줄바꿈" onSend={onSend} />);

            fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter', shiftKey: true });

            expect(onSend).not.toHaveBeenCalled();
        });

        it('IME 조합 중(isComposing)에는 Enter를 눌러도 onSend가 호출되지 않는다', () => {
            const onSend = vi.fn();
            render(<BottomPrompt value="한글" onSend={onSend} />);

            // JSDOM의 KeyboardEvent는 isComposing을 직접 지원
            fireEvent.keyDown(screen.getByRole('textbox'), {
                key: 'Enter',
                isComposing: true,
            });

            expect(onSend).not.toHaveBeenCalled();
        });

        it('value가 빈 문자열이면 Enter를 눌러도 onSend가 호출되지 않는다', () => {
            const onSend = vi.fn();
            render(<BottomPrompt value="" onSend={onSend} />);

            fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

            expect(onSend).not.toHaveBeenCalled();
        });
    });

    // ── responding 상태 ────────────────────────────────────────────────────

    describe('responding 상태', () => {
        it('textarea가 비활성화된다', () => {
            render(<BottomPrompt status="responding" />);
            expect(screen.getByRole('textbox')).toBeDisabled();
        });

        it('Enter를 눌러도 onSend가 호출되지 않는다', () => {
            const onSend = vi.fn();
            render(<BottomPrompt value="메시지" status="responding" onSend={onSend} />);

            fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

            expect(onSend).not.toHaveBeenCalled();
        });

        it('전송 버튼을 클릭해도 onSend가 호출되지 않는다', async () => {
            const onSend = vi.fn();
            render(<BottomPrompt value="메시지" status="responding" onSend={onSend} />);

            // 버튼이 disabled가 아닐 수 있으므로 클릭 시도
            const btn = screen.getByTitle('전송');
            if (!btn.hasAttribute('disabled')) {
                await userEvent.click(btn);
            }

            expect(onSend).not.toHaveBeenCalled();
        });
    });

    // ── 파일 첨부 컨텍스트 메뉴 ────────────────────────────────────────────

    describe('파일 첨부 컨텍스트 메뉴', () => {
        it('+ 버튼 클릭 시 메뉴가 열린다', async () => {
            render(<BottomPrompt />);

            await userEvent.click(screen.getByTitle('파일 첨부'));

            expect(screen.getByText('파일 업로드')).toBeInTheDocument();
            expect(screen.getByText('이미지 업로드')).toBeInTheDocument();
        });

        it('+ 버튼 재클릭 시 메뉴가 닫힌다', async () => {
            render(<BottomPrompt />);

            await userEvent.click(screen.getByTitle('파일 첨부'));
            await userEvent.click(screen.getByTitle('파일 첨부'));

            expect(screen.queryByText('파일 업로드')).not.toBeInTheDocument();
        });

        it('메뉴 외부(textarea) 클릭 시 메뉴가 닫힌다', async () => {
            render(<BottomPrompt />);

            await userEvent.click(screen.getByTitle('파일 첨부'));
            expect(screen.getByText('파일 업로드')).toBeInTheDocument();

            fireEvent.mouseDown(screen.getByRole('textbox'));

            expect(screen.queryByText('파일 업로드')).not.toBeInTheDocument();
        });

        it('"파일 업로드" 클릭 시 메뉴가 닫힌다', async () => {
            render(<BottomPrompt />);

            await userEvent.click(screen.getByTitle('파일 첨부'));
            await userEvent.click(screen.getByText('파일 업로드'));

            expect(screen.queryByText('파일 업로드')).not.toBeInTheDocument();
        });

        it('"이미지 업로드" 클릭 시 메뉴가 닫힌다', async () => {
            render(<BottomPrompt />);

            await userEvent.click(screen.getByTitle('파일 첨부'));
            await userEvent.click(screen.getByText('이미지 업로드'));

            expect(screen.queryByText('이미지 업로드')).not.toBeInTheDocument();
        });

        it('파일 input의 accept 속성이 문서 형식으로 설정된다', () => {
            render(<BottomPrompt />);

            const inputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
            const fileInput = Array.from(inputs).find((i) => i.accept.includes('.pdf'));

            expect(fileInput).toBeDefined();
            expect(fileInput!.accept).toContain('.pdf');
            expect(fileInput!.accept).toContain('.doc');
        });

        it('이미지 input의 accept 속성이 이미지 형식으로 설정된다', () => {
            render(<BottomPrompt />);

            const inputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
            const imageInput = Array.from(inputs).find((i) => i.accept === 'image/*');

            expect(imageInput).toBeDefined();
        });
    });

    // ── 북마크 ─────────────────────────────────────────────────────────────

    describe('북마크', () => {
        it('isBookmarkOpen=false이면 북마크 버튼에 selected 클래스가 없다', () => {
            render(<BottomPrompt isBookmarkOpen={false} />);
            expect(screen.getByTitle('북마크')).not.toHaveClass('selected');
        });

        it('isBookmarkOpen=true이면 북마크 버튼에 selected 클래스가 있다', () => {
            render(<BottomPrompt isBookmarkOpen={true} onBookmarkToggle={vi.fn()} />);
            expect(screen.getByTitle('북마크')).toHaveClass('selected');
        });

        it('북마크 버튼 클릭 시 onBookmarkToggle(!isBookmarkOpen)이 호출된다', async () => {
            const onBookmarkToggle = vi.fn();

            render(<BottomPrompt isBookmarkOpen={false} onBookmarkToggle={onBookmarkToggle} />);
            await userEvent.click(screen.getByTitle('북마크'));
            expect(onBookmarkToggle).toHaveBeenCalledWith(true);

            onBookmarkToggle.mockClear();

            render(<BottomPrompt isBookmarkOpen={true} onBookmarkToggle={onBookmarkToggle} />);
            const bookmarkBtns = screen.getAllByTitle('북마크');
            await userEvent.click(bookmarkBtns[bookmarkBtns.length - 1]);
            expect(onBookmarkToggle).toHaveBeenCalledWith(false);
        });
    });

    // ── 히스토리 / 북마크 리스트 ───────────────────────────────────────────

    describe('히스토리 / 북마크 리스트', () => {
        it('isHistoryOpen=true이면 히스토리 아이템이 렌더링된다', () => {
            render(
                <BottomPrompt
                    isHistoryOpen
                    historyList={HISTORY}
                    onHistoryToggle={vi.fn()}
                />
            );

            expect(screen.getByText('첫 번째 히스토리')).toBeInTheDocument();
            expect(screen.getByText('두 번째 히스토리')).toBeInTheDocument();
        });

        it('isBookmarkOpen=true이면 북마크 아이템이 렌더링된다', () => {
            render(
                <BottomPrompt
                    isBookmarkOpen
                    bookmarkList={BOOKMARKS}
                    onBookmarkToggle={vi.fn()}
                />
            );

            expect(screen.getByText('첫 번째 북마크')).toBeInTheDocument();
            expect(screen.getByText('두 번째 북마크')).toBeInTheDocument();
        });

        it('isHistoryOpen=false이면 히스토리 아이템이 렌더링되지 않는다', () => {
            render(<BottomPrompt isHistoryOpen={false} historyList={HISTORY} />);

            expect(screen.queryByText('첫 번째 히스토리')).not.toBeInTheDocument();
        });

        it('히스토리 아이템 클릭 시 onChange가 해당 content로 호출된다', async () => {
            const onChange = vi.fn();
            render(
                <BottomPrompt
                    isHistoryOpen
                    historyList={HISTORY}
                    onChange={onChange}
                    onHistoryToggle={vi.fn()}
                />
            );

            await userEvent.click(screen.getByText('첫 번째 히스토리'));

            expect(onChange).toHaveBeenCalledWith('첫 번째 히스토리');
        });

        it('히스토리 아이템 클릭 시 onHistoryToggle(false)가 호출된다', async () => {
            const onHistoryToggle = vi.fn();
            render(
                <BottomPrompt
                    isHistoryOpen
                    historyList={HISTORY}
                    onHistoryToggle={onHistoryToggle}
                />
            );

            await userEvent.click(screen.getByText('첫 번째 히스토리'));

            expect(onHistoryToggle).toHaveBeenCalledWith(false);
        });

        it('리스트 외부(textarea) 클릭 시 onHistoryToggle(false)가 호출된다', () => {
            const onHistoryToggle = vi.fn();
            render(
                <BottomPrompt
                    isHistoryOpen
                    historyList={HISTORY}
                    onHistoryToggle={onHistoryToggle}
                />
            );

            fireEvent.mouseDown(screen.getByRole('textbox'));

            expect(onHistoryToggle).toHaveBeenCalledWith(false);
        });

        it('리스트 외부 클릭 시 onBookmarkToggle(false)도 함께 호출된다', () => {
            const onHistoryToggle = vi.fn();
            const onBookmarkToggle = vi.fn();
            render(
                <BottomPrompt
                    isHistoryOpen
                    historyList={HISTORY}
                    onHistoryToggle={onHistoryToggle}
                    onBookmarkToggle={onBookmarkToggle}
                />
            );

            fireEvent.mouseDown(screen.getByRole('textbox'));

            expect(onHistoryToggle).toHaveBeenCalledWith(false);
            expect(onBookmarkToggle).toHaveBeenCalledWith(false);
        });

        it('히스토리가 열린 상태에서 + 버튼을 클릭하면 히스토리가 닫힌다', async () => {
            const onHistoryToggle = vi.fn();
            render(
                <BottomPrompt
                    isHistoryOpen
                    historyList={HISTORY}
                    onHistoryToggle={onHistoryToggle}
                />
            );

            // + 버튼은 menuRef 안에 있으므로 menuRef 외부가 아님
            // 대신 textarea를 클릭해서 listRef 외부 클릭을 시뮬레이션
            fireEvent.mouseDown(screen.getByTitle('파일 첨부'));

            expect(onHistoryToggle).toHaveBeenCalledWith(false);
        });
    });

    // ── 커스텀 아이콘 ──────────────────────────────────────────────────────

    describe('커스텀 아이콘', () => {
        it('icons.plus가 제공되면 커스텀 아이콘이 렌더링된다', () => {
            render(
                <BottomPrompt icons={{ plus: <span data-testid="custom-plus">📎</span> }} />
            );
            expect(screen.getByTestId('custom-plus')).toBeInTheDocument();
        });

        it('icons.send가 제공되면 커스텀 전송 아이콘이 렌더링된다', () => {
            render(
                <BottomPrompt
                    value="텍스트"
                    icons={{ send: <span data-testid="custom-send">🚀</span> }}
                />
            );
            expect(screen.getByTestId('custom-send')).toBeInTheDocument();
        });

        it('icons.loading이 제공되면 responding 상태에서 커스텀 아이콘이 렌더링된다', () => {
            render(
                <BottomPrompt
                    status="responding"
                    icons={{ loading: <span data-testid="custom-loading">⏳</span> }}
                />
            );
            expect(screen.getByTestId('custom-loading')).toBeInTheDocument();
        });

        it('icons.starFilled가 제공되면 북마크 활성 상태에서 커스텀 아이콘이 렌더링된다', () => {
            render(
                <BottomPrompt
                    isBookmarkOpen
                    onBookmarkToggle={vi.fn()}
                    icons={{ starFilled: <span data-testid="custom-star-filled">★</span> }}
                />
            );
            expect(screen.getByTestId('custom-star-filled')).toBeInTheDocument();
        });

        it('icons.starOutlined가 제공되면 북마크 비활성 상태에서 커스텀 아이콘이 렌더링된다', () => {
            render(
                <BottomPrompt
                    isBookmarkOpen={false}
                    icons={{ starOutlined: <span data-testid="custom-star-outlined">☆</span> }}
                />
            );
            expect(screen.getByTestId('custom-star-outlined')).toBeInTheDocument();
        });

        it('icons.fileText가 제공되면 메뉴의 파일 아이콘에 커스텀 아이콘이 렌더링된다', async () => {
            render(
                <BottomPrompt icons={{ fileText: <span data-testid="custom-file">📄</span> }} />
            );

            await userEvent.click(screen.getByTitle('파일 첨부'));

            expect(screen.getByTestId('custom-file')).toBeInTheDocument();
        });

        it('icons.picture가 제공되면 메뉴의 이미지 아이콘에 커스텀 아이콘이 렌더링된다', async () => {
            render(
                <BottomPrompt icons={{ picture: <span data-testid="custom-picture">🖼️</span> }} />
            );

            await userEvent.click(screen.getByTitle('파일 첨부'));

            expect(screen.getByTestId('custom-picture')).toBeInTheDocument();
        });
    });
});
