import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Modal from 'react-modal';

import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase';

import logoImg from '../assets/images/logo.svg'
import closeImg from '../assets/images/close.svg'
import deleteImg from '../assets/images/delete.svg'
import excludeImg from '../assets/images/exclude.svg'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/Question'

import '../styles/room.scss'
import '../styles/room-modal.scss'

interface RoomParams {
  id: string;
}

export function AdminRoom() {
  const [modalRoomIsOpen, setModalRoomIsOpen] = useState(false);
  const [modalQuestionIsOpen, setModalQuestionIsOpen] = useState(false);
  const [questionForExclude, setQuestionForExclude] = useState("");
  
  const { id } = useParams<RoomParams>()
  const { questions, title } = useRoom(id);

  const history = useHistory()

  function openModalRoom() {
    setModalRoomIsOpen(true);
  }

  function closeModalRoom() {
    setModalRoomIsOpen(false);
  }

  function openModalQuestion(questionId: string) {
    setModalQuestionIsOpen(true);
    setQuestionForExclude(questionId)
  }

  function closeModalQuestion() {
    setModalQuestionIsOpen(false);
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${id}`).update({
      endedAt: new Date(),
    })

    setModalRoomIsOpen(false)
    history.push('/')
  } 

  async function handleDeleteQuestion() {
    await database.ref(`rooms/${id}/questions/${questionForExclude}`).remove()

    setModalQuestionIsOpen(false)
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Let me ask" />

          <div>
            <RoomCode code={id} />
            <Button isOutlined onClick={openModalRoom} type="button">Encerrar</Button>
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
              <Question key={question.id} author={question.author} content={question.content}>
                <button 
                  type="button"
                  onClick={() => openModalQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            ))
          ) : (
            <div>not questions</div>
          )}
        </div>
      </main>

      <Modal
        isOpen={modalRoomIsOpen}
        onRequestClose={closeModalRoom}
        className="room-modal"
        overlayClassName="room-modal-overlay"
        contentLabel="Modal de confirmação para encerramento de sala"
      >
        <img src={closeImg} alt="Encerrar sala" />

        <h2>Encerrar sala</h2>

        <p>Tem certeza que você deseja encerrar esta sala?</p>

        <div className="actions">
          <button className="cancel-button" type="button" onClick={closeModalRoom}>
            Cancelar
          </button>

          <button className="accept-button" type="button" onClick={handleEndRoom}>
            Sim, encerrar
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={modalQuestionIsOpen}
        onRequestClose={closeModalQuestion}
        className="room-modal"
        overlayClassName="room-modal-overlay"
        contentLabel="Modal de confirmação para exclusão de pergunta"
      >
        <img src={excludeImg} alt="Excluir pergunta" />

        <h2>Excluir pergunta</h2>

        <p>Tem certeza que você deseja excluir esta pergunta?</p>

        <div className="actions">
          <button className="cancel-button" type="button" onClick={closeModalQuestion}>
            Cancelar
          </button>

          <button className="accept-button" type="button" onClick={handleDeleteQuestion}>
            Sim, excluir
          </button>
        </div>
      </Modal>
    </div>
  )
}