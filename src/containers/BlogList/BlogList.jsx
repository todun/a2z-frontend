import React from 'react'
import './BlogList.css'
import BlogListCard from '../../components/BlogListCard/BlogListCard'
import client from '../../service/client'
import Loader from '../../components/Loader/Loader'

export default class BlogList extends React.Component {

  constructor(){
    super()
    this.state = {articles : []}
  }
  
  componentDidMount(){
    client.getEntries({content_type : 'post'}).then((response)=>{
      this.setState({
        articles : response.items,
        loading : false 
      })
    })
}
  render() {
   
    // const title = article.fields.title
  
    return (
      <div className="blog-page-container">
        <div className="blog-container blog-background">
          <h1 className="blog-h1">Campus Stories </h1>
        </div>

        {this.state.loading ? <Loader message=" " /> : null}

        <div className="blog-list-container">
            {this.state.articles.map((article, i) => 
            <BlogListCard id={i} key={i} 
                          title={article.fields.title} 
                          author={article.fields.author.fields.name} 
                          date={article.fields.publishedDate}
                          image={article.fields.featureImage.fields.file.url}
                          slug={article.fields.slug} 
             />
            )}
        </div>
      </div>
    );
  }
}