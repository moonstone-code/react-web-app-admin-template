export default function Search({ lists, setSearchResults }) {

    const handleSubmit = (e) => e.preventDefault()

    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchResults(lists)  
        const resultsArray = lists.filter(post => post.s_title.toLowerCase().includes(e.target.value.toLowerCase()) || post.s_desc.toLowerCase().includes(e.target.value.toLowerCase()))
        setSearchResults(resultsArray)
    }
    return (
        <>
            <form className="search" onSubmit={handleSubmit}>
                <input
                    className="form-control border-0 p-2 w-100 h-100 todo-search" placeholder="Search ..."
                    type="text"
                    id="search"
                    onChange={handleSearchChange}
                />
            </form>
        </>
    )
}
