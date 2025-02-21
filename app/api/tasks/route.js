import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request) {
  try {
    const body = await request.json()
    const { title, description, timeEstimate, tags, groupName } = body

    // Create or find the group if provided
    let group = undefined
    if (groupName) {
      group = {
        connectOrCreate: {
          where: { name: groupName },
          create: { name: groupName }
        }
      }
    }

    // Create the task with tags and group
    const task = await prisma.task.create({
      data: {
        title,
        description,
        timeEstimate,
        tags: {
          connectOrCreate: tags.map(tagName => ({
            where: { name: tagName },
            create: { name: tagName }
          }))
        },
        group
      },
      include: {
        tags: true,
        group: true
      }
    })

    return NextResponse.json(task)
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      { error: 'Error creating task' },
      { status: 500 }
    )
  }
}
