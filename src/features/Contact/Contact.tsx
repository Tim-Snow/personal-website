import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import { secondary } from 'constants/styles';

const styles = {
  container: {
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
    backgroundColor: secondary,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  margin: {
    margin: 5,
  },
  error: {
    textAlign: 'center',
    color: '#F33',
  },
} as { [key: string]: React.CSSProperties };

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    setSent(true);
  };

  return (
    <div style={styles.container}>
      <h2>Contact me</h2>
      <div style={styles.form}>
        <input style={styles.margin} placeholder="Your name" type="text" name="name" />
        <input style={styles.margin} placeholder="Your email" type="text" name="email" />
        <input style={styles.margin} type="text" placeholder="Subject" name="subject" />
        <textarea style={styles.margin} placeholder="Your message" rows={8} cols={80} name="message" />
      </div>

      {sent && (
        <div style={styles.error}>
          <p>Sorry, I haven&apos;t implemented anything but the visuals for this, yet..!</p>
          <p>
            Use the info at the top of the page to get in contact{' '}
            <span role="img" aria-label="smile">
              😊
            </span>
          </p>
        </div>
      )}

      <Button variant="contained" color="primary" style={styles.margin} onClick={handleSubmit}>
        Send
      </Button>
    </div>
  );
}