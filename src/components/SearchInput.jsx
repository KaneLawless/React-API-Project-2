import { Form, InputGroup, Button } from "react-bootstrap"
import { useState, } from "react"
import { useNavigate } from "react-router-dom"
export default function SearchInput() {

    const [search, setSearch] = useState()
    const navigate = useNavigate()

    function handleChange(e) {
        setSearch(e.target.value)
    }

    function handleSearch(e) {
        e.preventDefault()
        navigate(`/search/${search}`)
    }
    return (
        <Form onSubmit={handleSearch}>
            <InputGroup>
                <Form.Control placeholder="Search any coin.." id="search" value={search} onChange={handleChange} />
                <Button variant="outline" className="search-btn" onClick={handleSearch}>
                    Search
                </Button>
            </InputGroup>
        </Form>
    )
}