import { Component } from 'react';
import DataLoader from '../../services/dataLoader/dataLoader';
import { IAppProps, ICharacterData } from '../../types/types';
import CharacterCard from '../CharacterCard/CharacterCard';
import './CharactersList.scss';
import NotFoundCard from '../NotFoundCard/NotFoundCard';

type Props = Pick<IAppProps, 'searchTerm'>;
interface State {
  characterData: ICharacterData[] | null;
  loader: boolean;
}

class CharactersList extends Component<Props, State> {
  loader = new DataLoader();
  state: State = {
    characterData: null,
    loader: true,
  };

  componentDidMount() {
    this.loadData(this.props.searchTerm);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.searchTerm !== prevProps.searchTerm) {
      this.setState({ loader: true });
      this.loadData(this.props.searchTerm);
    }
  }

  async loadData(searchTerm: string) {
    try {
      const data = await this.loader.getData(searchTerm);
      setTimeout(() => {
        this.setState({ characterData: data, loader: false });
      }, 250);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { characterData, loader } = this.state;

    return (
      <>
        {loader ? <div className="loading"></div> : null}
        <div className="characters-list">
          {characterData !== null ? (
            characterData.length ? (
              characterData.map((character: ICharacterData) => (
                <CharacterCard
                  key={character.id}
                  {...character}
                ></CharacterCard>
              ))
            ) : (
              <NotFoundCard></NotFoundCard>
            )
          ) : null}
        </div>
      </>
    );
  }
}

export default CharactersList;
