import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";

export function SearchInput(props) {
    return <div className='search-recipe'>
            <FontAwesomeIcon icon={faSearch}/>
            <input className="search-input" placeholder="Search for a recipe" {...props}  />
        </div>;
  }
  