import { Component } from 'react';
import DataLoader from '../../services/dataLoader/dataLoader';
import { IAppProps, ICharacterData } from '../../types/types';
import CharacterCard from '../CharacterCard/CharacterCard';
import './CharactersList.scss';
import NotFoundCard from '../NotFoundCard/NotFoundCard';

class CharactersList extends Component<
  Pick<IAppProps, 'searchTerm'>,
  { characterData: ICharacterData[] | null; loader: boolean }
> {
  loader = new DataLoader();

  constructor(props: Pick<IAppProps, 'searchTerm'>) {
    super(props);
    this.state = {
      characterData: null,
      loader: true,
    };
  }

  componentDidMount() {
    this.loadData(this.props.searchTerm);
  }

  componentDidUpdate(prevProps: Pick<IAppProps, 'searchTerm'>) {
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
