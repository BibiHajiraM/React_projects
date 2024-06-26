import { useEffect, useState } from "react"
import data from "../accordian/data";
import Suggestions from "./suggestions";



export default function SearchAutoComplete() {

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [searchParam, setSearchParam] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState('');

    function handleChange(event){
        const query = event.target.value.toLowerCase();
        setSearchParam(query);

        if (query.length > 1){
            const filteredData = users && users.length ? 
            users.filter(item => item.toLowerCase().indexOf(query) > -1)
            : [];
            setFilteredUsers(filteredData)
            setShowDropdown(true)
        } else {
            setShowDropdown(false)
        }
    }

    function handleClick(event) {
        console.log(event.target.innerText);
        setShowDropdown(false);
        setSearchParam(event.target.innerText);
        setFilteredUsers([]);
    }

    async function fetchListOfUsers() {
        try {
            setLoading(true)
            const res = await fetch('https://dummyjson.com/users')
            const data = await res.json()

            console.log(data);

            if (data && data.users && data.users.length) {
                setUsers(data.users.map((userItem) => userItem.firstName))
                setLoading(false)
                setError(null)
            }
        }
        catch (e) {
            setLoading(false)
            console.log(e);
            setError(e)
        }
    }

    console.log(users, filteredUsers);

    useEffect(() => {
        fetchListOfUsers()
    }, [])

    

    return <div className="search-autocomplete-container">
        {
            loading ? (
                <h1>Loading data! Please wait</h1>
            ) : (
                <input 
                    value={searchParam} 
                    name="search-users" 
                    placeholder="Search users here..."
                    onChange={handleChange} 
                />
            )
        }
        
        {
            showDropdown && <Suggestions handleClick={handleClick} data={filteredUsers} />
        }
    </div>
}