import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'

import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { UserInfo } from '../components/UserInfo'
import { Question } from '../components/Question'

import '../styles/room.scss'

interface RoomParams {
  id: string;
}

export function Room() {
  const [newQuestion, setNewQuestion] = useState('')
  
  const { id } = useParams<RoomParams>()
  const { user } = useAuth();
  const { questions, title } = useRoom(id);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if(newQuestion.trim() === '') return;

    if(!user) throw new Error('You must be logged in')

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    }

    await database.ref(`rooms/${id}/questions`).push(question);

    setNewQuestion('')
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Let me ask" />

          <RoomCode code={id} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>

          {questions.length > 0 && (<span>{questions.length} pergunta(s)</span>)}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea 
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <UserInfo avatar={user.avatar} name={user.name} />
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
            )}

            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>

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