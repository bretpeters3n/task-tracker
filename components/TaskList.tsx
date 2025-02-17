'use client'

import { Task, Tag, Group } from '@prisma/client'
import { useState } from 'react'
import TaskCard from './TaskCard'

type TaskWithRelations = Task & {
  tags: Tag[]
  group: Group | null
}

interface TaskListProps {
  initialTasks: TaskWithRelations[]
}

export default function TaskList({ initialTasks }: TaskListProps) {
  const [tasks, setTasks] = useState(initialTasks)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onUpdate={(updatedTask) => {
          setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t))
        }} />
      ))}
    </div>
  )
}
