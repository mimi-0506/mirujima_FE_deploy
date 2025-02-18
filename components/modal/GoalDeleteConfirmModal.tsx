'use client';

import React from 'react';

interface GoalDeleteConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function GoalDeleteConfirmModal({
  onConfirm,
  onCancel
}: GoalDeleteConfirmModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50"
      onClick={onCancel}
    >
      <div className="rounded bg-white p-6" onClick={(e) => e.stopPropagation()}>
        <p className="mb-4">정말 삭제하시겠습니까?</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onCancel} className="rounded bg-gray-300 px-4 py-2">
            취소
          </button>
          <button onClick={onConfirm} className="rounded bg-main px-4 py-2 text-white">
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
