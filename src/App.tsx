import { useEffect, useState } from 'react';
import { BiTime } from 'react-icons/bi';
import moment from 'moment';
import './App.css';

function App() {

  const [news, setNews] = useState<Array<any>>([])

  async function fetchNews(library: string, page: number) {
    const response = await fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${library}&page=${page}`)
    const data = await response.json();
    return data.hits
  }

  useEffect(() => {
    const getNews = async () => {
      //const newsFromAPI = await fetchNews('angular');
      setNews(await fetchNews('angular',0));
    }
    getNews()
    console.log(news)
  }, [])

  return (
    <div className="App">
      <header className="header">
        Hello World
      </header>
      <ul className="article-list">
        {
          news.map(element => (
          <li className="article">
            <div className="article-content">
              <div className="article-info">
                <BiTime />{moment(element.created_at).fromNow()} by {element.author}
              </div>
              <div className="article-desc">{element.story_title}</div>
            </div>
            <div className="article-favorite">
              F
            </div>

          </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
