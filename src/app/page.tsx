

'use client'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { setUsers, likeUser, nextProfile } from './store/profilesSlice'
import SwipeCard from './components/SwipeCard'
import ProfileModal from './components/ProfileModal'
import { User } from './types/user'

// Type for API result
type ApiUser = {
  login: { uuid: string }
  name: { first: string; last: string }
  dob: { age: number }
  location: { city: string; country: string }
  email: string
  picture: { large: string }
}

export default function HomePage() {
  const dispatch = useAppDispatch()
  const users = useAppSelector(s => s.profiles.users)
  const currentIndex = useAppSelector(s => s.profiles.currentIndex)
  const [showProfile, setShowProfile] = useState(false)
  const [activeUser, setActiveUser] = useState<User | null>(null)

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch('https://randomuser.me/api/?results=20&nat=us')
      const data = (await res.json()) as { results: ApiUser[] }

      const transformed: User[] = data.results.map(r => ({
        id: r.login.uuid,
        name: `${r.name.first} ${r.name.last}`,
        age: r.dob.age,
        location: `${r.location.city}, ${r.location.country}`,
        email: r.email,
        picture: r.picture.large,
        bio: `Hi, I'm ${r.name.first}. I like music and coding.`
      }))

      dispatch(setUsers(transformed))
    }
    fetchUsers()
  }, [dispatch])

  const currentUser = users[currentIndex]

  function handleLike(user: User) {
    dispatch(likeUser(user))
    dispatch(nextProfile())
  }

  function handleSkip() {
    dispatch(nextProfile())
  }

  function handleViewProfile(user: User) {
    setActiveUser(user)
    setShowProfile(true)
  }

  return (
    <main>
      <h1>Tinder-style Swipe</h1>
      {currentUser ? (
        <SwipeCard
          user={currentUser}
          onLike={() => handleLike(currentUser)}
          onSkip={handleSkip}
          onViewProfile={() => handleViewProfile(currentUser)}
        />
      ) : (
        <p>Please refresh the page...</p>
      )}

      {showProfile && activeUser && (
        <ProfileModal user={activeUser} onClose={() => setShowProfile(false)} />
      )}
    </main>
  )
}

