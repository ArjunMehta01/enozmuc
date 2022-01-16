
const ListRenderer = (props) => {

    // LET ELEMENT BE A STRING
    const listify = props.list.map((element) =>
        <li>{element}</li>);

    return (
        <div>  
            <ul>{listify}</ul>
        </div>
    );
};

export default ListRenderer;