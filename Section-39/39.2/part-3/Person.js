const Person = (props) => {
    const displayName = (props.name.length > 8 ? props.name.slice(0, 8) : props.name)
    return (
        <div>
            <p>Learn more information about {displayName}</p>
            <h3>{props.age >= 18 ? 'Go vote!' : 'You must be over 18'}</h3>
            <h2>Hobbies:</h2>
            <ul>
                {props.hobbies.map(hobby => <li>{hobby}</li>)}
            </ul>
        </div>
    )
}