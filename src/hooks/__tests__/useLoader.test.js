import { renderHook, act } from '@testing-library/react'
import  useLoader  from '../useLoader'

describe("useLoader", () => {

    it('should provide the isLoading state', () => {
        const { result } = renderHook(useLoader);
        expect(result.current.isLoading).toBe(false);  
    })
    test("should update the isLoading upon showLoader action", () => {
        const { result } = renderHook(useLoader);
        act(() => result.current.showLoader());
        expect(result.current.isLoading).toBe(true);
    });
    test("should update the isLoading upon hideLoader action", () => {
        const { result } = renderHook(useLoader);
        act(() => result.current.showLoader());
        expect(result.current.isLoading).toBe(true);
        act(() => result.current.hideLoader());
        expect(result.current.isLoading).toBe(false);
    });
});