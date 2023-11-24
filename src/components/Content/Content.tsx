import CharactersList from '../CharactersList/CharactersList';
import SearchBar from '../SearchBar/SearchBar';
import Logo from '../Logo/Logo';
import ErrorButton from '../ErrorButton/ErrorButton';
import { useRouter } from 'next/router';
import CharacterDetails from '../CharacterDetails/CharacterDetails';

function Content({ props }) {
  const router = useRouter();
  const { characterID } = router.query;

  return (
    <>
      <ErrorButton />
      <Logo />
      <SearchBar defaultValue={props.searchTerm} />
      <CharactersList props={props} />
      {characterID ? <CharacterDetails data={props.characterData} /> : null}
    </>
  );
}

export default Content;
