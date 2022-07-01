import './index.css'

const MatchCard = props => {
  const {eachMatch} = props
  const {
    competingTeamLogoRecent,
    competingTeamRecent,
    resultRecent,
    matchStatusRecent,
  } = eachMatch
  let matchStatusCss
  if (matchStatusRecent === 'Won') {
    matchStatusCss = 'won-match-status'
  } else if (matchStatusRecent === 'Lost') {
    matchStatusCss = 'lose-match-status'
  }
  return (
    <li className="match-card-container">
      <img
        src={competingTeamLogoRecent}
        className="competing-team-recent-logo"
        alt={`competing team ${competingTeamRecent}`}
      />
      <p className="competing-team-recent">{competingTeamRecent}</p>
      <p className="result-recent">{resultRecent}</p>
      <p className={matchStatusCss}>{matchStatusRecent}</p>
    </li>
  )
}

export default MatchCard
