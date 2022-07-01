import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {latestMatchData: {}, recentMatchesData: [], isLoading: true}

  componentDidMount() {
    this.fetchAllRecentMatchesOfTeam()
  }

  fetchAllRecentMatchesOfTeam = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const jsonData = await response.json()
    const latestMatchDetails = {
      teamBannerUrl: jsonData.team_banner_url,
      umpires: jsonData.latest_match_details.umpires,
      result: jsonData.latest_match_details.result,
      manOfTheMatch: jsonData.latest_match_details.man_of_the_match,
      id: jsonData.latest_match_details.id,
      date: jsonData.latest_match_details.date,
      venue: jsonData.latest_match_details.venue,
      competingTeam: jsonData.latest_match_details.competing_team,
      competingTeamLogo: jsonData.latest_match_details.competing_team_logo,
      firstInnings: jsonData.latest_match_details.first_innings,
      secondInnings: jsonData.latest_match_details.second_innings,
      matchStatus: jsonData.latest_match_details.match_status,
    }
    const recentMatchDetails = jsonData.recent_matches.map(eachMatch => ({
      competingTeamLogoRecent: eachMatch.competing_team_logo,
      competingTeamRecent: eachMatch.competing_team,
      resultRecent: eachMatch.result,
      matchStatusRecent: eachMatch.match_status,
      idRecent: eachMatch.id,
    }))
    this.setState({
      latestMatchData: latestMatchDetails,
      recentMatchesData: recentMatchDetails,
      isLoading: false,
    })
  }

  render() {
    const {latestMatchData, recentMatchesData, isLoading} = this.state
    const {
      teamBannerUrl,
      umpires,
      result,
      manOfTheMatch,
      date,
      venue,
      competingTeam,
      competingTeamLogo,
      firstInnings,
      secondInnings,
    } = latestMatchData

    let allRecentMatchesOutput
    if (isLoading) {
      allRecentMatchesOutput = (
        <div testid="loader" className="loader">
          <Loader type="Oval" color="#ffffff" height={50} width={50} />
        </div>
      )
    } else {
      allRecentMatchesOutput = (
        <div className="team-matches-container">
          <img
            src={teamBannerUrl}
            className="team-banner-image"
            alt="team banner"
          />
          <h1 className="latest-matches">Latest Matches</h1>
          <div className="latest-matches-container">
            <div className="sub-container1">
              <p className="team-name">{competingTeam}</p>
              <p className="match-date">{date}</p>
              <p className="stadium-name">{venue}</p>
              <p className="who-won">{result}</p>
            </div>
            <img
              src={competingTeamLogo}
              className="competing-team-logo"
              alt={`latest match ${competingTeam}`}
            />
            <div className="sub-container2">
              <p className="innings-heading">First Innings</p>
              <p className="innings-team">{firstInnings}</p>
              <p className="innings-heading">Second Innings</p>
              <p className="innings-team">{secondInnings}</p>
              <p className="motm-heading">Man Of The Match</p>
              <p className="motm-player">{manOfTheMatch}</p>
              <p className="umpires-heading">Umpires</p>
              <p className="umpire-name">{umpires}</p>
            </div>
          </div>
          <ul className="recent-matches-container">
            {recentMatchesData.map(eachMatch => (
              <MatchCard eachMatch={eachMatch} key={eachMatch.idRecent} />
            ))}
          </ul>
        </div>
      )
    }

    return (
      <div className="team-matches-container">{allRecentMatchesOutput}</div>
    )
  }
}

export default TeamMatches
