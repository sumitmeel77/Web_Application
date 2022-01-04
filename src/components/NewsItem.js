import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { newTitle, descrption, imageUrl, newsUrl } = this.props
        return (
            <div className="card h-100">
                <img src={imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{newTitle}</h5>
                    <p className="card-text">{descrption}</p>
                    <a target="_blank" rel="noreferrer" href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        )
    }
}