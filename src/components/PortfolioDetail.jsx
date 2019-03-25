import React from 'react'
import Collapse from '@material-ui/core/Collapse'

import GithubSvg from '../assets/github.svg'
import PortfolioImages from '../assets/portfolio/images'
import PortfolioContent from '../assets/portfolio'

const PortfolioDetail = props => {
  let current
  if (props.open) current = props.portfolio.name

  return (
    <Collapse in={props.open}>
      <div style={styles.details}>
        {props.open && (
          <div>
            <h5>{current}</h5>
            <p>
              <a
                href={props.portfolio.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  style={styles.icon}
                  src={GithubSvg}
                  alt="View code on Github"
                />
              </a>
            </p>
            <img
              src={PortfolioImages[current]}
              alt={current}
              style={styles.image}
            />
            <p>{props.portfolio.description}</p>
            {PortfolioContent[current] && (
              <>
                <h3>
                  {PortfolioContent[current].title &&
                    PortfolioContent[current].title}
                </h3>
                <p>{PortfolioContent[current].about}</p>
                <p>
                  Technologies:{' '}
                  {PortfolioContent[current].technologies.join(', ')}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </Collapse>
  )
}

const styles = {
  details: {
    margin: 10,
  },
  icon: { width: 24 },
  image: {
    maxHeight: 600,
    maxWidth: 600,
  },
}

export default PortfolioDetail
