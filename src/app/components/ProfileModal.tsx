
'use client'
import React from 'react'
import { User } from '../types/user'
import styles from './ProfileModal.module.css'
import Image from 'next/image'

interface ProfileModalProps {
  user: User
  onClose: () => void
}

export default function ProfileModal({ user, onClose }: ProfileModalProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>Close</button>

        <img
          src={user.picture}
          alt={user.name}
          style={{ width: '100%', height: 300, borderRadius: 8 }}
        />


        <h2>{user.name}, {user.age}</h2>
        <p><strong>Location:</strong> {user.location}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p>{user.bio}</p>
      </div>
    </div>
  )
}
