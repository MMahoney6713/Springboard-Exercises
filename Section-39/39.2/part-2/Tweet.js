const Tweet = (props) => {
    const tweetComponents = Object.keys(props);
    return (
        <ul>
            {tweetComponents.map(c => <li>{c}: {props[c]}</li>)}
        </ul>
    );
}
