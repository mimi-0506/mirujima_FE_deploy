import React from 'react';

interface TaskListProps {
  title: string;
  tasks: string[];
}

export default function TaskList({ title, tasks }: TaskListProps) {
  return (
    <div className="min-h-[214px] flex-1">
      <p className="mb-2 text-[15px] font-medium leading-[20px] text-gray500">{title}</p>

      <ul className="mt-2 space-y-2 text-gray350">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={index} className="py-3 text-[14px] font-medium leading-[16px]">
              {task}
            </li>
          ))
        ) : (
          <li className="py-3 text-[14px] font-medium leading-[16px]">등록된 목표가 없어요</li>
        )}
      </ul>
    </div>
  );
}
