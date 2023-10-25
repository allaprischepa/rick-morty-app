function CharactersList(props: { searchTerm: string }) {
  console.log(`list: ${props.searchTerm}`);
  return <div className="characters-list">Chracters List</div>;
}

export default CharactersList;
