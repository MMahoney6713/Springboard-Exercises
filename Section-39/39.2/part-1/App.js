const App = () => (
    <div>
        <FirstComponent />
        <NamedComponent name="michael" />
    </div>
);

ReactDOM.render(<App />, document.getElementById("root"));