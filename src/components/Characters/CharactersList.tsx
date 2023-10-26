import { Component } from 'react';
import DataLoader from '../../services/dataLoader/dataLoader';
import { IAppProps, ICharacterData } from '../../types/types';
import CharacterCard from './CharacterCard';

class CharactersList extends Component<
  Pick<IAppProps, 'searchTerm'>,
  { characterData: ICharacterData[] | null }
> {
  loader = new DataLoader();

  constructor(props: Pick<IAppProps, 'searchTerm'>) {
    super(props);
    this.state = {
      characterData: null,
    };
  }

  componentDidMount() {
    this.loadData(this.props.searchTerm);
  }

  componentDidUpdate(prevProps: Pick<IAppProps, 'searchTerm'>) {
    if (this.props.searchTerm !== prevProps.searchTerm) {
      this.loadData(this.props.searchTerm);
    }
  }

  async loadData(searchTerm: string) {
    try {
      const data = await this.loader.getData(searchTerm);
      this.setState({ characterData: data });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { characterData } = this.state;

    return (
      <div className="characters-list">
        {characterData ? (
          characterData.map((character: ICharacterData) => (
            <CharacterCard key={character.id} {...character}></CharacterCard>
          ))
        ) : (
          <div>No characters found</div>
        )}
      </div>
    );
  }
}

export default CharactersList;
