import React, { Component } from 'react'
import Spinner from "./spinner";
import NewsItem from './NewsItem'

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            articles: [],
            page: 1,
            category: this.props.category,
            count: 0
        }
    }
    async componentDidMount() {
        console.log(this.state.category)
        this.setState({ loading: true })
        let urlValue = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=f3b6b3fcedb442c38a5a4fa86f2b0ad3&page=1&pageSize=15`
        let data = await fetch(urlValue)
        let parsedData = await data.json()
        this.setState({ loading: false })
        this.setState({ articles: parsedData.articles, totalArticles: parsedData.totalResults })
        this.setState({ count: 1 })
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.category !== this.props.category) {
            this.setState({ loading: true })
            let urlValue = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=f3b6b3fcedb442c38a5a4fa86f2b0ad3&page=1&pageSize=15`
            let data = await fetch(urlValue)
            let parsedData = await data.json()
            this.setState({ loading: false })
            this.setState({ articles: parsedData.articles, totalArticles: parsedData.totalResults })
            console.log("sumit")
        }
    }
    handleNextClick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalArticles / 15)) {
            window.alert("Thats for Today")
        } else {
            this.setState({ loading: true })
            let urlValue = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=f3b6b3fcedb442c38a5a4fa86f2b0ad3&page=${this.state.page + 1}&pageSize=15`
            let data = await fetch(urlValue)
            let parsedData = await data.json()
            this.setState({ loading: false })
            this.setState({ articles: parsedData.articles })
            this.setState({ page: this.state.page + 1 })
        }
    }
    handlePreviousClick = async () => {
        this.setState({ loading: true })
        let urlValue = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=f3b6b3fcedb442c38a5a4fa86f2b0ad3&page=${this.state.page - 1}&pageSize=15`
        let data = await fetch(urlValue)
        let parsedData = await data.json()
        this.setState({ loading: false })
        this.setState({ articles: parsedData.articles })
        this.setState({ page: this.state.page - 1 })
    }
    render() {
        return (
            <div>
                <div className="container my-3" style={{ overflow: "auto" }}>
                    <h1 className="text-center" style={{ margin: "30px", marginTop: "50px", color: "white" }}>Top {this.props.category} Headlines</h1>
                    {this.state.loading && <Spinner />}
                    <div className="row row-cols-1 row-cols-md-3 g-4" style={{ marginTop: "0%" }}>
                        {console.log("hello")}
                        {console.log(this.state.articles)}
                        {console.log("new")}
                        {this.state.articles.map((element) => {
                            return <div className="col" key={element.url}>
                                <NewsItem newTitle={element.title ? element.title.slice(0, 50) : " "} descrption={element.description ? element.description.slice(0, 88) : " "} imageUrl={element.urlToImage ? element.urlToImage : "https://i.dailymail.co.uk/1s/2021/12/15/09/51817569-0-image-a-8_1639559726968.jpg"} newsUrl={element.url} />
                            </div>
                        }
                        )}
                    </div>

                </div>
                <div className="container my-3">
                    <div className="d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-black my-3" onClick={this.handlePreviousClick}>Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / 15)} type="button" className="btn btn-black my-3" onClick={this.handleNextClick} >Next</button>
                    </div>

                </div>

            </div>
        )
    }
}