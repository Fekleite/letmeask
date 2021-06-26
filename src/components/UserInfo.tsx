import avatarImg from '../assets/images/avatar.svg'

import '../styles/user-info.scss'

interface UserInfoProps {
  avatar: string;
  name: string;
}

export function UserInfo({ avatar, name }: UserInfoProps) {
  return (
    <div className="user-info">
      <img src={avatar || avatarImg} alt={name} />

      <span>{name}</span>
    </div>
  )
}