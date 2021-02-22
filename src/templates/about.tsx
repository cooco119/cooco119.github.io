import { graphql, Link, PageProps } from "gatsby"
import React from "react"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogAbout: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const post = data.markdownRemark;
  return (
    <Layout location={location} title={siteTitle}>
      <SEO 
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1 itemProp="headline">[WIP] About</h1>
          <p></p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <hr />
      </article>
    </Layout>
  );
};



export default BlogAbout

type DataProps = {
  site: {
    siteMetadata: {
      title: string
      author: {
        name: string
        summary: string
      }
      description: string
      social: {
        twitter: string
        linkedin: string
        github: string
      }
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
      category: string
    }
  }
}

export const pageQuery = graphql`
  query (
    $id: String!
  ){
    site {
      siteMetadata {
        title
        author {
          name
          summary
        }
        description
        social {
          twitter
          linkedin
          github
        }
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
        category
      }
    }
  }
`
