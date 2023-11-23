import CharactersList from '../CharactersList/CharactersList';
import SearchBar from '../SearchBar/SearchBar';
import Logo from '../Logo/Logo';
import ErrorButton from '../ErrorButton/ErrorButton';
import { useRouter } from 'next/router';
import CharacterDetails from '../CharacterDetails/CharacterDetails';

function Content() {
  const router = useRouter();
  const { characterID } = router.query;

  return (
    <>
      <ErrorButton />
      <Logo />
      <SearchBar />
      <CharactersList />
      {characterID ? <CharacterDetails /> : null}
    </>
  );
}

export default Content;
