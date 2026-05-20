/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppProvider } from "./AppContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import ToastContainer from "./components/ToastContainer";

export default function App() {
  return (
    <AppProvider>
      <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans">
        <ToastContainer />
        <Header />
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6">
          <Sidebar />
          <MainContent />
        </main>
        <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-400">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-medium text-slate-500">
              © 2026 경기도 스마트 공간 통계 분석 시스템
            </span>
            <span className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              실시간 인메모리 프로세싱 모드
            </span>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}
