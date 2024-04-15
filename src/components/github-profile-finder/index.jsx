import { useEffect, useState } from "react"
import User from "./user";
import './styles.css';


export default function GithubProfileFinder(){

    const [username, setUsername] = useState('BibiHajiraM');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);


    async function fetchGithubUserData(){
        setLoading(true)
        const res = await fetch(`https://api.github.com/users/${username}`)

        const data = await res.json()
        if (data) {
            setUserData(data)
            setLoading(false)
            setUsername('')
        }
    }

    function handleSubmit(){
        fetchGithubUserData()
    }

    useEffect(() => {
        fetchGithubUserData()
    }, [])

    if (loading) {
        return <h1>Loading data! Please wait</h1>
    }

    return <div className="github-profile-container">
        <div className="input-wrapper">
            <input
            name="search-by-name"
            type="text"
            placeholder="Search Github Username..."
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            />
            <button onClick={handleSubmit}>Search</button>
        </div>
        {
            userData !== null ? <User user={userData}/> : null
        }
    </div>
}