import { useParams } from 'react-router-dom'

import { useRoom } from '../hooks/useRoom'

import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/Question'

import '../styles/room.scss'

interface RoomParams {
  id: string;
}

export function AdminRoom() {
  const { id } = useParams<RoomParams>()
  const { questions, title } = useRoom(id);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Let me ask" />

          <div>
            <RoomCode code={id} />
            <Button isOutlined>Encerrar</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>

          {questions.length > 0 && (<span>{questions.length} pergunta(s)</span>)}
        </div>

        <div className="question-list">
          {questions.length > 0 ? (
            questions.map((question) => (
              <Question key={question.id} author={question.author} content={question.content} />
            ))
          ) : (
            <div>not questions</div>
          )}
        </div>
      </main>
    </div>
  )
}