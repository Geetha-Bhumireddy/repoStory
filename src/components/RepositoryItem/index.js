// Write your code here

const RepositoryItem = ({details}) => {
  const {id, name, issuesCount, forksCount, starsCount, avatarUrl} = details

  return (
    <li>
      <img src={avatarUrl} />
      <h1>{name}</h1>
    </li>
  )
}
export default RepositoryItem
