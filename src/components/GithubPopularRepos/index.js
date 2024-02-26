import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    activeId: languageFiltersData[0].id,
    repoList: [],
  }

  componentDidMount() {
    this.onGetRepoList()
  }

  onGetRepoList = async () => {
    const {activeId} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const response = await fetch(apiUrl)

    if (response.ok === true) {
      const data = await response.json()
      const popularRepos = data.popular_repos
      const updatedData = popularRepos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))

      this.setState({
        repoList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickLanguageItem = id => {
    this.setState({activeId: id}, this.renderRepositories)
  }

  renderHeader = () => (
    <div>
      <h1>Popular</h1>
      <ul>
        {languageFiltersData.map(each => (
          <LanguageFilterItem
            details={each}
            key={each.id}
            onClickLanguageItem={this.onClickLanguageItem}
          />
        ))}
      </ul>
    </div>
  )

  renderLoadingView = () => (
    <div>
      <div className="products-loader-container">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderSuccessView = () => {
    const {repoList} = this.state

    return (
      <ul>
        {repoList.map(each => (
          <RepositoryItem details={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView
      case apiStatusConstants.failure:
        return this.renderFailureView
      case apiStatusConstants.inProgress:
        return this.renderLoadingView
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    console.log(apiStatus)

    return (
      <div>
        {this.renderHeader()}
        {this.renderRepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos
