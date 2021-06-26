import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { UserInfo } from '../components/UserInfo'

import '../styles/room.scss'

interface FirebaseQuestions {
  [x: string]: {
    content: string;
    author: {
      name: string;
      avatar: string;
    },
    isHighlighted: boolean;
    isAnswered: boolean;
  }
}

interface RoomParams {
  id: string;
}

interface QuestionState {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  },
  isHighlighted: boolean;
  isAnswered: boolean;
}

export function Room() {
  const { id } = useParams<RoomParams>()
  const { user } = useAuth();

  const [newQuestion, setNewQuestion] = useState('')
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    const roomRef = database.ref(`rooms/${id}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered
        }
      }).reverse();

      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions);
    })
  }, [id])

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

        {questions.length > 0 ? (
          <div>questions</div>
        ) : (
          <div>not questions</div>
        )}
      </main>
    </div>
  )
}