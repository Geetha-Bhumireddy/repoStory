import './index.css'

const LanguageFilterItem = ({details, onClickLanguageItem}) => {
  const {language, id} = details

  const onClickTabitem = () => onClickLanguageItem(id)

  return (
    <li>
      <button onClick={onClickTabitem}>{language}</button>
    </li>
  )
}

export default LanguageFilterItem
