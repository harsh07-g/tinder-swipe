
'use client'
import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import ProfileModal from '../components/ProfileModal'
import { removeLikedById } from '../store/profilesSlice'


export default function LikedPage() {
    const liked = useAppSelector(s => s.profiles.liked)
    const dispatch = useAppDispatch()
    const [selected, setSelected] = useState<any | null>(null)


    return (
        <main>
            <h1>Liked Users</h1>
            {liked.length === 0 ? <p>No liked users yet</p> : (
                <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
                    {liked.map((user: any) => (
                        <div key={user.id} style={{ background: '#fff', padding: 10, borderRadius: 8 }}>
                            <img src={user.picture} alt={user.name} style={{ width: '100%', borderRadius: 8 }} />
                            <h3>{user.name}</h3>
                            <p style={{ margin: 0 }}>{user.location}</p>
                            <div style={{ marginTop: 8 }}>
                                <button onClick={() => setSelected(user)} style={{ marginRight: 8 }}>View</button>
                                <button onClick={() => dispatch(removeLikedById(user.id))}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}


            {selected && <ProfileModal user={selected} onClose={() => setSelected(null)} />}
        </main>
    )
}