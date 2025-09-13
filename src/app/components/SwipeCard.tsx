
'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { User } from '../types/user'
import styles from './SwipeCard.module.css'


type Props = { user: User; onLike: () => void; onSkip: () => void; onViewProfile: () => void }


export default function SwipeCard({ user, onLike, onSkip, onViewProfile }: Props) {
    const threshold = 120


    return (
        <div className={styles.container}>
            <motion.div
                className={styles.card}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                    if (info.offset.x > threshold) onLike()
                    else if (info.offset.x < -threshold) onSkip()
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <img src={user.picture} alt={user.name} className={styles.avatar} />
                <div className={styles.info}>
                    <h2>{user.name}, {user.age}</h2>
                    <p>{user.location}</p>
                    <div className={styles.buttons}>
                        <button onClick={onSkip}>Skip</button>
                        <button onClick={onViewProfile}>View Profile</button>
                        <button onClick={onLike}>Like</button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}