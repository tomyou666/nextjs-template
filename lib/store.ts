// Zustandを使用してグローバルな状態管理を実装
import { create } from 'zustand'

// ストアの型定義
type State = {
  // ローディング状態を管理
  isLoading: boolean
  // ローディング状態を更新する関数
  setIsLoading: (loading: boolean) => void
}

// Zustandストアの作成
export const useUrlStore = create<State>((set) => ({
  // ローディングの初期値はfalse
  isLoading: false,
  // ローディング状態を更新するアクション
  setIsLoading: (loading) => set({ isLoading: loading })
}))
