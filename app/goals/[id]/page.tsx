'use client';

import React from 'react';

export default function GoalDetailPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center justify-between">
            <h1 className="flex items-center gap-2 text-lg font-semibold">
              <span className="rounded-full bg-black p-2 text-white">▶</span>
              자바스크립트로 웹 서비스 만들기
            </h1>
            <div className="flex gap-2">
              <button className="text-gray-600 hover:text-gray-900">수정하기</button>
              <button className="text-red-500 hover:text-red-700">삭제하기</button>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Progress</p>
            <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
              <div className="h-2 rounded-full bg-blue-500" style={{ width: '50%' }}></div>
            </div>
          </div>
        </div>

        <button className="flex w-full items-center gap-2 rounded-lg bg-blue-100 px-4 py-3 text-blue-700">
          📂 노트 모아보기
        </button>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex justify-between">
              <h2 className="text-lg font-semibold">To do</h2>
              <button className="text-blue-500 hover:text-blue-700">+ 항목 추가</button>
            </div>
            <ul className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700">
                  <input type="checkbox" className="h-4 w-4" />
                  자바스크립트 기초 학습 {i + 1}일 차
                  <span className="ml-auto text-gray-400">ⓘ</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-semibold">Done</h2>
            <ul className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-500 line-through">
                  ✅ 자바스크립트 기초 학습 {i + 6}일 차 완료
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
