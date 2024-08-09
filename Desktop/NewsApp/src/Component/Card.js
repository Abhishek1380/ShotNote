import React, { Component } from 'react'

export class Card extends Component {
    render() {
        return (
            <div className="card custom-card" style={{ width: '18rem' }}>
                <img
                    className="card-img-top"
                    src="https://via.placeholder.com/300x200"
                    alt="Card image cap"
                    style={{ objectFit: 'cover', height: '150px' }} // Uniform image styling
                />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content...
                        <a href="/details" className="card-link">Read more</a> {/* Redirect to a new page */}
                    </p>
                </div>
            </div>




        )
    }
}

export default Card
