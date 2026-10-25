import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useAsyncAction from './useAsyncAction.js';

describe('useAsyncAction', () => {
  it('menandai selesai saat aksi berhasil', async () => {
    const action = vi.fn().mockResolvedValue();
    const { result } = renderHook(() => useAsyncAction(action));
    let ok;
    await act(async () => { ok = await result.current.run('a'); });
    expect(ok).toBe(true);
    expect(action).toHaveBeenCalledWith('a');
    expect(result.current.done).toBe(true);
  });
  it('menyimpan pesan error saat aksi gagal', async () => {
    const action = vi.fn().mockRejectedValue(new Error('gagal'));
    const { result } = renderHook(() => useAsyncAction(action));
    let ok;
    await act(async () => { ok = await result.current.run(); });
    expect(ok).toBe(false);
    expect(result.current.error).toBe('gagal');
  });
});
