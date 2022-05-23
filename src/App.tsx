import { useEffect, useState } from 'react';
import { BiTime } from 'react-icons/bi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import Dropdown from '../src/components/dropdown'
import moment from 'moment';
import './App.css';

function App() {

  interface Story {
    story_id: string;
    created_at?: string;
    author?: string;
    story_title?: string;
  }

  const [stories, setStories] = useState<Array<any>>([])
  const [favorites, setFavorites] = useState<Array<string>>([])
  

  // Function to get news from API
  async function fetchNews(library: string, page: number) {
    const response = await fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${library}&page=${page}`)
    const data = await response.json();
    return data.hits
  }

  // Do on first load
  useEffect(() => {
    const getStories = async () => {
      setStories(await fetchNews('angular',0));
    }
    getStories()

    for (let i = 0; i < window.localStorage.length; i++) {
      const value = window.localStorage.key(i)
      if (value !== null && value.substring(0, 6) === "story_") {
        setFavorites([...favorites, value.slice(6)]);
      }
    }
  }, [])

  // Function to change dropdown
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const frameworkValue: string = event.target.value
    const getNews = async () => { setStories(await fetchNews(frameworkValue, 0)) }
    getNews()
  }

  // Function to add favorites
  function onToggleFavorites(story: Story) {
    if (!favorites.includes(story.story_id)) {
      window.localStorage.setItem(`story_${story.story_id}`, JSON.stringify(story));
      setFavorites([...favorites, story.story_id]);
    } else {
      window.localStorage.removeItem(`story_${story.story_id}`)
      let tempArray = favorites.filter(element => element !== story.story_id)
      setFavorites(tempArray);
    }
  }

  return (
    <div className="App">
      <header className="header centered">
        Hacker News
      </header>
      <div className="centered">
        <Dropdown onChange={onChange}/>
        <ul className="story-list">
          {
            stories.map(element => (
            <li className="story">
              <div className="story-content">
                <div className="story-info">
                  <BiTime color='#767676' /><span>{moment(element.created_at).fromNow()} by {element.author}</span>
                </div>
                <div className="story-desc">{element.story_title}</div>
              </div>
              <div className="story-favorite">
                <div className='icon-container' onClick={() => {
                    let newFavorite: Story = {
                      story_id: element.objectID,
                      created_at: element.created_at,
                      author: element.author,
                      story_title: element.story_title,
                    }
                    onToggleFavorites(newFavorite)
                  }}>
                    {
                      favorites.includes(element.objectID) ?
                        <AiFillHeart color='red' size={'1.75em'} /> :
                        <AiOutlineHeart color='red' size={'1.75em'} />
                    }
                </div>
              </div>
            </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
