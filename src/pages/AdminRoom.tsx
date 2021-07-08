import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from 'react-modal';

import { useRoom } from '../hooks/useRoom'

import logoImg from '../assets/images/logo.svg'
import closeImg from '../assets/images/close.svg'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/Question'

import '../styles/room.scss'
import '../styles/room-modal.scss'

interface RoomParams {
  id: string;
}

export function AdminRoom() {
  const { id } = useParams<RoomParams>()
  const { questions, title } = useRoom(id);
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Let me ask" />

          <div>
            <RoomCode code={id} />
            <Button isOutlined onClick={openModal} type="button">Encerrar</Button>
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
                l
              </Question>
            ))
          ) : (
            <div>not questions</div>
          )}
        </div>
      </main>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="room-modal"
        overlayClassName="room-modal-overlay"
        contentLabel="Modal de confirmação para encerramento de sala"
      >
        <img src={closeImg} alt="Encerrar sala" />

        <h2>Encerrar sala</h2>

        <p>Tem certeza que você deseja encerrar esta sala?</p>

        <div className="actions">
          <button className="cancel-button" type="button" onClick={closeModal}>
            Cancelar
          </button>

          <button className="accept-button" type="button">
            Sim, encerrar
          </button>
        </div>
      </Modal>
    </div>
  )
}