const App = () => (
    <div>
        <Person name="Michael" age="29" hobbies={['reading', 'squash']} />
        <Person name="Cynthia" age="23" hobbies={['singing', 'dancing', 'working']} />
        <Person name="Jason" age="22" hobbies={['medicine', 'volleyball']} />
    </div>
)

ReactDOM.render(<App />, document.getElementById("root"));