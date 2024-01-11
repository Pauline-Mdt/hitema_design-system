import {Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from 'react';
import {elasticsearchSearch} from '../services/lesGorgonesApi';

const Home = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    let timeout = null;

    useEffect(() => {
        elasticsearchSearch(query)
            .then(response => {
                console.log(response.data);
                setResults(response.data.hits.hits);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();

        setQuery(event.target.value);

        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            elasticsearchSearch(query)
                .then(response => {
                    console.log(response.data);
                    setResults(response.data.hits.hits);
                })
                .catch(error => {
                    console.log(error);
                });
        }, 10000);

        // elasticsearchSearch(query)
        //     .then(response => {
        //         console.log(response.data);
        //         setResults(response.data.hits.hits);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });

    }

    return (
        <>
            <Row>
                <Col>
                    <h2>Home</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Bienvenue sur votre espace personnel.</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>
                        <label htmlFor="search">Rechercher un utilisateur ou un tatoueur :</label>
                        <input type="text" id="search" name="search" value={query}
                               list="search-results"
                               onChange={(e) => setQuery(e.target.value)} onBlur={handleSearch}/>
                        <datalist id="search-results">
                            {
                                results.map((result, index) => (
                                    <option key={index} value={result._source.name}/>
                                ))
                            }
                        </datalist>
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ul>
                        {
                            results.map((result, index) => (
                                <li key={index}>{result._source.name}</li>
                            ))
                        }
                    </ul>
                </Col>
            </Row>
        </>
    );
}

export default Home;