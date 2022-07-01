import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {eachTeam} = props
  const {id, name, teamImageUrl} = eachTeam
  return (
    <li>
      <Link to={`/team-matches/${id}`} className="each-team-card">
        <img src={teamImageUrl} className="team-image" alt={name} />
        <p className="team-name-of-card">{name}</p>
      </Link>
    </li>
  )
}

export default TeamCard
