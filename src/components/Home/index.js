import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {allTeamsData: [], isLoading: true}

  componentDidMount() {
    this.fetchAllTeams()
  }

  fetchAllTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const jsonData = await response.json()
    const allTeams = jsonData.teams
    const updatedData = allTeams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))
    this.setState({allTeamsData: updatedData, isLoading: false})
  }

  render() {
    const {allTeamsData, isLoading} = this.state

    let allTeamsDataOutput
    if (isLoading) {
      allTeamsDataOutput = (
        <div testid="loader" className="loader">
          <Loader type="Oval" color="#ffffff" height={50} width={50} />
        </div>
      )
    } else {
      allTeamsDataOutput = (
        <ul className="all-teams-container">
          {allTeamsData.map(eachTeam => (
            <TeamCard eachTeam={eachTeam} key={eachTeam.id} />
          ))}
        </ul>
      )
    }

    return (
      <div className="home-container">
        <div className="logo-title-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            className="ipl-logo"
            alt=" ipl logo"
          />
          <h1 className="ipl-title">IPL Dashboard</h1>
        </div>
        {allTeamsDataOutput}
      </div>
    )
  }
}

export default Home
