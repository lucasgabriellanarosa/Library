// import { useEffect, useState } from "react"
// import { useBooks } from "../hooks/useBooks"

import { useEffect } from "react"
import { useAuthStore } from "../stores/useAuthStore"
import { useAuth } from "../hooks/useAuth"

function HomePage() {

  // const { searchBooks } = useBooks()

  // const [books, SetBooks] = useState([])

  // useEffect(() => {
  //   const fetchInitialBooks = async () => {
  //     const data = await searchBooks();
  //     SetBooks(data.items || []);
  //   }
  //   fetchInitialBooks();
  // }, [])

  const { initializeAuth } = useAuth()

  useEffect(() => {
    initializeAuth();
  }, [])
  
  const {user} = useAuthStore()
  


  return (
    <div>
      <h1>Bem-vindo à sua Biblioteca</h1>
      {
        user ? (
          <div>
            <p>Olá, {user.email}!</p>
          </div>
        ) : (
          <p>Faça login para acessar seus livros e favoritos.</p>
        )
      }
    </div>
  )
}

export default HomePage