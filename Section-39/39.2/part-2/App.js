const App = () => (
    <div>
        <Tweet username="mahoneynator" name="michael" date="1/3/22" message="happy birthday" />
        <Tweet username="yofunky" name="jason" date="1/4/22" message="supa cool" />
        <Tweet username="kaleCatcher" name="julia" date="1/10/22" message="vegan fo life" />
    </div>
);

ReactDOM.render(<App />, document.getElementById("root"));