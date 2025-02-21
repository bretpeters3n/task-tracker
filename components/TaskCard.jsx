'use client'

import { useState } from 'react'
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

export default function TaskCard({ task, onUpdate }) {
  const [isLoading, setIsLoading] = useState(false)

  const toggleComplete = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !task.completed,
        }),
      })
      const updatedTask = await response.json()
      onUpdate(updatedTask)
    } catch (error) {
      console.error('Error updating task:', error)
    }
    setIsLoading(false)
  }

  return (
    <div className={clsx(
      'p-6 rounded-lg shadow-sm border',
      task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-100'
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className={clsx(
            'text-lg font-semibold',
            task.completed ? 'text-gray-600 line-through' : 'text-gray-900'
          )}>
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-1 text-gray-700">{task.description}</p>
          )}
        </div>
        <button
          onClick={toggleComplete}
          disabled={isLoading}
          className="ml-4 text-gray-400 hover:text-gray-500"
        >
          <CheckCircleIcon
            className={clsx(
              'h-6 w-6',
              task.completed && 'text-green-500 fill-current'
            )}
          />
        </button>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {task.tags.map((tag) => (
          <span
            key={tag.id}
            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
          >
            {tag.name}
          </span>
        ))}
      </div>
      
      {task.timeEstimate && (
        <div className="mt-4 flex items-center text-sm text-gray-700">
          <ClockIcon className="h-4 w-4 mr-1" />
          {Math.floor(task.timeEstimate / 60)}h {task.timeEstimate % 60}m
        </div>
      )}
      
      {task.group && (
        <div className="mt-2 text-sm text-gray-700">
          In group: {task.group.name}
        </div>
      )}
    </div>
  )
}
