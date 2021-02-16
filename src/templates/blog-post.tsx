import { graphql, Link, PageProps } from "gatsby"
import React from "react"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {Adsense} from "@ctrl/react-adsense";


const BlogPostTemplate: React.FC<PageProps<DataProps>>  = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        {/* <Adsense
          client="ca-pub-1472550613966776"
          slot="7259870550"
          style={{ display: 'block' }}
          layout="in-article"
          format="fluid"
        /> */}
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <div id="tags" style={{}}>
          Tags: &nbsp;
          {post.frontmatter.tag.map(e => <p style={{"display": "inline"}}><label style={{"background": "#cccccc"}}>#{e}</label>&nbsp;</p>)}
        </div>
        
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

type DataProps = {
  site: {
    siteMetadata: {
      title: string
    }
  }
  markdownRemark: {
    id: string,
    excerpt: any,
    html: string,
    frontmatter: {
      title: string
      date: string
      description: string
      tag: string[]
    }
  },
  previous: {
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
    }
  }
  next: {
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
    }
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tag
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
