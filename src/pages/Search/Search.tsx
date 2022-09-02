import axios from 'axios'
import PageWrapper from '../../components/PageWrapper/PageWrapper'

function Search() {
  const searchItunes = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const searchResponse: any = await axios.get(
      'https://itunes.apple.com/search?term=jack+johnson&limit=25&entity=album'
    )

    console.log(searchResponse)
  }
  return (
    <PageWrapper>
      <div>
        Search page
        {/*  eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <button onClick={searchItunes}>search</button>
      </div>
    </PageWrapper>
  )
}

export default Search
