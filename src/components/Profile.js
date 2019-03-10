import React, { useEffect, useState } from 'react'

import EmailSvg from '../outline-alternate_email-24px.svg'
import WorkSvg from '../outline-business-24px.svg'
import PhoneSvg from '../outline-call-24px.svg'
import LocationSvg from '../outline-location_on-24px.svg'
import WebsiteSvg from '../outline-screen_share-24px.svg'

import Tooltip from '@material-ui/core/Tooltip'

function Profile() {
  const [info, setInfo] = useState({
    name: 'Tim Snow',
    bio: 'Developer',
    location: 'England',
    email: 'tim.snow1991@gmail.com',
    blog: 'http://www.tim-snow.co.uk',
  })
  const [phone, setPhone] = useState('07944 878 ???')

  useEffect(() => {
    info.image === undefined && fetchGitInfo()
  })

  const fetchGitInfo = async () => {
    const { REACT_APP_API_KEY, REACT_APP_API_URL } = process.env

    const { name, blog, email, location, bio, avatar_url } = await fetch(
      `${REACT_APP_API_URL}/users/tim-snow`,
      {
        method: 'get',
        headers: {
          Authorization: `token ${REACT_APP_API_KEY}`,
        },
      },
    )
      .then(res => res.json())
      .catch(err => console.error(err))

    const image = URL.createObjectURL(
      await fetch(avatar_url)
        .then(response => response.blob())
        .catch(err => console.error(err)),
    )

    setInfo({
      name,
      blog,
      email,
      location,
      bio,
      image,
    })
  }

  const revealPhoneNumber = () => setPhone('07944 878 537')

  return (
    <div style={styles.container}>
      {info.image && <img src={info.image} alt="pic" style={styles.image} />}
      <div style={styles.infoContainer}>
        <h1 style={styles.name}>{info.name}</h1>
        <table>
          <tbody>
            <tr>
              <td />
              <td />
            </tr>
            <tr style={styles.row}>
              <td style={styles.col}>
                <img src={LocationSvg} alt="Location" />
              </td>
              <td>
                <p>Currently located in {info.location}</p>
              </td>
            </tr>
            <tr style={styles.row}>
              <td style={styles.col}>
                <img src={WorkSvg} alt="Work" />
              </td>
              <td>
                <p>{info.bio}</p>
              </td>
            </tr>
            <tr style={styles.row}>
              <td style={styles.col}>
                <img src={EmailSvg} alt="email" />
              </td>
              <td>
                <a href={`mailto:${info.email}?subject=Hello world!`}>
                  <p>{info.email}</p>
                </a>
              </td>
            </tr>
            <tr style={styles.row}>
              <td style={styles.col}>
                <img src={WebsiteSvg} alt="Web" />
              </td>
              <td>
                <a href={info.blog}>{info.blog && info.blog.substr(7)}</a> -
                you're already here!
              </td>
            </tr>
            <tr style={styles.row}>
              <td style={styles.col}>
                <img src={PhoneSvg} alt="Phone" />
              </td>
              <td style={styles.interactive} onClick={revealPhoneNumber}>
                <Tooltip title="Shhh :)" placement="top-start" enterDelay={10}>
                  <p>{phone}</p>
                </Tooltip>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: 5,
    display: 'flex',
    backgroundColor: '#DFDFDF',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  infoContainer: {
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 15,
  },
  name: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 600,
    margin: 0,
  },
  row: {
    height: 50,
  },
  col: {
    textAlign: 'center',
    width: 50,
  },
  interactive: {
    cursor: 'pointer',
  },
}

export default Profile
