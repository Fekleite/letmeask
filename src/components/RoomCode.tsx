import { ButtonHTMLAttributes } from "react";

import copyImg from '../assets/images/copy.svg'

import '../styles/room-code.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  code: string;
}

export function RoomCode({ code, ...rest  }: ButtonProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code)
  }

  return (
    <button className="room-code" {...rest} onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>
        Sala #{code}
      </span>
    </button>
  )
}