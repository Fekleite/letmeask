import { ReactNode } from 'react'
import cx from 'classnames'

import { UserInfo } from './UserInfo'

import '../styles/question.scss'

interface QuestionProps {
  content: string;
  author: {
    name: string;
    avatar: string;
  },
  children: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

export function Question({ content, author, children, isAnswered = false, isHighlighted = false }: QuestionProps) {
  return (
    <div 
      className={cx(
        'question',
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered }
      )}
    >
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