import React, { useEffect, useState } from 'react'

import TableTitle from './TableTitle'
import request from '../libs/request'
import CommitMessage from './CommitMessage'

import { secondary, shadow, radius } from '../constants/styles'

function Activity() {
  const [activities, setActivities] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getGitActivity()
  }, [])

  const getGitActivity = () => {
    request('/users/tim-snow/events')
      .then(res => cleanEventNames(res))
      .then(clean => setActivities(clean))
      .then(() => setLoaded(true))
  }

  const cleanEventNames = activities => {
    return activities.map(act => {
      switch (act.type) {
        case 'WatchEvent':
          act.type = 'Watching'
          break
        case 'PushEvent':
          act.type = 'Pushed to'
          break
        case 'CreateEvent':
          act.type = 'Created'
          break
        default:
          break
      }
      return act
    })
  }

  return (
    <div style={styles.container}>
      <h2>Recent Github activity</h2>
      <table style={styles.fullWidth}>
        <tbody style={styles.table}>
          <tr style={styles.row} key="titles">
            <TableTitle style={styles.column} value="Date" />
            <TableTitle style={styles.column} value="Event" />
            <TableTitle style={styles.column} value="Repository" />
            <TableTitle style={styles.column} value="Commit message" />
          </tr>
          {loaded &&
            activities.map(activity => (
              <tr style={{ ...styles.row, ...styles.shadow }} key={activity.id}>
                <td style={styles.column}>
                  {activity.created_at && activity.created_at.substr(0, 10)}
                </td>
                <td style={styles.column}>{activity.type}</td>
                <td style={styles.column}>
                  <a
                    href={activity.repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {activity.repo.name.split('/')[1]}
                  </a>
                </td>
                <td style={styles.column}>
                  {activity.type === 'Pushed to' &&
                    activity.payload.commits.map(commit => (
                      <p key={commit.sha}>
                        <CommitMessage
                          message={commit.message}
                          url={commit.url}
                        />
                      </p>
                    ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

const styles = {
  container: {
    borderRadius: radius,
    background: secondary,
    color: '#333',
    textAlign: 'center',
    margin: 10,
    overflowY: 'auto',
    height: 600,
    width: 900,
    padding: 15,
    boxShadow: shadow,
  },
  fullWidth: {
    width: '100%',
  },
  table: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  column: {
    flex: 1,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  shadow: {
    boxShadow: '0px 0px 9px 0px rgba(0,0,0,0.1)',
    margin: 5,
  },
}

export default Activity
