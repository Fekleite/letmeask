import { UserInfo } from './UserInfo'

import '../styles/question.scss'

interface QuestionProps {
  content: string;
  author: {
    name: string;
    avatar: string;
  },
}

export function Question({ content, author }: QuestionProps) {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <UserInfo avatar={author.avatar} name={author.name} />

        <div></div>
      </footer>
    </div>
  )
}