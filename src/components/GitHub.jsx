import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'

export const GitHub = () => {
  const [data, setData] = useState([]) 
  const [searchTerm, setSearchTerm] = useState('') 
  const [isLoading, setIsLoading] = useState(false) 
  const [error, setError] = useState('') 

  useEffect(() => {
    if (searchTerm.trim() !== '') { 
      getData()
    }
  }, [])

  const getData = async () => {
    if (searchTerm.trim() === "") { 
      return
    }
    setIsLoading(true) 
    setError('') 
    try {
      const res = await axios.get(`https://api.github.com/search/repositories?q=${searchTerm}`)
      setData(res.data.items)
      if (res.data.items.length === 0) {
        setError('No data found')
      }
    } catch (error) {
      console.error("Error fetching data: ", error)
      setError('Error fetching data') 
    }
    setIsLoading(false) 
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (searchTerm.trim() === "") {
      setData([])
      setError('Input can\'t be empty')
      return
    }
    setData([])
    setIsLoading(true)
    getData() 
    setSearchTerm("") 
  }

  const listUsers = data.map((user) => (
    <li key={user.id}>
      <a href={user.html_url}>
        <div className="flex justify-start w-[50%] mx-auto mt-5 bg-gray-300 rounded shadow-lg">
          <div className="p-2 flex">
            <img
              className="p-1"
              src={user.owner.avatar_url}
              alt="img"
              width={100}
            />

            <div className="flex flex-col text-start ml-5 justify-center">
              <p className="text-lg text-wrap">Login: {user.name}</p>
              <p className="text-lg">Id: {user.id}</p>
            </div>
          </div>
        </div>
      </a>
    </li>
  ))

  return (
    <div className="flex flex-col bg-white w-[75%] mx-auto text-center">
      <h3 className="text-3xl font-bold mt-16 justify-center flex">
        GitHub Users Results
      </h3>
      <form onSubmit={handleSubmit} className="mt-5">
        <div className='h-[35px] inline-flex w-[70%] justify-center flex-col'>
          <div className='flex justify-center'>
            <input
              type="text"
              className="border border-black w-[33%] p-2 h-[100%] rounded-tl rounded-bl focus:outline-none"
              placeholder="Enter a username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-black text-white p-2 h-[100%] rounded-tr rounded-br text-center items-center flex font-bold">
              Search
            </button>
          </div>
        </div>
      </form>
      {error && (
        <h3 className={`mt-2 ${error !== "No data found" ? "text-red-500" : "text-black"}`}>{error}</h3>
      )}
      {isLoading && (
        <ReactLoading
          className="mx-auto mt-10"
          type="spinningBubbles"
          color="#333333"
          height={50}
          width={50}
        />
      )}
      <ul className="mb-2">{listUsers}</ul>
    </div>
  )
}