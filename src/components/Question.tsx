import { ReactNode } from 'react'

import { UserInfo } from './UserInfo'

import '../styles/question.scss'

interface QuestionProps {
  content: string;
  author: {
    name: string;
    avatar: string;
  },
  children: ReactNode
}

export function Question({ content, author, children }: QuestionProps) {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <UserInfo avatar={author.avatar} name={author.name} />

        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}