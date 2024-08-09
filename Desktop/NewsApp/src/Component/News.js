// src/News.js
import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner'; // Import the spinner component
import './component.css';
import PropTypes from 'prop-types';

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            currentPage: 1,
            totalPages: 1,
            error: null,
            darkMode: false, // Track dark mode state
        };
    }

    async componentDidMount() {
        await this.fetchArticles();
    }

    fetchArticles = async (page = 1) => {
        this.setState({ loading: true, error: null }); // Set loading to true before fetching
        const pageSize = this.props.pageSize || 10;
        const country = this.props.country || "in";
        const apiKey = process.env.REACT_APP_API_KEY; // Access API key from environment variable
        const url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${apiKey}&pageSize=${pageSize}&page=${page}`;

        // console.log('API Key:', process.env.REACT_APP_API_KEY);


        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({
                articles: data.articles,
                currentPage: page,
                totalPages: Math.ceil(data.totalResults / pageSize),
                loading: false,
            });
        } catch (error) {
            this.setState({ error: error.message, loading: false });
        }
    }

    handleNextClick = () => {
        const { currentPage, totalPages } = this.state;
        if (currentPage < totalPages) {
            this.fetchArticles(currentPage + 1);
        }
    }

    handlePrevClick = () => {
        const { currentPage } = this.state;
        if (currentPage > 1) {
            this.fetchArticles(currentPage - 1);
        }
    }

    renderPageNumbers = () => {
        const { currentPage, totalPages } = this.state;

        return (
            <>
                {currentPage > 1 && (
                    <li className="page-item">
                        <button className="page-link" onClick={() => this.fetchArticles(currentPage - 1)}>
                            {currentPage - 1}
                        </button>
                    </li>
                )}
                <li className="page-item active">
                    <span className="page-link">{currentPage}</span>
                </li>
                {currentPage < totalPages && (
                    <li className="page-item">
                        <button className="page-link" onClick={() => this.fetchArticles(currentPage + 1)}>
                            {currentPage + 1}
                        </button>
                    </li>
                )}
            </>
        );
    }

    toggleDarkMode = () => {
        this.setState(prevState => {
            const newDarkMode = !prevState.darkMode;
            document.body.classList.toggle('dark-mode', newDarkMode);
            return { darkMode: newDarkMode };
        });
    }

    render() {
        const { articles, currentPage, loading, error, darkMode } = this.state;

        return (
            <>
                {loading && <Spinner />}
                {error && <div className="error-message">Error: {error}</div>}
                <div className={`news-container ${darkMode ? 'dark-mode' : ''} ${loading ? 'blur' : ''}`}>
                    {articles
                        .filter(article =>
                            article.author &&
                            article.title &&
                            article.description &&
                            article.title !== '[Removed]' &&
                            article.description !== '[Removed]'
                        )
                        .map((article) => (
                            <NewsItem
                                key={article.url}
                                title={article.title.slice(0, 88) || ''}
                                description={article.description.slice(0, 350) || ''}
                                imageUrl={article.urlToImage}
                                newsUrl={article.url}
                            />
                        ))}
                </div>

                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" aria-label="Previous" onClick={this.handlePrevClick} disabled={currentPage === 1}>
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </button>
                        </li>
                        {this.renderPageNumbers()}
                        <li className={`page-item ${currentPage === this.state.totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" aria-label="Next" onClick={this.handleNextClick} disabled={currentPage === this.state.totalPages}>
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </>
        );
    }
}

News.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
};

export default News;
