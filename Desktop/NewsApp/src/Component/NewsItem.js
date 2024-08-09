import React, { Component } from 'react'
import './component.css'

export class NewsItem extends Component {

    // constructor() {
    //     super();
    //     console.log("I want that");
    // }

    render() {

        let { title, description, imageUrl, newsUrl } = this.props;
        return (

            <div className="card custom-card" style={{ width: '18rem' }}>
                <img
                    className="card-img-top"
                    src={imageUrl || "https://via.placeholder.com/300x200"} // Use placeholder if imageUrl is null
                    alt="Card image cap"
                    style={{ objectFit: 'cover', height: '150px' }} // Make images uniform in size
                />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">
                        {description}
                    </p>
                    <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="card-link">Read more</a>
                </div>
            </div>


        )
    }
}

export default NewsItem
